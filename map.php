
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oh-Shit-Map</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style>
        #map-container {
            position: relative;
        }

        #map {
            height: 98vh;
            z-index: 1;
        }

        #map-title {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-70%);
            padding: 5px 15px 14px 15px;
            margin-bottom: 0;
            background-color: rgba(255, 255, 255, 0.9); 
            border-radius: 15px;
            border: solid 1px black;
            font-family: 'Lexend Deca', sans-serif; 
            font-size: 1.8em;
            color: black;
            z-index: 2;
			line-height: 0.4;
            text-align: center;
        }
        
        #map-title .sub {
			font-size: 0.43em;
			margin-top: 0px;
			padding-top: 0px;
		}
    </style>
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
    <script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>

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
