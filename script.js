// script.js

// Functionality for filtering topics
function filterTopics(topics, query) {
    return topics.filter(topic => topic.toLowerCase().includes(query.toLowerCase()));
}

// Functionality for page navigation without reloads
function navigateTo(page) {
    // Logic for navigation
    const content = document.getElementById('content');
    content.innerHTML = `Loading ${page}...`;
    fetch(page)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
            smoothTransition();
        });
}

// Smooth transition effects
function smoothTransition() {
    const content = document.getElementById('content');
    content.classList.add('fade');
    setTimeout(() => content.classList.remove('fade'), 300);
}

// Functionality for displaying search results without duplicates
function displayResults(results) {
    const uniqueResults = [...new Set(results)];
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';
    uniqueResults.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result;
        div.addEventListener('click', () => handleResultClick(result));
        resultContainer.appendChild(div);
    });
}

// Click handler for search results
function handleResultClick(result) {
    // Logic for handling search result click
    alert(`You clicked: ${result}`);
    navigateTo(result);
}

// Event listener for search input
document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value;
    const topics = ['area', 'congruence', 'distance', 'other topics'];  // Example topics
    const results = filterTopics(topics, query);
    displayResults(results);
});

// Event listeners for navigation buttons
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => navigateTo(button.dataset.page));
});