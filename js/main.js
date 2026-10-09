/**
 * Main Module - Handles initialization and shared functionality
 * Used on index.html and provides common features like Personal Details modal
 */

// Auto-initialize only on home page to avoid side effects when imported by other modules.
document.addEventListener('DOMContentLoaded', async () => {
    const isHomePage = Boolean(document.getElementById('totalPlayers'));
    if (!isHomePage) return;

    await initializeApp();
    updateStats();
    setupMobileMenu();
    setupPersonalDetailsModal();
});

// Setup Personal Details Modal and Mobile Menu for all pages
document.addEventListener('DOMContentLoaded', () => {
    setupPersonalDetailsModal();
    setupMobileMenu();
});

/**
 * Initialize the application
 */
async function initializeApp() {
    // Check if data exists in storage
    if (!hasStoredData()) {
        console.log('No stored data found. Initializing data...');
        const data = await initializeData();
        saveAllData(data);
    } else {
        console.log('Loading data from storage...');
    }
}

/**
 * Update statistics on home page
 */
function updateStats() {
    const data = loadAllData();
    
    const totalPlayersEl = document.getElementById('totalPlayers');
    const totalCompetitionsEl = document.getElementById('totalCompetitions');
    const totalClubsEl = document.getElementById('totalClubs');
    const totalMatchesEl = document.getElementById('totalMatches');

    if (totalPlayersEl) totalPlayersEl.textContent = data.players.length;
    if (totalCompetitionsEl) totalCompetitionsEl.textContent = data.competitions.length;
    if (totalClubsEl) totalClubsEl.textContent = data.clubs.length;
    if (totalMatchesEl) totalMatchesEl.textContent = data.matches.length;
}

/**
 * Create Personal Details Modal dynamically
 */
function createPersonalDetailsModal() {
    // Check if modal already exists
    if (document.getElementById('personalDetailsModal')) {
        return;
    }

    // Create modal HTML
    const modalHTML = `
        <div id="personalDetailsModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Personal Details</h2>
                <div class="students-info">
                    <div class="student-card">
                        <h3>Student</h3>
                        <div class="student-details">
                            <p><strong>First Name:</strong> <span id="student1FirstName">Aviv</span></p>
                            <p><strong>Last Name:</strong> <span id="student1LastName">Amidor</span></p>
                            <p><strong>National ID:</strong> <span id="student1Id">322277831</span></p>
                        </div>
                    </div>
                    <div class="student-card">
                        <h3>Student</h3>
                        <div class="student-details">
                            <p><strong>First Name:</strong> <span id="student2FirstName">Yuval</span></p>
                            <p><strong>Last Name:</strong> <span id="student2LastName">Batz</span></p>
                            <p><strong>National ID:</strong> <span id="student2Id">318530490</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Setup Personal Details Modal
 */
function setupPersonalDetailsModal() {
    // Create modal if it doesn't exist
    createPersonalDetailsModal();

    const modal = document.getElementById('personalDetailsModal');
    const btn = document.getElementById('personalDetailsBtn');
    const closeBtn = modal?.querySelector('.close-modal');

    // Open modal
    if (btn) {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('active');
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

