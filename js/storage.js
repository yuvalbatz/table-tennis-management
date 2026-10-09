/**
 * Storage Module - Handles localStorage operations
 * Manages all data persistence for players, matches, competitions, and clubs
 */

const STORAGE_KEYS = {
    PLAYERS: 'tt_players',
    MATCHES: 'tt_matches',
    COMPETITIONS: 'tt_competitions',
    CLUBS: 'tt_clubs',
    LAST_REFRESH: 'tt_last_refresh',
};

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to save
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to storage (${key}):`, error);
    }
}

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @returns {*} Parsed data or null
 */
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error loading from storage (${key}):`, error);
        return null;
    }
}

/**
 * Save all data to storage
 * @param {Object} data - Complete data object
 */
function saveAllData(data) {
    saveToStorage(STORAGE_KEYS.PLAYERS, data.players || []);
    saveToStorage(STORAGE_KEYS.MATCHES, data.matches || []);
    saveToStorage(STORAGE_KEYS.COMPETITIONS, data.competitions || []);
    saveToStorage(STORAGE_KEYS.CLUBS, data.clubs || []);
    saveToStorage(STORAGE_KEYS.LAST_REFRESH, new Date().toISOString());
}

/**
 * Load all data from storage
 * @returns {Object} Complete data object
 */
function loadAllData() {
    return {
        players: loadFromStorage(STORAGE_KEYS.PLAYERS) || [],
        matches: loadFromStorage(STORAGE_KEYS.MATCHES) || [],
        competitions: loadFromStorage(STORAGE_KEYS.COMPETITIONS) || [],
        clubs: loadFromStorage(STORAGE_KEYS.CLUBS) || [],
    };
}

/**
 * Check if data exists in storage
 * @returns {boolean} True if data exists
 */
function hasStoredData() {
    const players = loadFromStorage(STORAGE_KEYS.PLAYERS);
    return players !== null && players.length > 0;
}

/**
 * Get last refresh timestamp
 * @returns {string|null} ISO timestamp or null
 */
function getLastRefresh() {
    return loadFromStorage(STORAGE_KEYS.LAST_REFRESH);
}

/**
 * Clear all stored data
 */
function clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}

/**
 * Save personal details
 * @param {Object} details - Personal details object
 */
function savePersonalDetails(details) {
    saveToStorage('tt_personal_details', details);
}

/**
 * Load personal details
 * @returns {Object|null} Personal details or null
 */
function loadPersonalDetails() {
    return loadFromStorage('tt_personal_details');
}
