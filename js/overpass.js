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

                const iconUrl = toilet.tags['toilets:position'] === 'urinal'
                    ? 'img/pipi.png'
                    : 'img/klo.png';

                if (toilet.tags.access && toilet.tags.access.toLowerCase() === 'permissive') {
                    const forbiddenIcon = L.icon({
                        iconUrl: 'img/no-klo.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    });

                    const popupContent = `
                        <span class="popup-title">${toilet.tags.name || 'Öffentliche Toilette'}</span><br />
                        <span class="popup-desc">Tags</span><br />${formatTags(toilet.tags)}<br />
                        <span class="popup-desc">Koordinaten</span><br /> <span class="popup-coord">${latlng.join(', ')}</span> (lat/lon)
                    `;

                    const marker = L.marker(latlng, { icon: forbiddenIcon })
                        .bindPopup(popupContent);

                    toilettenLayer.addLayer(marker);
                } else {
                    const toiletIcon = L.icon({
                        iconUrl: iconUrl,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    });

                    const popupContent = `
                        <span class="popup-title">${toilet.tags.name || 'Öffentliche Toilette'}</span><br />
                        <span class="popup-desc">Tags</span><br />${formatTags(toilet.tags)}<br />
                        <span class="popup-desc">Koordinaten</span><br /> <span class="popup-coord">${latlng.join(', ')}</span> (lat/lon)
                    `;

                    const marker = L.marker(latlng, { icon: toiletIcon })
                        .bindPopup(popupContent);

                    toilettenLayer.addLayer(marker);
                }
            });
        }
    });
}


function formatTags(tags) {
    const formattedTags = Object.entries(tags).map(([key, value]) => {
        if (key === 'website') {
            return `${key}: <a href="${value}" target="_blank">${value}</a>`;
        } else {
            return `${key}: ${value}`;
        }
    });

    return formattedTags.join('<br>');
}

function buildOverpassQuery(bounds) {
    var query = '[out:json];' +
        '(' +
            'node["amenity"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
            ');' +
            'way["amenity"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
            ');' +
            'relation["amenity"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
            ');' +
            'node["building"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
            ');' +
            'way["building"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
            ');' +
            'relation["building"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
            ');' +
        ');' +
        'out;';
    return query;
}
