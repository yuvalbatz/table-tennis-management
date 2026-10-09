/**
 * League Page Module
 * Handles league standings and club information
 */

let clubs = [];
let players = [];

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    await loadLeagueData();
    setupEventListeners();
    setupMobileMenu();
});

/**
 * Load league data from storage
 */
async function loadLeagueData() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) loadingSpinner.classList.add('active');

    let data = loadAllData();
    clubs = data.clubs || [];
    players = data.players || [];

    // Get current number of clubs from getRealWorldData
    const freshData = getRealWorldData();
    const currentClubCount = freshData.clubs ? freshData.clubs.length : 0;

    // Update data if we have fewer clubs than current (new clubs added)
    if (clubs.length < currentClubCount) {
        console.log('Detected new clubs. Loading fresh data...');
        // Load fresh data with all current clubs (including new ones)
        saveAllData(freshData);
        data = loadAllData();
        clubs = data.clubs || [];
        players = data.players || [];
        console.log('League data refreshed. New club count:', clubs.length);
    }

    renderLeagueTable();
    
    if (loadingSpinner) loadingSpinner.classList.remove('active');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Event listeners setup (if needed in the future)

    // Setup club players modal
    setupClubPlayersModal();
}

/**
 * Render league table
 */
function renderLeagueTable() {
    const tbody = document.getElementById('leagueTableBody');
    if (!tbody) return;

    // Sort clubs by league points (descending)
    const sortedClubs = [...clubs].sort((a, b) => b.leaguePoints - a.leaguePoints);

    tbody.innerHTML = sortedClubs.map((club, index) => {
        const position = index + 1;
        const clubPlayers = players.filter(p => club.players.includes(p.playerId));
        const playerCount = clubPlayers.length;

        // Position badge class
        let badgeClass = 'default';
        if (position === 1) badgeClass = 'gold';
        else if (position === 2) badgeClass = 'silver';
        else if (position === 3) badgeClass = 'bronze';

        return `
            <tr>
                <td>
                    <span class="position-badge ${badgeClass}">${position}</span>
                </td>
                <td><strong>${club.clubName}</strong></td>
                <td>${club.leaguePoints}</td>
                <td>${playerCount}</td>
                <td>
                    <button class="btn-primary view-players-btn" data-club-id="${club.clubId}">
                        View Players
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Add event listeners to view players buttons
    const viewPlayersBtns = document.querySelectorAll('.view-players-btn');
    viewPlayersBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const clubId = parseInt(e.target.getAttribute('data-club-id'));
            showClubPlayers(clubId);
        });
    });
}

/**
 * Show club players modal
 */
function showClubPlayers(clubId) {
    const club = clubs.find(c => c.clubId === clubId);
    if (!club) return;

    const clubPlayers = players.filter(p => club.players.includes(p.playerId));
    
    // Sort players by ranking points
    clubPlayers.sort((a, b) => b.rankingPoints - a.rankingPoints);

    const modal = document.getElementById('clubPlayersModal');
    const title = document.getElementById('clubPlayersTitle');
    const list = document.getElementById('clubPlayersList');

    if (!modal || !title || !list) return;

    title.textContent = `${club.clubName} - Players (${clubPlayers.length})`;

    if (clubPlayers.length === 0) {
        list.innerHTML = '<p>No players in this club.</p>';
    } else {
        list.innerHTML = clubPlayers.map(player => `
            <div class="club-player-item">
                <div>
                    <strong>${player.firstName} ${player.lastName}</strong>
                    <span style="color: #666; margin-left: 0.5rem;">(${player.category})</span>
                </div>
                <div style="color: var(--primary-color); font-weight: 600;">
                    ${player.rankingPoints} pts
                </div>
            </div>
        `).join('');
    }

    modal.classList.add('active');
}

/**
 * Setup club players modal
 */
function setupClubPlayersModal() {
    const modal = document.getElementById('clubPlayersModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

