// Warte darauf, dass das DOM vollständig geladen ist, bevor das Skript ausgeführt wird
document.addEventListener('DOMContentLoaded', function () {
    // Füge die Event-Listener für den Download-Button hinzu, wenn das DOM geladen ist
    addToiletDownloadLinkListener();
    addWaterDownloadLinkListener();
    addSportstrackDownloadLinkListener();
    addCemeteryDownloadLinkListener();
});

// Toilettendaten herunterladen

function addToiletDownloadLinkListener() {
    // Finde das DOM-Element des Download-Buttons anhand der ID
    const downloadLinkT = document.getElementById('download-toilets');
    // Wenn der Download-Button gefunden wurde, füge einen Event-Listener hinzu
    if (downloadLinkT) {
        downloadLinkT.addEventListener('click', downloadToilettenGPX);
    }
}
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
            const elementsWithSingleCoords = extractFirstCoords(data.elements);
            const gpxData = createGPX(elementsWithSingleCoords, 'Öffentliche Toilette');
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

// Trinwasserdaten herunterladen

function addWaterDownloadLinkListener() {
    // Finde das DOM-Element des Download-Buttons anhand der ID
    const downloadLinkW = document.getElementById('download-water');
    // Wenn der Download-Button gefunden wurde, füge einen Event-Listener hinzu
    if (downloadLinkW) {
        downloadLinkW.addEventListener('click', downloadWaterGPX);
    }
}
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
            const elementsWithSingleCoords = extractFirstCoords(data.elements);
            const gpxData = createGPX(elementsWithSingleCoords, 'Trinkwasserstelle');
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

// Sportplatzdaten herunterladen

function addSportstrackDownloadLinkListener() {
    // Finde das DOM-Element des Download-Buttons anhand der ID
    const downloadLinkS = document.getElementById('download-sportstrack');
    // Wenn der Download-Button gefunden wurde, füge einen Event-Listener hinzu
    if (downloadLinkS) {
        downloadLinkS.addEventListener('click', downloadSportplatzGPX);
    }
}
function downloadSportplatzGPX() {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildSportstrackQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Toiletten-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        // Wenn Daten vorhanden sind, erstelle eine GPX-Datei und lade sie herunter
        if (data.elements) {
            const elementsWithSingleCoords = extractFirstCoords(data.elements);
            const gpxData = createGPX(elementsWithSingleCoords, "Sportplatz/Laufbahn");
            downloadFile(gpxData, 'sportplatz.gpx');
        } else {
            // Wenn keine Sportplatz-Daten gefunden wurden, gib eine Fehlermeldung aus
            console.error('Keine Sportplätze gefunden.');
        }
    })
    .catch(error => {
        // Behandele Fehler beim Abrufen der Toiletten-Daten
        console.error('Fehler beim Abrufen der Sportplatz-Daten:', error);
    });
}

// Friedhöfe herunterladen 

function addCemeteryDownloadLinkListener() {
    // Finde das DOM-Element des Download-Buttons anhand der ID
    const downloadLinkC = document.getElementById('download-cemetery');
    // Wenn der Download-Button gefunden wurde, füge einen Event-Listener hinzu
    if (downloadLinkC) {
        downloadLinkC.addEventListener('click', downloadCemeteryGPX);
    }
}
function downloadCemeteryGPX() {
    // Ermittle die Begrenzungen der aktuellen Kartenansicht
    var bounds = map.getBounds();
    // Baue eine Overpass-Abfrage basierend auf den Kartenbegrenzungen
    var overpassQuery = buildCemeteryQuery(bounds);

    // Führe einen POST-Request zur Overpass-API durch, um Toiletten-Daten abzurufen
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        // Wenn Daten vorhanden sind, erstelle eine GPX-Datei und lade sie herunter
        if (data.elements) {
            const elementsWithSingleCoords = extractFirstCoords(data.elements);
            const gpxData = createGPX(elementsWithSingleCoords, "Friedhof");
            downloadFile(gpxData, 'friedhof.gpx');
        } else {
            // Wenn keine Friedhof-Daten gefunden wurden, gib eine Fehlermeldung aus
            console.error('Keine Friedhöfe gefunden.');
        }
    })
    .catch(error => {
        // Behandele Fehler beim Abrufen der Friedhof-Daten
        console.error('Fehler beim Abrufen der Friedhof-Daten:', error);
    });
}


// GPX erzeugen

// Extrahiere nur das erste Koordinatenpaar für jedes Element
function extractFirstCoords(elements) {
    return elements.map(element => {
        let latlng;

        if (element.type === 'node' && element.lat && element.lon) {
            latlng = [element.lat, element.lon];
        } else if (element.type === 'way' && element.geometry && element.geometry.length > 0) {
            const firstCoord = element.geometry[0];
            if (firstCoord.lat && firstCoord.lon) {
                latlng = [firstCoord.lat, firstCoord.lon];
            }
        } else if (element.type === 'relation' && element.members && element.members.length > 0) {
            // Wenn es sich um eine Relation handelt, versuchen Sie, das erste Koordinatenpaar eines Mitglieds zu extrahieren
            const memberWithCoords = element.members.find(member => {
                return member.type === 'node' && member.lat && member.lon;
            });

            if (memberWithCoords) {
                latlng = [memberWithCoords.lat, memberWithCoords.lon];
            }
        }

        return {
            ...element,
            latlng: latlng
        };
    });
}


// Funktion zum Erstellen von GPX-Daten aus den abgerufenen Elementen
function createGPX(elements, dataname) {
    // Initialisiere einen GPXBuilder
    const gpxBuilder = new GPXBuilder();

    // Iteriere über die Elemente und füge GPX-Punkte hinzu
    elements.forEach(element => {
        const latlng = element.latlng;

        if (latlng) {
            const gpxPoint = {
                lat: latlng[0],
                lon: latlng[1],
                ele: 0,
                time: new Date().toISOString(),
                name: element.tags.name || dataname,
                desc: formatTags(element.tags),
            };

            gpxBuilder.addPoint(gpxPoint);
        }
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
