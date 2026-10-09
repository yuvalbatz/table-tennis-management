# Table Tennis Ranking & Competition Management Web Application

A complete web application for managing table tennis players, rankings, competitions, and league standings. Built with pure HTML, CSS, and JavaScript following strict separation of concerns.

## 📋 Project Overview

This application provides a comprehensive system for:
- Managing players and their rankings with country flags
- Viewing Head-to-Head (HTH) statistics between players
- Tracking competitions with weather information
- Displaying league standings and club information
- Popular HTH matchups for quick access

## 🏗️ Project Structure

```
/project-root
│
├── index.html              # Home page
├── players.html            # Players listing page
├── hth.html               # Head-to-Head comparison page
├── competitions.html      # Competitions page
├── league.html            # League standings page
│
├── /css
│   ├── style.css          # Main stylesheet
│   └── components.css     # Component-specific styles
│
├── /js
│   ├── data.js            # Real-world player and match data
│   ├── api.js             # External API integration
│   ├── storage.js         # localStorage management
│   ├── main.js            # Shared functionality
│   ├── players.js         # Players page logic
│   ├── hth.js             # HTH page logic
│   ├── competitions.js    # Competitions page logic
│   └── league.js          # League page logic
│
└── /assets
    └── images             # Image assets directory
```

## 🚀 How to Run

1. **Open** `index.html` directly in a modern web browser (Chrome, Firefox, Edge, Safari)
2. **No server required** - the application runs entirely client-side
3. **First load** - The application will automatically load real-world data from `data.js` and store it in localStorage

### Requirements

- Modern web browser with JavaScript enabled
- Internet connection (for external API calls - weather data and country flags)

## 🔌 External APIs Used

### 1. Flag CDN API
- **Purpose**: Display country flags next to players
- **Endpoint**: `https://flagcdn.com/w40`
- **Usage**: Shows country flag icons for each player in the Players table and HTH match history
- **Note**: Free public API, no authentication required

### 2. OpenWeatherMap API
- **Purpose**: Fetch weather information for competition locations
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Usage**: Displays current weather conditions for each competition city
- **Note**: The application includes consistent mock weather data for demonstration. Weather data is generated deterministically based on city name to prevent random changes. To use real weather data:
  1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
  2. Replace `'demo_key'` in `js/api.js` with your actual API key

## 💾 Data Storage

The application uses **localStorage** for client-side data persistence:

### Storage Keys
- `tt_players` - Player data
- `tt_matches` - Match results
- `tt_competitions` - Competition information
- `tt_clubs` - Club data
- `tt_last_refresh` - Last data refresh timestamp

### Data Flow
1. **First Load**: 
   - Checks localStorage for existing data
   - If no data exists or data is outdated, loads from `data.js`
   - Saves data to localStorage

2. **Subsequent Loads**:
   - Loads data from localStorage
   - Automatically detects if new players/matches/clubs were added to `data.js`
   - Updates localStorage if new data is detected

3. **Data Updates**:
   - Automatically refreshes when new players, matches, or clubs are added to `data.js`
   - No manual refresh button needed
   - Each page (Players, Competitions, League) checks for data updates on load

## 📱 Features

### Home Page (`index.html`)
- Overview of the application
- Quick statistics display
- Navigation to all sections

### Players Page (`players.html`)
- **View all players** (50+ real professional players) with:
  - Player ID (4-digit unique identifier)
  - First Name, Last Name
  - Club affiliation
  - Ranking points
  - Category (S, E21, J18, M13)
  - Country with flag icon
- **Filter by category** (S, E21, J18, M13)
- **Search by name** (real-time filtering)
- **Sort by**:
  - Ranking points (high to low / low to high)
  - Name (A-Z / Z-A)

### HTH Page (`hth.html`)
- **Search players** using autocomplete search (type to search)
- **Popular HTH matchups** - 10 pre-selected popular matchups displayed when no players are selected
- **View statistics**:
  - Total matches between players
  - Wins for each player
  - Last match result
- **Match history table** showing:
  - Date
  - Competition name
  - Players (with country flags)
  - Score
  - Winner (with country flag)

### Competitions Page (`competitions.html`)
- **Display all competitions** with:
  - Competition name and location
  - Date and category
  - Number of matches
- **Weather information** for competition location (consistent mock data)
- **Recent matches** in each competition with real results
- **Real match results** for major competitions (e.g., European Table Tennis Championships)

### League Page (`league.html`)
- **League standings table** sorted by league points
- **Club information**:
  - Position badges (Gold/Silver/Bronze for top 3)
  - Club name
  - League points
  - Number of players
- **View Players** button to see all players in a club

### Personal Details Modal
- **Accessible from all pages** via "Personal Details" button in navigation
- **Modal popup** displaying student information:
  - Student 1: First Name, Last Name, National ID
  - Student 2: First Name, Last Name, National ID
- **Side-by-side layout** for both student cards
- **Dynamically created** - modal is generated via JavaScript for all pages

## 🎨 Design Features

- **Modern UI** with card-based layout
- **Responsive design** - works on desktop, tablet, and mobile
- **Hover effects** on interactive elements
- **Consistent color palette** (sport-themed)
- **Flexbox/Grid** layouts for flexible positioning
- **Smooth transitions** and animations
- **Loading spinners** during data operations
- **Mobile-friendly** hamburger menu
- **Country flags** integrated throughout the UI

## 🔧 Technical Details

### Code Organization
- **Strict separation**: HTML, CSS, and JavaScript in separate files
- **No inline styles** or scripts
- **Modular architecture** - each page has its own JS file
- **Shared utilities** in `main.js`, `api.js`, and `storage.js`
- **Built-in Web APIs**: Uses Fetch API, localStorage API, and DOM API (all standard JavaScript)

### Data Source
- **Real-world data**: 50+ professional table tennis players from current ITTF/WTT rankings
- **Real match results**: 100+ realistic match results between players
- **Real competitions**: International tournaments with actual match data
- **4-digit player IDs**: Each player has a unique 4-digit ID (1000-9999)

### Performance
- Efficient localStorage operations
- Consistent mock weather data (no random fluctuations)
- Optimized rendering with minimal DOM manipulation
- Automatic data refresh detection

## 📝 Code Style

- **Clean, readable code** with clear comments
- **Consistent naming conventions** (camelCase for variables/functions)
- **Async/await** for asynchronous operations
- **Error handling** for API calls and storage operations
- **Modular functions** for reusability

## 🎯 Academic Requirements Compliance

✅ **UI written only in HTML**  
✅ **Styling only in separate CSS files**  
✅ **Logic only in separate JS files**  
✅ **Strict separation** between HTML, CSS, and JS  
✅ **External API integration** (Flag CDN, OpenWeatherMap)  
✅ **Personal Details button** with modal popup  
✅ **localStorage** for data persistence  
✅ **No manual database entry** - uses real-world data from `data.js`  
✅ **Modern, responsive design**  
✅ **Card layout with flexbox/grid**  
✅ **Hover effects**  
✅ **Consistent color palette**  

## 📊 Data Statistics

- **Players**: 50+ real professional players
- **Matches**: 100+ realistic match results
- **Competitions**: 5+ international tournaments
- **Clubs**: 10+ professional table tennis clubs
- **Countries**: 15+ countries represented

## 👤 Authors

Created as part of an academic web programming course project.

**Students:**
- Student 1: Aviv Amidor - ID: 
- Student 2: Yuval Batz - ID: 318530490

---

**Note**: This application uses real-world table tennis data from current ITTF/WTT rankings. Weather data uses consistent mock generation for demonstration purposes. In a production environment, you would connect to a real weather API for live data.
