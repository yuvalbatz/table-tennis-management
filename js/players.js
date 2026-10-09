/**
 * Players Page Module
 * Handles player listing, filtering, searching, and sorting.
 */

let allPlayers = [];
let filteredPlayers = [];

document.addEventListener('DOMContentLoaded', async () => {
    setupMobileMenu();
    await loadPlayersData();
    populateClubFilter();
    setupEventListeners();
    resetFiltersToDefault();
    applyFilters();
});

function normalizePlayer(player) {
    if (!player || typeof player !== 'object') return null;

    // Data from getRealWorldData() already has firstName and lastName
    // Only use name splitting as fallback for legacy data
    let firstName = player.firstName;
    let lastName = player.lastName;

    if (!firstName || !lastName) {
        const fullName = (player.name || '').trim();
        const parts = fullName.split(' ').filter(Boolean);
        firstName = firstName || parts[0] || 'Unknown';
        lastName = lastName || parts.slice(1).join(' ') || '';
    }

    return {
        playerId: player.playerId ?? player.id ?? '-',
        firstName: firstName || 'Unknown',
        lastName: lastName || '',
        club: player.club || 'Unknown Club',
        rankingPoints: Number(player.rankingPoints ?? 0),
        category: player.category || 'S',
        country: player.country || 'Unknown',
    };
}

async function loadPlayersData() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.classList.add('active');

    let data = loadAllData();
    let players = Array.isArray(data.players) ? data.players : [];

    // Check if we have old data (playerId < 1000 means old 1-25 IDs)
    const hasOldData = players.length > 0 && players.some(p => {
        const id = p.playerId ?? p.id ?? 0;
        return id < 1000;
    });

    // Get the current number of players from getRealWorldData
    const freshData = getRealWorldData();
    const currentPlayerCount = freshData.players ? freshData.players.length : 0;

    // Update data if: no data, old data format, or fewer players than current
    if (players.length === 0 || hasOldData || players.length < currentPlayerCount) {
        // Load fresh data with all current players (including new ones)
        saveAllData(freshData);
        data = loadAllData();
        players = Array.isArray(data.players) ? data.players : [];
        console.log('Data refreshed. New player count:', players.length);
    }

    allPlayers = players.map(normalizePlayer).filter(Boolean);
    filteredPlayers = [...allPlayers];
    console.log('Players loaded:', allPlayers.length);
    if (allPlayers.length > 0) {
        console.log('First player sample:', allPlayers[0]);
    }

    if (spinner) spinner.classList.remove('active');
}

function resetFiltersToDefault() {
    const categoryFilter = document.getElementById('categoryFilter');
    const clubFilter = document.getElementById('clubFilter');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    if (categoryFilter) categoryFilter.value = 'all';
    if (clubFilter) clubFilter.value = 'all';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'points-desc';
}

function populateClubFilter() {
    const clubFilter = document.getElementById('clubFilter');
    if (!clubFilter) return;

    const clubs = [...new Set(allPlayers.map((p) => p.club))].sort((a, b) => a.localeCompare(b));
    clubFilter.innerHTML = '<option value="all">All Clubs</option>';
    clubs.forEach((club) => {
        const option = document.createElement('option');
        option.value = club;
        option.textContent = club;
        clubFilter.appendChild(option);
    });
}

function setupEventListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    const clubFilter = document.getElementById('clubFilter');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (clubFilter) clubFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const clubFilter = document.getElementById('clubFilter');
    const searchInput = document.getElementById('searchInput');

    let results = [...allPlayers];

    if (categoryFilter && categoryFilter.value !== 'all') {
        results = results.filter((p) => p.category === categoryFilter.value);
    }

    if (clubFilter && clubFilter.value !== 'all') {
        results = results.filter((p) => p.club === clubFilter.value);
    }

    if (searchInput && searchInput.value.trim() !== '') {
        const term = searchInput.value.trim().toLowerCase();
        results = results.filter((p) => (
            p.firstName.toLowerCase().includes(term) ||
            p.lastName.toLowerCase().includes(term) ||
            p.club.toLowerCase().includes(term) ||
            p.country.toLowerCase().includes(term)
        ));
    }

    filteredPlayers = [...results];
    renderPlayers(filteredPlayers);
}

function renderPlayers(playersToRender) {
    const tableContainer = document.getElementById('playersTableContainer');
    const tbody = document.getElementById('playersTableBody');
    const noResults = document.getElementById('noResults');
    const sortSelect = document.getElementById('sortSelect');

    console.log('renderPlayers called with', playersToRender ? playersToRender.length : 0, 'players');
    
    if (!tableContainer || !tbody) {
        console.error('Table elements not found!', { tableContainer: !!tableContainer, tbody: !!tbody });
        return;
    }

    tbody.innerHTML = '';

    if (!playersToRender || playersToRender.length === 0) {
        console.log('No players to render - hiding table');
        tableContainer.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    tableContainer.style.display = 'block';
    if (noResults) noResults.style.display = 'none';

    const sortValue = sortSelect ? sortSelect.value : 'points-desc';
    const sortedPlayers = [...playersToRender].sort((a, b) => {
        if (sortValue === 'points-asc') return Number(a.rankingPoints) - Number(b.rankingPoints);
        if (sortValue === 'name-asc') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        if (sortValue === 'name-desc') return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        return Number(b.rankingPoints) - Number(a.rankingPoints);
    });

    console.log('Rendering', sortedPlayers.length, 'sorted players');
    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        const flagUrl = getCountryFlagSync(player.country);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.playerId}</td>
            <td>${player.firstName}</td>
            <td>${player.lastName}</td>
            <td>${player.club}</td>
            <td>${Number(player.rankingPoints)}</td>
            <td>${player.category}</td>
            <td>${player.country}</td>
            <td><img src="${flagUrl}" alt="${player.country} flag" class="country-flag" onerror="this.style.display='none'"></td>
        `;
        tbody.appendChild(row);
    });
    console.log('Table rendered with', sortedPlayers.length, 'rows');
}
