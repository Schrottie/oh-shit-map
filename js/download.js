// Warte darauf, dass das DOM vollständig geladen ist, bevor das Skript ausgeführt wird
document.addEventListener('DOMContentLoaded', function () {
    // Füge die Event-Listener für den Download-Button hinzu, wenn das DOM geladen ist
    addToiletDownloadLinkListener();
    addWaterDownloadLinkListener();
});

// Funktion zum Hinzufügen des Event-Listeners für den Toiletten-Download-Button
function addToiletDownloadLinkListener() {
    // Finde das DOM-Element des Download-Buttons anhand der ID
    const downloadLinkT = document.getElementById('download-toilets');

    // Wenn der Download-Button gefunden wurde, füge einen Event-Listener hinzu
    if (downloadLinkT) {
        downloadLinkT.addEventListener('click', downloadToilettenGPX);
    }
}

// Funktion zum Hinzufügen des Event-Listeners für den Wasser-Download-Button
function addWaterDownloadLinkListener() {
    // Finde das DOM-Element des Download-Buttons anhand der ID
    const downloadLinkW = document.getElementById('download-water');

    // Wenn der Download-Button gefunden wurde, füge einen Event-Listener hinzu
    if (downloadLinkW) {
        downloadLinkW.addEventListener('click', downloadWaterGPX);
    }
}

// Funktion zum Herunterladen von Toiletten-Daten im GPX-Format
function downloadToilettenGPX() {
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
        // Wenn Daten vorhanden sind, erstelle eine GPX-Datei und lade sie herunter
        if (data.elements) {
            const gpxData = createGPX(data.elements);
            downloadFile(gpxData, 'toiletten.gpx');
        } else {
            // Wenn keine Toiletten-Daten gefunden wurden, gib eine Fehlermeldung aus
            console.error('Keine Toiletten-Daten gefunden.');
        }
    })
    .catch(error => {
        // Behandele Fehler beim Abrufen der Toiletten-Daten
        console.error('Fehler beim Abrufen der Toiletten-Daten:', error);
    });
}

// Funktion zum Herunterladen von Trinkwasser-Daten im GPX-Format
function downloadWaterGPX() {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildWaterQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Toiletten-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        // Wenn Daten vorhanden sind, erstelle eine GPX-Datei und lade sie herunter
        if (data.elements) {
            const gpxData = createGPX(data.elements);
            downloadFile(gpxData, 'trinkwasser.gpx');
        } else {
            // Wenn keine Toiletten-Daten gefunden wurden, gib eine Fehlermeldung aus
            console.error('Keine Trinkwasserstellen gefunden.');
        }
    })
    .catch(error => {
        // Behandele Fehler beim Abrufen der Toiletten-Daten
        console.error('Fehler beim Abrufen der Trinkwasser-Daten:', error);
    });
}
// Funktion zum Erstellen von GPX-Daten aus den abgerufenen Toiletten-Elementen
function createGPX(elements) {
    // Initialisiere einen GPXBuilder
    const gpxBuilder = new GPXBuilder();

    // Iteriere über die Toiletten-Elemente und füge GPX-Punkte hinzu
    elements.forEach(toilet => {
        const latlng = [toilet.lat, toilet.lon];

        const gpxPoint = {
            lat: latlng[0],
            lon: latlng[1],
            ele: 0, 
            time: new Date().toISOString(), 
            name: toilet.tags.name || 'Öffentliche Toilette',
            desc: formatTags(toilet.tags),
        };

        gpxBuilder.addPoint(gpxPoint);
    });

    // Erhalte die vollständigen GPX-Daten
    const gpxData = gpxBuilder.toString();
    return gpxData;
}

// Funktion zum Herunterladen von GPX-Daten als Datei
function downloadFile(data, filename) {
    // Erstelle eine Blob mit den GPX-Daten
    const blob = new Blob([data], { type: 'application/gpx+xml' });
    // Erstelle ein Link-Element für den Download
    const link = document.createElement('a');
    // Setze die URL des Links auf die GPX-Daten
    link.href = window.URL.createObjectURL(blob);
    // Setze den Dateinamen für den Download
    link.download = filename;

    // Füge den Link zum DOM hinzu, triggere den Klick-Event und entferne den Link wieder
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Klasse für den Aufbau von GPX-Daten
class GPXBuilder {
    constructor() {
        // Initialisiere die GPX-Daten mit dem Header
        this.gpxData = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' +
            '<gpx version="1.1" creator="Oh-Shit-Map">\n' +
            '<trk>\n' +
            '<trkseg>\n';
    }

    // Füge einen GPX-Punkt hinzu
    addPoint(point) {
        this.gpxData += `<trkpt lat="${point.lat}" lon="${point.lon}">\n`;
        this.gpxData += `<ele>${point.ele}</ele>\n`;
        this.gpxData += `<time>${point.time}</time>\n`;
        this.gpxData += `<name>${point.name}</name>\n`;
        this.gpxData += `<desc>${point.desc}</desc>\n`;
        this.gpxData += '</trkpt>\n';
    }

    // Schließe die GPX-Daten ab
    toString() {
        this.gpxData += '</trkseg>\n' +
            '</trk>\n' +
            '</gpx>';
        return this.gpxData;
    }
}
