// Warte darauf, dass das DOM vollständig geladen ist, bevor das Skript ausgeführt wird
document.addEventListener('DOMContentLoaded', function () {
    // Finde DOM-Elemente für die Sidebar, Downloadbar und Helpbar
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');
    var layerbar = document.getElementById('layerbar');
    var layerbarToggle = document.getElementById('layerbar-toggle');
    var downloadbar = document.getElementById('downloadbar');
    var downloadbarToggle = document.getElementById('downloadbar-toggle');
    var helpbar = document.getElementById('helpbar');
    var helpbarToggle = document.getElementById('helpbar-toggle');
    var infobar = document.getElementById('infobar');
    var infobarToggle = document.getElementById('infobar-toggle');

    // Füge einen Event-Listener für das Klicken auf den Sidebar-Button hinzu
    sidebarToggle.addEventListener('click', function () {
        // Toggle-Klassen, um die Sichtbarkeit der Sidebar zu ändern
        sidebar.classList.toggle('show');
        // Ändere die Sichtbarkeit der Toggle-Buttons
        sidebarToggle.classList.toggle('show');
        layerbarToggle.classList.toggle('hidden');
        downloadbarToggle.classList.toggle('hidden');
        helpbarToggle.classList.toggle('hidden');
        infobarToggle.classList.toggle('hidden');
    });

    // Füge einen Event-Listener für das Klicken auf den Layerbar-Button hinzu
    layerbarToggle.addEventListener('click', function () {
        // Toggle-Klassen, um die Sichtbarkeit der Layerbar zu ändern
        layerbar.classList.toggle('show');
        // Ändere die Sichtbarkeit der Toggle-Buttons
        sidebarToggle.classList.toggle('hidden');
        layerbarToggle.classList.toggle('show');
        downloadbarToggle.classList.toggle('hidden');
        helpbarToggle.classList.toggle('hidden');
        infobarToggle.classList.toggle('hidden');
    });

    // Füge einen Event-Listener für das Klicken auf den Downloadbar-Button hinzu
    downloadbarToggle.addEventListener('click', function () {
        // Toggle-Klassen, um die Sichtbarkeit der Downloadbar zu ändern
        downloadbar.classList.toggle('show');
        // Ändere die Sichtbarkeit der Toggle-Buttons
        sidebarToggle.classList.toggle('hidden');
        layerbarToggle.classList.toggle('hidden');
        downloadbarToggle.classList.toggle('show');
        helpbarToggle.classList.toggle('hidden');
        infobarToggle.classList.toggle('hidden');
    });

    // Füge einen Event-Listener für das Klicken auf den Helpbar-Button hinzu
    helpbarToggle.addEventListener('click', function () {
        // Toggle-Klassen, um die Sichtbarkeit der Helpbar zu ändern
        helpbar.classList.toggle('show');
        // Ändere die Sichtbarkeit der Toggle-Buttons
        sidebarToggle.classList.toggle('hidden');
        layerbarToggle.classList.toggle('hidden');
        downloadbarToggle.classList.toggle('hidden');
        helpbarToggle.classList.toggle('show');
        infobarToggle.classList.toggle('hidden');
    });

    // Füge einen Event-Listener für das Klicken auf den Infobar-Button hinzu
    infobarToggle.addEventListener('click', function () {
        // Toggle-Klassen, um die Sichtbarkeit der Helpbar zu ändern
        infobar.classList.toggle('show');
        // Ändere die Sichtbarkeit der Toggle-Buttons
        sidebarToggle.classList.toggle('hidden');
        layerbarToggle.classList.toggle('hidden');
        downloadbarToggle.classList.toggle('hidden');
        helpbarToggle.classList.toggle('hidden');
        infobarToggle.classList.toggle('show');
    });
});
