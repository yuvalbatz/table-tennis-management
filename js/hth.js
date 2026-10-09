/**
 * Head to Head (HTH) Page Module
 * Handles player comparison and match history display
 */

let players = [];
let matches = [];
let selectedPlayerA = null;
let selectedPlayerB = null;
let selectedPlayerAName = '';
let selectedPlayerBName = '';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
    setupMobileMenu();
});

/**
 * Load data from storage
 */
function loadData() {
    const data = loadAllData();
    players = data.players || [];
    matches = data.matches || [];
    
    // Load popular HTH options
    loadPopularHTH();
}

/**
 * Popular HTH matchups to display
 */
const POPULAR_HTH = [
    { playerA: 'Wang Chuqin', playerB: 'Fan Zhendong' },
    { playerA: 'Fan Zhendong', playerB: 'Ma Long' },
    { playerA: 'Hugo Calderano', playerB: 'Dimitrij Ovtcharov' },
    { playerA: 'Tomokazu Harimoto', playerB: 'Felix Lebrun' },
    { playerA: 'Dimitrij Ovtcharov', playerB: 'Truls Möregårdh' },
    { playerA: 'Felix Lebrun', playerB: 'Alexis Lebrun' },
    { playerA: 'Lin Yun-Ju', playerB: 'Tomokazu Harimoto' },
    { playerA: 'Truls Möregårdh', playerB: 'Darko Jorgic' },
    { playerA: 'Simon Gauzy', playerB: 'Patrick Franziska' },
    { playerA: 'Anton Källberg', playerB: 'Mattias Falck' },
];

/**
 * Load and display popular HTH options
 */
function loadPopularHTH() {
    const popularHTHList = document.getElementById('popularHTHList');
    if (!popularHTHList) return;

    popularHTHList.innerHTML = '';

    POPULAR_HTH.forEach(hth => {
        const playerA = players.find(p => `${p.firstName} ${p.lastName}` === hth.playerA);
        const playerB = players.find(p => `${p.firstName} ${p.lastName}` === hth.playerB);

        if (!playerA || !playerB) return;

        // Count matches between these players
        const hthMatches = matches.filter(m => {
            return (
                (m.playerA === playerA.playerId && m.playerB === playerB.playerId) ||
                (m.playerA === playerB.playerId && m.playerB === playerA.playerId)
            );
        });

        const hthItem = document.createElement('div');
        hthItem.className = 'popular-hth-item';
        hthItem.innerHTML = `
            <div class="hth-item-players">
                <span class="hth-item-player">${playerA.firstName} ${playerA.lastName}</span>
                <span class="hth-item-vs">VS</span>
                <span class="hth-item-player">${playerB.firstName} ${playerB.lastName}</span>
            </div>
            <div class="hth-item-matches">${hthMatches.length} matches</div>
        `;

        hthItem.addEventListener('click', () => {
            selectedPlayerA = playerA.playerId;
            selectedPlayerB = playerB.playerId;
            selectedPlayerAName = `${playerA.firstName} ${playerA.lastName}`;
            selectedPlayerBName = `${playerB.firstName} ${playerB.lastName}`;
            
            // Update input fields
            const playerAInput = document.getElementById('playerA');
            const playerBInput = document.getElementById('playerB');
            if (playerAInput) playerAInput.value = selectedPlayerAName;
            if (playerBInput) playerBInput.value = selectedPlayerBName;
            
            updateHTHResults();
        });

        popularHTHList.appendChild(hthItem);
    });
}

/**
 * Filter players based on search term
 */
function filterPlayers(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return [];
    
    const term = searchTerm.toLowerCase().trim();
    return players.filter(player => {
        const firstName = (player.firstName || '').toLowerCase();
        const lastName = (player.lastName || '').toLowerCase();
        const fullName = `${firstName} ${lastName}`;
        
        // Search in first name, last name, or full name
        return firstName.includes(term) || 
               lastName.includes(term) || 
               fullName.includes(term);
    }).slice(0, 10); // Limit to 10 results
}

/**
 * Show autocomplete suggestions
 */
function showSuggestions(inputId, suggestions) {
    const suggestionsDiv = document.getElementById(inputId + 'Suggestions');
    if (!suggestionsDiv) return;

    if (suggestions.length === 0) {
        suggestionsDiv.innerHTML = '';
        suggestionsDiv.style.display = 'none';
        return;
    }

    suggestionsDiv.innerHTML = suggestions.map(player => {
        const fullName = `${player.firstName} ${player.lastName}`;
        return `<div class="suggestion-item" data-player-id="${player.playerId}" data-player-name="${fullName}">
            ${fullName} <span class="suggestion-meta">(${player.country})</span>
        </div>`;
    }).join('');

    suggestionsDiv.style.display = 'block';
}

/**
 * Hide autocomplete suggestions
 */
