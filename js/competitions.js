/**
 * Competitions Page Module
 * Handles competition display with weather information
 */

let competitions = [];
let matches = [];
let players = [];

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    await loadCompetitions();
    setupEventListeners();
    setupMobileMenu();
});

/**
 * Load competitions from storage
 */
async function loadCompetitions() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) loadingSpinner.classList.add('active');

    let data = loadAllData();
    let storedMatches = data.matches || [];
    
    // Get current number of matches from getRealWorldData
    const freshData = getRealWorldData();
    const currentMatchCount = freshData.matches ? freshData.matches.length : 0;
    
    // Update data if we have fewer matches than current (new matches added)
    if (storedMatches.length < currentMatchCount) {
        // Load fresh data with all current matches (including new ones)
        saveAllData(freshData);
        data = loadAllData();
        console.log('Competitions data refreshed. New match count:', data.matches.length);
    }
    
    competitions = data.competitions || [];
    matches = data.matches || [];
    players = data.players || [];

    await renderCompetitions();
    
    if (loadingSpinner) loadingSpinner.classList.remove('active');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Event listeners setup (if needed in the future)
}

/**
 * Render competitions with weather data
 */
async function renderCompetitions() {
    const container = document.getElementById('competitionsContainer');
    if (!container) return;

    container.innerHTML = '';

    // Sort competitions by date (newest first)
    const sortedCompetitions = [...competitions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    for (const competition of sortedCompetitions) {
        const competitionCard = await createCompetitionCard(competition);
        container.appendChild(competitionCard);
    }
}

/**
 * Create a competition card element
 */
async function createCompetitionCard(competition) {
    const card = document.createElement('div');
    card.className = 'competition-card';

    // Get competition matches
    const compMatches = matches.filter(m => m.competitionId === competition.competitionId);
    
    // Debug log
    if (competition.competitionId === 5) {
        console.log(`European Championships matches found: ${compMatches.length}`, compMatches);
    }
    
    // Fetch weather data
    let weatherData = null;
    try {
        weatherData = await fetchWeatherData(competition.location);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }

    // Format date
    const date = new Date(competition.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Build weather HTML
    let weatherHTML = '';
    if (weatherData) {
        const temp = Math.round(weatherData.main.temp);
        const condition = weatherData.weather[0].main;
        weatherHTML = `
            <div class="weather-info">
                <h4>Weather in ${competition.location}</h4>
                <div class="weather-temp">${temp}°C</div>
                <p>${condition}</p>
            </div>
        `;
    }

    // Build matches HTML
    let matchesHTML = '';
    if (compMatches.length > 0) {
        matchesHTML = `
            <div class="competition-matches">
                <h4>Recent Matches (${compMatches.length})</h4>
                ${compMatches.slice(0, 5).map(match => {
                    const playerA = players.find(p => p.playerId === match.playerA);
                    const playerB = players.find(p => p.playerId === match.playerB);
                    const playerAName = playerA ? `${playerA.firstName} ${playerA.lastName}` : 'Unknown';
                    const playerBName = playerB ? `${playerB.firstName} ${playerB.lastName}` : 'Unknown';
                    
                    return `
                        <div class="match-item">
                            <span>${playerAName} vs ${playerBName}</span>
                            <span class="match-score">${match.score}</span>
                        </div>
                    `;
                }).join('')}
                ${compMatches.length > 5 ? `<p style="margin-top: 0.5rem; color: #666;">+${compMatches.length - 5} more matches</p>` : ''}
            </div>
        `;
    }

    card.innerHTML = `
        <div class="competition-header">
            <div class="competition-name">${competition.name}</div>
            <div class="competition-location">📍 ${competition.location}</div>
        </div>
        <div class="competition-info">
            <div class="competition-info-item">
                <strong>Date:</strong>
                <span>${formattedDate}</span>
            </div>
            <div class="competition-info-item">
                <strong>Category:</strong>
                <span>${competition.category}</span>
            </div>
            <div class="competition-info-item">
                <strong>Matches:</strong>
                <span>${compMatches.length}</span>
            </div>
        </div>
        ${weatherHTML}
        ${matchesHTML}
    `;

    return card;
}

