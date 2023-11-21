const toiletIcon = L.icon({
    iconUrl: 'img/klo.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function loadToilettenLayer(map, toilettenLayer) {
    var bounds = map.getBounds();
    var overpassQuery = buildOverpassQuery(bounds);

    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        if (data.elements) {
            toilettenLayer.clearLayers();

            data.elements.forEach(toilet => {
                const latlng = [toilet.lat, toilet.lon];
                L.marker(latlng, { icon: toiletIcon })
                    .bindPopup(`${toilet.tags.name || 'Öffentliche Toilette'}`)
                    .addTo(toilettenLayer);
            });
        }
    });
}

function buildOverpassQuery(bounds) {
    var query = '[out:json];' +
        'node["amenity"="toilets"](' +
        bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
        bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
        ');' +
        'out;';

    return query;
}