function hideSuggestions(inputId) {
    const suggestionsDiv = document.getElementById(inputId + 'Suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    const playerAInput = document.getElementById('playerA');
    const playerBInput = document.getElementById('playerB');

    // Player A input
    if (playerAInput) {
        playerAInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.trim() === '') {
                selectedPlayerA = null;
                selectedPlayerAName = '';
                updateHTHResults();
                hideSuggestions('playerA');
                // Show popular HTH list if both players are cleared
                if (!selectedPlayerB) {
                    const popularHTH = document.getElementById('popularHTH');
                    if (popularHTH) popularHTH.style.display = 'block';
                }
            } else {
                const suggestions = filterPlayers(searchTerm);
                showSuggestions('playerA', suggestions);
            }
        });

        playerAInput.addEventListener('blur', () => {
            // Delay hiding to allow click on suggestion
            setTimeout(() => hideSuggestions('playerA'), 200);
        });

        playerAInput.addEventListener('focus', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.trim() !== '') {
                const suggestions = filterPlayers(searchTerm);
                showSuggestions('playerA', suggestions);
            }
        });

        playerAInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const suggestionsDiv = document.getElementById('playerASuggestions');
                const firstSuggestion = suggestionsDiv?.querySelector('.suggestion-item');
                if (firstSuggestion) {
                    const playerId = parseInt(firstSuggestion.dataset.playerId);
                    const playerName = firstSuggestion.dataset.playerName;
                    
                    selectedPlayerA = playerId;
                    selectedPlayerAName = playerName;
                    playerAInput.value = playerName;
                    hideSuggestions('playerA');
                    updateHTHResults();
                }
            }
        });

        // Handle suggestion clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('#playerASuggestions .suggestion-item')) {
                const item = e.target.closest('.suggestion-item');
                const playerId = parseInt(item.dataset.playerId);
                const playerName = item.dataset.playerName;
                
                selectedPlayerA = playerId;
                selectedPlayerAName = playerName;
                playerAInput.value = playerName;
                hideSuggestions('playerA');
                updateHTHResults();
            }
        });
    }

    // Player B input
    if (playerBInput) {
        playerBInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.trim() === '') {
                selectedPlayerB = null;
                selectedPlayerBName = '';
                updateHTHResults();
                hideSuggestions('playerB');
                // Show popular HTH list if both players are cleared
                if (!selectedPlayerA) {
                    const popularHTH = document.getElementById('popularHTH');
                    if (popularHTH) popularHTH.style.display = 'block';
                }
            } else {
                const suggestions = filterPlayers(searchTerm);
                showSuggestions('playerB', suggestions);
            }
        });

        playerBInput.addEventListener('blur', () => {
            // Delay hiding to allow click on suggestion
            setTimeout(() => hideSuggestions('playerB'), 200);
        });

        playerBInput.addEventListener('focus', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.trim() !== '') {
                const suggestions = filterPlayers(searchTerm);
                showSuggestions('playerB', suggestions);
            }
        });

        playerBInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const suggestionsDiv = document.getElementById('playerBSuggestions');
                const firstSuggestion = suggestionsDiv?.querySelector('.suggestion-item');
                if (firstSuggestion) {
                    const playerId = parseInt(firstSuggestion.dataset.playerId);
                    const playerName = firstSuggestion.dataset.playerName;
                    
                    selectedPlayerB = playerId;
                    selectedPlayerBName = playerName;
                    playerBInput.value = playerName;
                    hideSuggestions('playerB');
                    updateHTHResults();
                }
            }
        });

        // Handle suggestion clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('#playerBSuggestions .suggestion-item')) {
                const item = e.target.closest('.suggestion-item');
                const playerId = parseInt(item.dataset.playerId);
                const playerName = item.dataset.playerName;
                
                selectedPlayerB = playerId;
                selectedPlayerBName = playerName;
                playerBInput.value = playerName;
                hideSuggestions('playerB');
                updateHTHResults();
            }
        });
    }
}

/**
 * Update HTH results display
 */
