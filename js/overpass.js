// Funktion zum Laden und Anzeigen von Toiletten-Daten auf der Karte
function loadToilettenLayer(map, toilettenLayer) {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildOverpassQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Toiletten-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        // Überprüfe, ob Daten vorhanden sind
        if (data.elements) {
            // Lösche bestehende Marker in der Toiletten-LayerGroup
            toilettenLayer.clearLayers();

            // Iteriere über die abgerufenen Toiletten-Daten und füge Marker hinzu
            data.elements.forEach(toilet => {
                const latlng = [toilet.lat, toilet.lon];

                // Wähle das passende Icon für die Toilette basierend auf den Tags
                const iconUrl = toilet.tags['toilets:position'] === 'urinal'
                    ? 'img/pipi.png'
                    : 'img/klo.png';

                // Überprüfe, ob der Zugang zur Toilette erlaubt ist
                if (toilet.tags.access && toilet.tags.access.toLowerCase() === 'permissive') {
                    // Erstelle einen Marker mit "verbotenem" Icon und Popup-Inhalt
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
                    // Erstelle einen Marker mit normalem Toiletten-Icon und Popup-Inhalt
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

// Funktion zum Formatieren von Tags für die Anzeige im Popup
function formatTags(tags) {
    const formattedTags = Object.entries(tags).map(([key, value]) => {
        // Wenn es sich um die Website handelt, erstelle einen Link
        if (key === 'website') {
            return `${key}: <a href="${value}" target="_blank">${value}</a>`;
        } else {
            return `${key}: ${value}`;
        }
    });

    return formattedTags.join('<br>');
}

// Funktion zum Erstellen einer Overpass-Abfrage basierend auf den Kartenbegrenzungen
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
