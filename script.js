let map = null;

function navigateTo(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // Show the selected page
    const selectedPage = document.getElementById(page);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active button in sidebar
    const buttons = document.querySelectorAll('.sidebar-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.sidebar-button').classList.add('active');

    // Initialize map when search page is opened
    if (page === 'search' && !map) {
        initializeMap();
    }
}

function initializeMap() {
    // Create map centered on a default location (San Francisco, USA)
    map = L.map('map').setView([37.7749, -122.4194], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 1
    }).addTo(map);

    // Add a sample marker
    L.marker([37.7749, -122.4194]).addTo(map)
        .bindPopup('<b>San Francisco</b><br>Sample Location')
        .openPopup();

    // Add click event to map for adding markers
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>New Location</b><br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
    });

    // Ensure map resizes properly
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set home page as active initially
    document.getElementById('home').classList.add('active');
});
