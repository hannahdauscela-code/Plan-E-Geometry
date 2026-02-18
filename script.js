// Search functionality and page navigation
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');

const topics = {
    'area': 'areaPerimeter',
    'perimeter': 'areaPerimeter',
    'square': 'areaPerimeter',
    'rectangle': 'areaPerimeter',
    'triangle': 'areaPerimeter',
    'circle': 'areaPerimeter',
    'circumference': 'areaPerimeter',
    'properties': 'propertiesShapes',
    'shapes': 'propertiesShapes',
    'congruence': 'congruence',
    'similarity': 'similarity',
    'distance': 'coordinateGeometry',
    'midpoint': 'coordinateGeometry',
    'slope': 'coordinateGeometry',
    'coordinate': 'coordinateGeometry',
    'members': 'members'
};

// Search functionality
searchBar.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        searchResults.classList.remove('active');
        return;
    }

    const matches = [];
    for (const [key, pageId] of Object.entries(topics)) {
        if (key.includes(query)) {
            matches.push(pageId);
        }
    }

    // Remove duplicates
    const uniqueMatches = [...new Set(matches)];

    if (uniqueMatches.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
    } else {
        const pageNames = {
            'areaPerimeter': 'Area & Perimeter',
            'propertiesShapes': 'Properties of Shapes',
            'congruence': 'Triangle Congruence',
            'similarity': 'Similarity of Figures',
            'coordinateGeometry': 'Coordinate Geometry',
            'members': 'Project Members'
        };

        searchResults.innerHTML = uniqueMatches
            .map(pageId => `<div class="search-result-item" onclick="goToPageFromSearch('${pageId}')">${pageNames[pageId]}</div>`)
            .join('');
    }

    searchResults.classList.add('active');
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (e.target !== searchBar && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

// Page navigation function
function goToPage(pageId) {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Clear search bar if navigating from home
    if (pageId !== 'home') {
        searchBar.value = '';
        searchResults.classList.remove('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Navigate from search results
function goToPageFromSearch(pageId) {
    searchBar.value = '';
    searchResults.classList.remove('active');
    goToPage(pageId);
}

// Initialize - show home page
window.addEventListener('load', function() {
    goToPage('home');
});