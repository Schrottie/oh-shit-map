
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title data-i18n="app.title">Oh-Shit-Map</title>
    <meta name="description" content="Fullscreen map with public toilets especially for runners but also for all other people" />

    <meta name="viewport" content="height = device-height,
    width = device-width,
    initial-scale = 1.0,
    minimum-scale = 1.0,
    maximum-scale = 1.0,
    user-scalable = no,
    target-densitydpi = device-dpi" />
	
    <link rel="author" href="https://running.maik-bischoff.de/author/schrottie/" />
    <link rel="icon" href="https://i0.wp.com/running.maik-bischoff.de/wp-content/uploads/2023/01/cropped-running.png?fit=32%2C32&#038;ssl=1" sizes="32x32" />
    <link rel="icon" href="https://i0.wp.com/running.maik-bischoff.de/wp-content/uploads/2023/01/cropped-running.png?fit=192%2C192&#038;ssl=1" sizes="192x192" />
    <link rel="apple-touch-icon" href="https://i0.wp.com/running.maik-bischoff.de/wp-content/uploads/2023/01/cropped-running.png?fit=180%2C180&#038;ssl=1" />
    <link rel="shortcut icon" href="https://i0.wp.com/running.maik-bischoff.de/wp-content/uploads/2023/01/cropped-running.png?fit=32%2C32&#038;ssl=1" sizes="32x32" type="image/png" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Oh Shit Map" />
    <meta property="og:description" content="proudly presented by: Schrotties Laufblog 100 Meilen" />
    <meta property="og:url" content="https://running.maik-bischoff.de/oh-shit/map.php" />
    <meta property="og:site_name" content="Oh Shit Map" />
    <meta property="og:image" content="https://i0.wp.com/running.maik-bischoff.de/wp-content/uploads/2023/01/cropped-running.png?fit=512%2C512&#038;ssl=1" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:image:alt" content="" />
    <meta property="og:locale" content="de_DE" />
    <meta name="twitter:site" content="@schrottie" />
	
    <!-- i18next -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/i18next/10.0.7/i18next.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/i18next-browser-languagedetector/2.1.0/i18nextBrowserLanguageDetector.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/i18next-xhr-backend/1.5.0/i18nextXHRBackend.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js" crossorigin="anonymous"></script>
    <!-- Leaflet Styles -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
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
    <script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>
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
