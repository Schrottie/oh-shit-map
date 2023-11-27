document.addEventListener('DOMContentLoaded', function () {
    addDownloadLinkListener();
});

function addDownloadLinkListener() {
    const downloadLink = document.getElementById('download-button');

    if (downloadLink) {
        downloadLink.addEventListener('click', downloadToilettenGPX);
    }
}

function downloadToilettenGPX() {
    var bounds = map.getBounds();
    var overpassQuery = buildOverpassQuery(bounds);

    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
    })
    .then(response => response.json())
    .then(data => {
        if (data.elements) {
            const gpxData = createGPX(data.elements);

            downloadFile(gpxData, 'toiletten.gpx');
        } else {
            console.error('Keine Toiletten-Daten gefunden.');
        }
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Toiletten-Daten:', error);
    });
}
function createGPX(elements) {
    const gpxBuilder = new GPXBuilder();

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

    const gpxData = gpxBuilder.toString();
    downloadGPXFile(gpxData, 'toiletten.gpx');
}

function downloadGPXFile(data, filename) {
    const blob = new Blob([data], { type: 'application/gpx+xml' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

class GPXBuilder {
    constructor() {
        this.gpxData = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' +
            '<gpx version="1.1" creator="YourAppName">\n' +
            '<trk>\n' +
            '<trkseg>\n';
    }

    addPoint(point) {
        this.gpxData += `<trkpt lat="${point.lat}" lon="${point.lon}">\n`;
        this.gpxData += `<ele>${point.ele}</ele>\n`;
        this.gpxData += `<time>${point.time}</time>\n`;
        this.gpxData += `<name>${point.name}</name>\n`;
        this.gpxData += `<desc>${point.desc}</desc>\n`;
        this.gpxData += '</trkpt>\n';
    }

    toString() {
        this.gpxData += '</trkseg>\n' +
            '</trk>\n' +
            '</gpx>';
        return this.gpxData;
    }
}
