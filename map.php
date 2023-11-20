
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oh-Shit-Map</title>

    <!-- Leaflet Styles -->
    <link rel="css/leaflet.css" />
    <!-- Eigene Styles -->
    <link rel="css/map.css" />
    <!-- Google Fonts Lexend Deca -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400&display=swap">

</head>
<body>
    <div id="map-container">
        <div id="map"></div>
        <div id="map-title">
			<img src="klo.png" width="32" height="32" style="margin-right: 10px; margin-left: 10px;" />
			Oh-Shit-Map
			<img src="klo.png" width="32" height="32" style="margin-right: 10px; margin-left: 10px;" />
			<br /><span class="sub">proudly presented by: Schrotties Laufblog "<a href="https://running.maik-bischoff.de/" target="foo">100 Meilen</a>"</span>
		</div>
    </div>
    <script src="js/leaflet.js"></script>

    <script>
        var map = L.map('map').setView([52.5200, 13.4050], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Benutzerdefiniertes Toiletten-Icon
        const toiletIcon = L.icon({
            iconUrl: 'klo.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        var toilettenLayer = L.layerGroup().addTo(map);

        // Führe die Overpass API-Abfrage beim Laden der Seite und bei Kartenbewegung aus
        function loadToilettenLayer() {
            var bounds = map.getBounds();
            var overpassQuery = buildOverpassQuery(bounds);

            fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: overpassQuery
            })
            .then(response => response.json())
            .then(data => {
                // Überprüfe, ob Daten vorhanden sind
                if (data.elements) {
                    toilettenLayer.clearLayers();

                    // Toilettenmarker manuell erstellen
                    data.elements.forEach(toilet => {
                        const latlng = [toilet.lat, toilet.lon];
                        L.marker(latlng, { icon: toiletIcon })
                            .bindPopup(`${toilet.tags.name || 'Öffentliche Toilette'}`)
                            .addTo(toilettenLayer);
                    });
                }
            });
        }

        // Lade Toilettenlayer beim Initialisieren
        loadToilettenLayer();

        // Führe die Overpass API-Abfrage bei Kartenbewegung aus
        map.on('moveend', loadToilettenLayer);

        function buildOverpassQuery(bounds) {
            // Baue die Overpass API-Abfrage mit den aktuellen Kartengrenzen
            var query = '[out:json];' +
                'node["amenity"="toilets"](' +
                bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + ',' +
                bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng +
                ');' +
                'out;';

            return query;
        }
    </script>
</body>
</html>
