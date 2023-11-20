// map.js

var map = L.map('map').setView([52.5200, 13.4050], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var toilettenLayer = L.layerGroup().addTo(map);

// Lade Toilettenlayer beim Initialisieren
loadToilettenLayer(map, toilettenLayer);

// Führe die Overpass API-Abfrage bei Kartenbewegung aus
map.on('moveend', function () {
    loadToilettenLayer(map, toilettenLayer);
});

// Füge die Standort-Ermittlungsfunktion hinzu
zentriereAufStandort(map);
