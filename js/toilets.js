// Funktion zum Laden und Anzeigen von Toiletten-Daten auf der Karte
function loadToilettenLayer(map, toilettenLayer) {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildToiletQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Toiletten-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        console.log('Overpass Data:', data); // Überprüfe die Overpass-Daten im Konsolenprotokoll
        
        // Überprüfe, ob Daten vorhanden sind
        if (data.elements) {
            // Lösche bestehende Marker in der Toiletten-LayerGroup
            toilettenLayer.clearLayers();

            // Iteriere über die abgerufenen Toiletten-Daten und füge Marker hinzu
            data.elements.forEach(toilet => {
                let latlng;
            
                if (toilet.type === 'node') {
                    latlng = [toilet.lat, toilet.lon];
                } else if (toilet.type === 'way' && toilet.geometry && toilet.geometry.length > 0) {
                    // Extrahiere nur das erste Koordinatenpaar aus der Geometrie
                    const firstCoord = toilet.geometry[0];
                    latlng = [firstCoord.lat, firstCoord.lon];
                }
                
                // Wähle das passende Icon für die Toilette basierend auf den Tags
                let iconUrl = 'img/klo.png';

                if (toilet.tags['toilets:position'] === 'urinal' && 'charge' in toilet.tags) {
                    iconUrl = 'img/urinal_charge.png';
                } else if (toilet.tags['toilets:position'] === 'urinal') {
                    iconUrl = 'img/pipi.png';
                } else if ('charge' in toilet.tags) {
                    iconUrl = 'img/klo_charge.png';
                }

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
                } else if (toilet.tags.access && toilet.tags.access.toLowerCase() === 'customers' && toilet.tags['toilets:position'] === 'urinal') {
                    // Erstelle einen Marker mit Kundenurinal-Icon und Popup-Inhalt
                    const forbiddenIcon = L.icon({
                        iconUrl: 'img/kundenpipi.png',
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
                } else if (toilet.tags.access && toilet.tags.access.toLowerCase() === 'customers') {
                    // Erstelle einen Marker mit Kundenklo-Icon und Popup-Inhalt
                    const forbiddenIcon = L.icon({
                        iconUrl: 'img/kundenklo.png',
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
                    // Erstelle einen Marker mit dem ausgewählten Icon und Popup-Inhalt
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
function buildToiletQuery(bounds) {
    return `[out:json][timeout:25];
        nwr["amenity"~"toilets"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        out geom;`;
}
