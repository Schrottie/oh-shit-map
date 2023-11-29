// Erstelle eine Leaflet-Karte mit einer Startansicht und einem Zoom-Level
var map = L.map('map').setView([52.5200, 13.4050], 13);

// Füge eine OpenStreetMap-Kartenebene zur Karte hinzu
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Map tiles by <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, under <a href="https://opendatacommons.org/licenses/odbl/" target="_blank">ODbL</a>.'
}).addTo(map);

// Erstelle eine Leaflet-LayerGroup für Toiletten und füge sie zur Karte hinzu
var toilettenLayer = L.layerGroup().addTo(map);

// Lade Toiletten-Daten und füge sie zur Toiletten-LayerGroup hinzu
loadToilettenLayer(map, toilettenLayer);

// Füge einen Event-Listener für das 'moveend'-Event hinzu, um Toiletten-Daten beim Kartenbewegen nachzuladen
map.on('moveend', function () {
    loadToilettenLayer(map, toilettenLayer);
});

// Zentriere die Karte auf den Standort des Benutzers, wenn möglich
zentriereAufStandort(map);