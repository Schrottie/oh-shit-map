
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
			<br /><span class="sub">proudly presented by: Schrotties Laufblog  &raquo;<a href="https://running.maik-bischoff.de/" target="foo">100 Meilen</a>&laquo;</span>
		</div>
    </div>
    <script src="js/leaflet.js"></script>
    <script src="js/map.js"></script>
    <script src="js/overpass.js"></script>

    <script>
        var toilettenLayer = L.layerGroup().addTo(map);

        // Lade Toilettenlayer beim Initialisieren
        loadToilettenLayer();

        // Führe die Overpass API-Abfrage bei Kartenbewegung aus
        map.on('moveend', loadToilettenLayer);
    </script>
</body>
</html>
