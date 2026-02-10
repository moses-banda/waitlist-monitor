const counter = document.getElementById('counter');
const statusDot = document.querySelector('.status-dot');

// If served from backend (same origin), use relative path. 
// If opened directly as file (file:// or localhost frontend dev server), point to backend URL.
const API_URL = (window.location.protocol === 'file:' || window.location.port === '5500')
    ? 'http://localhost:8000'
    : '';

async function fetchStats() {
    try {
        const response = await fetch(`${API_URL}/status`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Animate the number change if different
        const currentVal = parseInt(counter.innerText) || 0;
        const newVal = data.count;

        if (currentVal !== newVal && !isNaN(currentVal)) {
            // Simple flash effect on update
            counter.style.color = '#22c55e';
            setTimeout(() => counter.style.color = '#ffffff', 300);
        }

        counter.innerText = newVal;
        statusDot.style.backgroundColor = '#22c55e'; // Green for connected

        // Update status text with timestamp
        const now = new Date().toLocaleTimeString();
        statusText.innerText = `Live • Last updated: ${now}`;
        statusText.style.color = '#22c55e';

    } catch (error) {
        console.error('Error fetching stats:', error);
        statusDot.style.backgroundColor = '#ef4444'; // Red for error
        statusText.innerText = 'Connection Lost';
        statusText.style.color = '#ef4444';

        // Verify if it's a content decoding error or network error
        if (counter.innerText === '--' || counter.innerText === '') {
            counter.innerText = 'ERR';
            counter.style.fontSize = '8rem'; // Shrink slightly for text
        }
    }
}

// Initial fetch
fetchStats();

// Poll every 3 seconds
setInterval(fetchStats, 3000);
