function searchApps() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const apps = document.querySelectorAll('.app');

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';

    if (input) {
        const filteredApps = Array.from(apps).filter(app => {
            const appName = app.getAttribute('data-name').toLowerCase();
            return appName.includes(input);
        });

        if (filteredApps.length > 0) {
            suggestionsContainer.style.display = 'block';
            filteredApps.forEach(app => {
                const appName = app.getAttribute('data-name');
                const suggestion = document.createElement('div');
                suggestion.classList.add('suggestion');
                suggestion.innerHTML = highlightMatch(appName, input); // Highlight matched text
                suggestion.onclick = () => {
                    // Clear suggestions and filter displayed apps
                    clearSuggestions();
                    displaySelectedApp(appName);
                };
                suggestionsContainer.appendChild(suggestion);
            });
        }
    }
}

function highlightMatch(text, input) {
    const regex = new RegExp(`(${input})`, 'gi'); // Create a regex for the input
    return text.replace(regex, '<span class="highlight">$1</span>'); // Highlight matched part
}

function clearSuggestions() {
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
}

function displaySelectedApp(selectedApp) {
    const apps = document.querySelectorAll('.app');
    apps.forEach(app => {
        if (app.getAttribute('data-name').toLowerCase() === selectedApp.toLowerCase()) {
            app.scrollIntoView({ behavior: 'smooth', block: 'center' });
            app.style.border = '2px solid #6a11cb'; // Highlight selected app
        } else {
            app.style.display = 'none'; // Hide other apps
        }
    });
}

let lastScrollTop = 0; // Track the last scroll position
const navBar = document.getElementById('header'); // Select the navigation bar

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Current scroll position

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navBar.style.top = "-100px"; // Hide the navigation bar (adjust as needed)
    } else {
        // Scrolling up
        navBar.style.top = "0"; // Show the navigation bar
    }
    
    lastScrollTop = scrollTop; // Update last scroll position
});

// Apply fade-in effect when the page loads
window.addEventListener('load', () => {
    document.body.classList.remove('fade-out');
});
