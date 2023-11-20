var map = L.map('map').setView([52.5200, 13.4050], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Benutzerdefiniertes Toiletten-Icon
const toiletIcon = L.icon({
	iconUrl: 'klo.png',
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});
