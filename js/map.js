var map = L.map('map').setView([52.5200, 13.4050], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Map tiles by <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, under <a href="https://opendatacommons.org/licenses/odbl/" target="_blank">ODbL</a>.'
}).addTo(map);

var toilettenLayer = L.layerGroup().addTo(map);

loadToilettenLayer(map, toilettenLayer);

map.on('moveend', function () {
    loadToilettenLayer(map, toilettenLayer);
});

zentriereAufStandort(map);