function updateHTHResults() {
    const hthResults = document.getElementById('hthResults');
    const hthNoSelection = document.getElementById('hthNoSelection');

    if (!selectedPlayerA || !selectedPlayerB) {
        if (hthResults) hthResults.style.display = 'none';
        if (hthNoSelection) hthNoSelection.style.display = 'block';
        // Show popular HTH list when no players selected
        const popularHTH = document.getElementById('popularHTH');
        if (popularHTH) popularHTH.style.display = 'block';
        return;
    }

    if (hthNoSelection) hthNoSelection.style.display = 'none';
    if (hthResults) hthResults.style.display = 'block';
    
    // Hide popular HTH list when players are selected
    const popularHTH = document.getElementById('popularHTH');
    if (popularHTH) popularHTH.style.display = 'none';

    // Get HTH matches
    const hthMatches = matches.filter(match => {
        return (
            (match.playerA === selectedPlayerA && match.playerB === selectedPlayerB) ||
            (match.playerA === selectedPlayerB && match.playerB === selectedPlayerA)
        );
    });

    // Calculate statistics
    let playerAWins = 0;
    let playerBWins = 0;

    hthMatches.forEach(match => {
        const [scoreA, scoreB] = match.score.split('-').map(Number);
        const isPlayerAFirst = match.playerA === selectedPlayerA;
        
        if (isPlayerAFirst) {
            if (scoreA > scoreB) playerAWins++;
            else if (scoreB > scoreA) playerBWins++;
        } else {
            if (scoreB > scoreA) playerAWins++;
            else if (scoreA > scoreB) playerBWins++;
        }
    });

    // Get player names
    const playerA = players.find(p => p.playerId === selectedPlayerA);
    const playerB = players.find(p => p.playerId === selectedPlayerB);

    // Update statistics display
    document.getElementById('totalMatches').textContent = hthMatches.length;
    document.getElementById('playerAWins').textContent = playerAWins;
    document.getElementById('playerBWins').textContent = playerBWins;
    
    if (playerA) {
        document.getElementById('playerAWinsLabel').textContent = `${playerA.firstName} ${playerA.lastName} Wins`;
    }
    if (playerB) {
        document.getElementById('playerBWinsLabel').textContent = `${playerB.firstName} ${playerB.lastName} Wins`;
    }

    // Get last match
    if (hthMatches.length > 0) {
        const lastMatch = hthMatches[hthMatches.length - 1];
        const [scoreA, scoreB] = lastMatch.score.split('-').map(Number);
        const isPlayerAFirst = lastMatch.playerA === selectedPlayerA;
        const winner = isPlayerAFirst ? 
            (scoreA > scoreB ? playerA : playerB) : 
            (scoreB > scoreA ? playerA : playerB);
        
        document.getElementById('lastMatchResult').textContent = 
            `${winner.firstName} ${winner.lastName} won ${lastMatch.score}`;
    } else {
        document.getElementById('lastMatchResult').textContent = 'No matches yet';
    }

    // Display match history
    displayMatchHistory(hthMatches, playerA, playerB);
}

/**
 * Display match history table
 */
function displayMatchHistory(hthMatches, playerA, playerB) {
    const tbody = document.getElementById('matchHistoryBody');
    if (!tbody) return;

    if (hthMatches.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No matches found</td></tr>';
        return;
    }

    // Sort matches by date (newest first)
    const sortedMatches = [...hthMatches].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // Get competition names
    const data = loadAllData();
    const competitions = data.competitions || [];

    tbody.innerHTML = sortedMatches.map(match => {
        const [scoreA, scoreB] = match.score.split('-').map(Number);
        const isPlayerAFirst = match.playerA === selectedPlayerA;
        const displayScore = isPlayerAFirst ? 
            `${scoreA}-${scoreB}` : 
            `${scoreB}-${scoreA}`;
        
        const winner = isPlayerAFirst ? 
            (scoreA > scoreB ? playerA : playerB) : 
            (scoreB > scoreA ? playerA : playerB);
        
        const competition = competitions.find(c => c.competitionId === match.competitionId);
        const compName = competition ? competition.name : 'Unknown Competition';

        // Get flags for both players
        const playerAFlag = getCountryFlagSync(playerA.country);
        const playerBFlag = getCountryFlagSync(playerB.country);
        const winnerFlag = getCountryFlagSync(winner.country);

        // Determine display order based on match order
        const firstPlayer = isPlayerAFirst ? playerA : playerB;
        const secondPlayer = isPlayerAFirst ? playerB : playerA;
        const firstPlayerFlag = isPlayerAFirst ? playerAFlag : playerBFlag;
        const secondPlayerFlag = isPlayerAFirst ? playerBFlag : playerAFlag;

        return `
            <tr>
                <td>${new Date(match.date).toLocaleDateString()}</td>
                <td>${compName}</td>
                <td>
                    <div class="match-players">
                        <div class="match-player">
                            <img src="${firstPlayerFlag}" alt="${firstPlayer.country} flag" class="match-flag" onerror="this.style.display='none'">
                            <span>${firstPlayer.firstName} ${firstPlayer.lastName}</span>
                        </div>
                        <span class="vs-small">VS</span>
                        <div class="match-player">
                            <img src="${secondPlayerFlag}" alt="${secondPlayer.country} flag" class="match-flag" onerror="this.style.display='none'">
                            <span>${secondPlayer.firstName} ${secondPlayer.lastName}</span>
                        </div>
                    </div>
                </td>
                <td class="match-score">${displayScore}</td>
                <td>
                    <div class="match-winner">
                        <img src="${winnerFlag}" alt="${winner.country} flag" class="match-flag" onerror="this.style.display='none'">
                        <span>${winner.firstName} ${winner.lastName}</span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

