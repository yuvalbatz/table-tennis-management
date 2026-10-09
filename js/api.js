/**
 * API Module - Handles all external API calls
 * Uses TheSportsDB API for sports data and OpenWeather API for weather
 * Uses REST Countries API for country flags
 */

const API_CONFIG = {
    // Using free public APIs that don't require authentication
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather',
    WEATHER_API_KEY: 'demo_key', // Note: Replace with actual key or use demo mode
    SPORTS_API_URL: 'https://www.thesportsdb.com/api/v1/json/3',
    COUNTRIES_API_URL: 'https://restcountries.com/v3.1/name',
    FLAG_API_URL: 'https://flagcdn.com/w40',
};

// Country name to ISO code mapping for special cases
const COUNTRY_CODE_MAP = {
    'Chinese Taipei': 'TW',
    'South Korea': 'KR',
    'North Korea': 'KP',
    'United States': 'US',
    'United Kingdom': 'GB',
    'Russia': 'RU',
};

/**
 * Generate consistent hash from string
 * @param {string} str - Input string
 * @returns {number} Hash value
 */
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

/**
 * Get consistent weather data for a city (based on city name hash)
 * @param {string} city - City name
 * @returns {Object} Weather data
 */
function getConsistentWeather(city) {
    const hash = hashString(city.toLowerCase());
    
    // Use hash to generate consistent but varied weather
    // Temperature range: 10-30°C (realistic for most cities)
    const temp = 10 + (hash % 21); // 10-30°C
    
    // Weather conditions based on hash
    const conditions = ['Clear', 'Clouds', 'Rain', 'Sunny', 'Partly Cloudy'];
    const condition = conditions[hash % conditions.length];
    
    // Wind speed: 3-12 km/h
    const windSpeed = 3 + (hash % 10);
    
    return {
        name: city,
        main: {
            temp: temp,
            feels_like: temp - 1 + (hash % 3), // Slightly varied feels like
        },
        weather: [{
            main: condition,
            description: condition.toLowerCase(),
        }],
        wind: {
            speed: windSpeed,
        },
    };
}

/**
 * Fetch weather data for a given city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
async function fetchWeatherData(city) {
    try {
        // Using OpenWeatherMap API (free tier available)
        // For demo purposes, we'll use a mock response if API key is not available
        if (API_CONFIG.WEATHER_API_KEY === 'demo_key') {
            // Use consistent weather data based on city name hash
            // This ensures the same city always gets the same weather
            return getConsistentWeather(city);
        }

        const url = `${API_CONFIG.WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_CONFIG.WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Weather API request failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error);
        // Return consistent mock data on error (based on city name)
        return getConsistentWeather(city);
    }
}

/**
 * Fetch sports data from TheSportsDB API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} Sports data
 */
async function fetchSportsData(endpoint) {
    try {
        const url = `${API_CONFIG.SPORTS_API_URL}${endpoint}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Sports API request failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching sports data:', error);
        return null;
    }
}

/**
 * Generate mock table tennis data
 * This function now uses real-world professional table tennis data
 * @returns {Object} Complete data structure
 */
function generateMockData() {
    // Use real-world data from data.js
    return getRealWorldData();
}

/**
 * Get country flag URL from REST Countries API
 * @param {string} countryName - Country name
 * @returns {Promise<string>} Flag image URL
 */
async function getCountryFlag(countryName) {
    try {
        // Check if we have a direct mapping
        if (COUNTRY_CODE_MAP[countryName]) {
            const code = COUNTRY_CODE_MAP[countryName].toLowerCase();
            return `${API_CONFIG.FLAG_API_URL}/${code}.png`;
        }

        // Try to get country code from REST Countries API
        const url = `${API_CONFIG.COUNTRIES_API_URL}/${encodeURIComponent(countryName)}?fields=cca2`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Country API request failed');
        }
        
        const data = await response.json();
        
        // Handle array response (API returns array even for single country)
        const country = Array.isArray(data) ? data[0] : data;
        
        if (country && country.cca2) {
            const code = country.cca2.toLowerCase();
            return `${API_CONFIG.FLAG_API_URL}/${code}.png`;
        }
        
        throw new Error('Country code not found');
    } catch (error) {
        console.error(`Error fetching flag for ${countryName}:`, error);
        // Fallback: try to use country name directly (for common countries)
        const countryCode = countryName.toLowerCase().replace(/\s+/g, '-');
        return `${API_CONFIG.FLAG_API_URL}/${countryCode}.png`;
    }
}

/**
 * Get country flag URL synchronously (cached version)
 * Uses a simple mapping for common countries
 * @param {string} countryName - Country name
 * @returns {string} Flag image URL
 */
function getCountryFlagSync(countryName) {
    // Direct mapping for known countries
    const countryToCode = {
        'China': 'cn',
        'Japan': 'jp',
        'Germany': 'de',
        'Sweden': 'se',
        'France': 'fr',
        'Brazil': 'br',
        'Chinese Taipei': 'tw',
        'South Korea': 'kr',
        'Slovenia': 'si',
        'Romania': 'ro',
        'Singapore': 'sg',
        'Slovakia': 'sk',
        'Thailand': 'th',
        'Iran': 'ir',
        'Portugal': 'pt',
        'England': 'gb',
        'Nigeria': 'ng',
        'Egypt': 'eg',
    };

    // Try direct mapping first
    let code = countryToCode[countryName];
    
    // If not found, try COUNTRY_CODE_MAP
    if (!code && COUNTRY_CODE_MAP[countryName]) {
        code = COUNTRY_CODE_MAP[countryName].toLowerCase();
    }
    
    // Fallback: convert country name to lowercase and replace spaces with hyphens
    if (!code) {
        code = countryName.toLowerCase().replace(/\s+/g, '-');
    }
    
    return `${API_CONFIG.FLAG_API_URL}/${code}.png`;
}

/**
 * Initialize data - fetch from API or generate mock data
 * @returns {Promise<Object>} Complete data structure
 */
async function initializeData() {
    try {
        // Try to fetch real data first (if API is available)
        // For this project, we'll use mock data generation
        const data = generateMockData();
        return data;
    } catch (error) {
        console.error('Error initializing data:', error);
        // Fallback to mock data
        return generateMockData();
    }
}
