// Funktion zum Laden und Anzeigen von Trinkwasser-Daten auf der Karte
function loadTrinkwasserLayer(map, trinkwasserLayer) {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildWaterQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Trinkwasser-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        console.log('Overpass Data:', data); // Überprüfe die Overpass-Daten im Konsolenprotokoll

        // Überprüfe, ob Daten vorhanden sind
        if (data.elements) {
            // Lösche bestehende Marker in der Trinkwasser-LayerGroup
            trinkwasserLayer.clearLayers();

            // Iteriere über die abgerufenen Trinkwasser-Daten und füge Marker hinzu
            data.elements.forEach(water => {
                let latlng;

                if (water.type === 'node') {
                    latlng = [water.lat, water.lon];
                } else if (water.type === 'way' && water.geometry && water.geometry.length > 0) {
                    // Extrahiere nur das erste Koordinatenpaar aus der Geometrie
                    const firstCoord = water.geometry[0];
                    latlng = [firstCoord.lat, firstCoord.lon];
                }

                // Wähle das passende Icon für das Trinkwasser basierend auf den Tags
                const waterIcon = L.icon({
                    iconUrl: 'img/wasser.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                // Erstelle einen Marker mit dem ausgewählten Icon und Popup-Inhalt
                const popupContent = `
                    <span class="popup-title">${water.tags.name || 'Trinkwasserstelle'}</span><br />
                    <span class="popup-desc">Tags</span><br />${formatTags(water.tags)}<br />
                    <span class="popup-desc">Koordinaten</span><br /> <span class="popup-coord">${latlng.join(', ')}</span> (lat/lon)
                `;

                const marker = L.marker(latlng, { icon: waterIcon })
                    .bindPopup(popupContent);

                trinkwasserLayer.addLayer(marker);
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
function buildWaterQuery(bounds) {
    return `[out:json][timeout:25];
        nwr["amenity"~"drinking_water"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        out geom;`;
}
