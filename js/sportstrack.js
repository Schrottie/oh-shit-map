// Funktion zum Laden und Anzeigen von Sportplatz-Daten auf der Karte
function loadSportplatzLayer(map, sportplatzLayer) {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildSportstrackQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Sportplatz-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        console.log('Overpass Data:', data); // Überprüfe die Overpass-Daten im Konsolenprotokoll

        // Überprüfe, ob Daten vorhanden sind
        if (data.elements && data.elements.length > 0) {
            // Lösche bestehende Marker in der Sportplatz-LayerGroup
            if (sportplatzLayer instanceof L.LayerGroup) {
                sportplatzLayer.clearLayers();
            }

            // Iteriere über die abgerufenen Sportplatz-Daten und füge Marker hinzu
            data.elements.forEach(sportstrack => {
                let latlng;

                if (sportstrack.type === 'node' && sportstrack.lat && sportstrack.lon) {
                    latlng = [sportstrack.lat, sportstrack.lon];
                } else if (sportstrack.type === 'way' && sportstrack.geometry && sportstrack.geometry.length > 0) {
                    // Extrahiere nur das erste Koordinatenpaar aus der Geometrie
                    const firstCoord = sportstrack.geometry[0];
                    if (firstCoord.lat && firstCoord.lon) {
                        latlng = [firstCoord.lat, firstCoord.lon];
                    }
                }else if (sportstrack.type === 'relation' && sportstrack.geometry && sportstrack.geometry.length > 0) {
                    // Extrahiere nur das erste Koordinatenpaar aus der Geometrie
                    const firstCoord = sportstrack.geometry[0];
                    if (firstCoord.lat && firstCoord.lon) {
                        latlng = [firstCoord.lat, firstCoord.lon];
                    }
                }

                // Wähle das passende Icon für die Sportplätze basierend auf den Tags
                const sportIcon = L.icon({
                    iconUrl: 'img/runner.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                // Erstelle einen Marker mit dem ausgewählten Icon und Popup-Inhalt
                const popupContent = `
                <span class="popup-title">${(sportstrack.tags && sportstrack.tags.name) ? sportstrack.tags.name : 'Sportplatz'}</span><br />
                <span class="popup-desc">Tags</span><br />${formatTags(sportstrack.tags)}<br />
                <span class="popup-desc">Koordinaten</span><br /> <span class="popup-coord">${latlng.join(', ')}</span> (lat/lon)
            `;

                const marker = L.marker(latlng, { icon: sportIcon })
                    .bindPopup(popupContent);

                if (sportplatzLayer instanceof L.LayerGroup) {
                    sportplatzLayer.addLayer(marker);
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
function buildSportstrackQuery(bounds) {
    return `[out:json][timeout:25];
        (
        nwr["sport"="running"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        nwr["leisure"="track"]["sport"="running"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        nwr["leisure"="track"]["sport"="athletics"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        nwr["athletics"="yes"](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});
        );
        out geom;`;
}

