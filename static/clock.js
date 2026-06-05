let use24HourFormat = true;
let showAMPM = true;

// Fetch and display clocks on page load
document.addEventListener('DOMContentLoaded', function() {
    updateClocks();
    // Update every second
    setInterval(updateClocks, 1000);
});

function updateClocks() {
    fetch('/api/time')
        .then(response => response.json())
        .then(data => {
            renderClocks(data);
        })
        .catch(error => console.error('Error fetching time:', error));
}

function renderClocks(timesData) {
    const clockGrid = document.getElementById('clockGrid');
    
    // Clear existing clocks
    clockGrid.innerHTML = '';

    for (const [location, timeData] of Object.entries(timesData)) {
        const card = document.createElement('div');
        card.className = 'clock-card';
        
        const timeStr = timeData.time;
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        
        let displayHours = hours;
        let ampm = 'AM';
        
        if (!use24HourFormat) {
            if (hours >= 12) {
                ampm = 'PM';
                if (hours > 12) displayHours = hours - 12;
            } else if (hours === 0) {
                displayHours = 12;
            }
        }
        
        const formattedTime = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const ampmDisplay = showAMPM && !use24HourFormat ? `<div class="clock-ampm">${ampm}</div>` : '';
        
        card.innerHTML = `
            <div class="clock-location">${location}</div>
            <div class="clock-time">${formattedTime}</div>
            ${ampmDisplay}
            <div class="clock-date">${timeData.date}</div>
            <div class="clock-offset">
                <span class="offset-label">UTC Offset:</span> ${timeData.utc_offset}
            </div>
        `;
        
        clockGrid.appendChild(card);
    }
}

function toggleFormat() {
    use24HourFormat = !use24HourFormat;
    updateClocks();
}

function toggleAMPM() {
    showAMPM = !showAMPM;
    if (use24HourFormat) {
        use24HourFormat = false;
    }
    updateClocks();
}
