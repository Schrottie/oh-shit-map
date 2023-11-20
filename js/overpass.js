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
