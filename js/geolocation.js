function zentriereAufStandort(map) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latlng = [position.coords.latitude, position.coords.longitude];
                map.setView(latlng, 13);
            },
            function (error) {
                console.error('Fehler bei der Standortermittlung:', error.message);
            }
        );
    } else {
        console.error('Geolocation wird nicht unterstÃ¼tzt.');
    }
}
