// Funktion zum Laden und Anzeigen von Friedhof-Daten auf der Karte
function loadFriedhofLayer(map, friedhofLayer) {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildCemeteryQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Friedhof-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        console.log('Overpass Data:', data); // Überprüfe die Overpass-Daten im Konsolenprotokoll

        // Überprüfe, ob Daten vorhanden sind
        if (data.elements && data.elements.length > 0) {
            // Lösche bestehende Marker in der Friedhof-LayerGroup
            if (friedhofLayer instanceof L.LayerGroup) {
                friedhofLayer.clearLayers();
            }

            // Iteriere über die abgerufenen Friedhof-Daten und füge Marker hinzu
            data.elements.forEach(cemetery => {
                let latlng;

                if (cemetery.type === 'node') {
                    latlng = [cemetery.lat, cemetery.lon];
                } else if (cemetery.type === 'way' && cemetery.geometry && cemetery.geometry.length > 0) {
                    // Extrahiere nur das erste Koordinatenpaar aus der Geometrie
                    const firstCoord = cemetery.geometry[0];
                    latlng = [firstCoord.lat, firstCoord.lon];
                }

                // Wähle das passende Icon für die Friedhöfe basierend auf den Tags
                const cemeteryIcon = L.icon({
                    iconUrl: 'img/friedhof.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                // Erstelle einen Marker mit dem ausgewählten Icon und Popup-Inhalt
                const popupContent = `
                    <span class="popup-title">${(cemetery.tags && cemetery.tags.name) ? cemetery.tags.name : 'Friedhof'}</span><br />
                    <span class="popup-desc">Tags</span><br />${formatTags(cemetery.tags)}<br />
                    <span class="popup-desc">Koordinaten</span><br /> <span class="popup-coord">${latlng.join(', ')}</span> (lat/lon)
                `;

                const marker = L.marker(latlng, { icon: cemeteryIcon })
                    .bindPopup(popupContent);

                if (friedhofLayer instanceof L.LayerGroup) {
                    friedhofLayer.addLayer(marker);
                }
            });
        } else {
            console.warn('Keine Daten gefunden.');
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
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
function buildCemeteryQuery(bounds) {
    return `[out:json][timeout:25];
        nwr["landuse"~"cemetery"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        out geom;`;
}
