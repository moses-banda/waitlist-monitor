const counter = document.getElementById('counter');
const statusDot = document.querySelector('.status-dot');

// Automatically switch between localhost and production backend
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000'
    : 'https://waitlist-monitor.onrender.com'; // We will update this after deploying backend

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

    } catch (error) {
        console.error('Error fetching stats:', error);
        statusDot.style.backgroundColor = '#ef4444'; // Red for error
    }
}

// Initial fetch
fetchStats();

// Poll every 3 seconds
setInterval(fetchStats, 3000);
