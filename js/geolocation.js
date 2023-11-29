// Funktion zum Zentrieren der Karte auf den aktuellen Standort des Benutzers
function zentriereAufStandort(map) {
    // Überprüfe, ob die Geolocation-Funktion im Browser verfügbar ist
    if ('geolocation' in navigator) {
        // Fordere die aktuelle Position des Benutzers an
        navigator.geolocation.getCurrentPosition(
            // Erfolgsfall: Die Position wurde erfolgreich abgerufen
            function (position) {
                // Extrahiere die Breiten- und Längengrade aus der Position
                const latlng = [position.coords.latitude, position.coords.longitude];
                // Zentriere die Karte auf den abgerufenen Standort mit Zoom-Level 13
                map.setView(latlng, 13);
            },
            // Fehlerfall: Die Position konnte nicht abgerufen werden
            function (error) {
                console.error('Fehler bei der Standortermittlung:', error.message);
            }
        );
    } else {
        // Wenn die Geolocation-Funktion nicht unterstützt wird, gib einen Fehler aus
        console.error('Geolocation wird nicht unterstützt.');
    }
}