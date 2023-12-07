// Erstelle eine Leaflet-Karte mit einer Startansicht und einem Zoom-Level
var map = L.map('map').setView([52.5200, 13.4050], 13);

// Füge eine OpenStreetMap-Kartenebene zur Karte hinzu
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Map tiles by <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, under <a href="https://opendatacommons.org/licenses/odbl/" target="_blank">ODbL</a>.'
}).addTo(map);

// Erstelle eine Leaflet-LayerGroup für Toiletten und füge sie zur Karte hinzu
var toilettenLayer = L.layerGroup().addTo(map);

// Lade Toiletten-Daten und füge sie zur Toiletten-LayerGroup hinzu, wenn die Checkbox aktiviert ist
loadToilettenLayer(map, toilettenLayer);

// Erstelle eine Leaflet-LayerGroup für Trinkwasserstellen und füge sie zur Karte hinzu
var trinkwasserLayer = L.layerGroup().addTo(map);

// Lade Trinkwasserstellen-Daten und füge sie zur Trinkwasser-LayerGroup hinzu, wenn die Checkbox aktiviert ist
if (document.getElementById('trinkwasserCheckbox').checked) {
    loadTrinkwasserLayer(map, trinkwasserLayer);
}

// Erstelle eine Leaflet-LayerGroup für Friedhöfe und füge sie zur Karte hinzu
var friedhofLayer = L.layerGroup().addTo(map);

// Lade Friedhof-Daten und füge sie zur Friedhof-LayerGroup hinzu, wenn die Checkbox aktiviert ist
if (document.getElementById('friedhofCheckbox').checked) {
    loadFriedhofLayer(map, friedhofLayer);
}

// Füge einen Event-Listener für das 'moveend'-Event hinzu, um Layer-Daten beim Kartenbewegen nachzuladen
map.on('moveend', function () {
    // Prüfe den Zustand der Checkboxen und lade den entsprechenden Layer
    if (document.getElementById('toilettenCheckbox').checked) {
        loadToilettenLayer(map, toilettenLayer);
    }

    if (document.getElementById('trinkwasserCheckbox').checked) {
        loadTrinkwasserLayer(map, trinkwasserLayer);
    }

    if (document.getElementById('friedhofCheckbox').checked) {
        loadFriedhofLayer(map, trinkwasserLayer);
    }
});

// Zentriere die Karte auf den Standort des Benutzers, wenn möglich
zentriereAufStandort(map);
