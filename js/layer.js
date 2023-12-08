// Funktion zum Hinzufügen von Checkboxen für die Layerauswahl zur Sidebar
function addCheckbox(labelText, checkboxId, isChecked, descriptionText) {
    // Erstelle das Label-Element
    var label = document.createElement("label");
    label.setAttribute("for", checkboxId);
    label.textContent = labelText;

    // Erstelle das Checkbox-Element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = isChecked;

    // Erstelle das Div für die Checkbox
    var layerwahl = document.createElement("div");

    // Füge das Label und die Checkbox zum Div hinzu
    layerwahl.appendChild(checkbox);
    layerwahl.appendChild(label);

    // Füge das Div zur Sidebar hinzu
    document.getElementById("checkboxes").appendChild(layerwahl);

    // Erstelle das P-Element für den Beschreibungstext
    var description = document.createElement("p");
    description.textContent = descriptionText;

    // Füge das P-Element zur Sidebar hinzu
    document.getElementById("checkboxes").appendChild(description);
}

// Erstelle die Beschreibungen
// Füge Checkboxen für Toiletten und Trinkwasserstellen hinzu
addCheckbox("Toiletten", "toilettenCheckbox", true, "Dieser Layer zeigt alle in Openstreetmap verzeichneten Toiletten im aktuell angezeigten Kartenausschnitt. (Standard)"); 
addCheckbox("Trinkwasserstellen", "trinkwasserCheckbox", false, "Dieser Layer zeigt in Openstreetmap eingetragene Trinkwasserstellen des aktuellen Kartenausschnittes. Die sind ja für Läufer oft auch ganz interessant, manch einer bekommt schließlich zuweilen Durst und hat nichts zu trinken dabei. 😉");
addCheckbox("Sportplätze", "sportplatzCheckbox", false, "Nicht jeder kennt jeden Sportplatz. Da kann natürlich Abhilfe geschafen werden. Und zwar mit diesem Layer. Er zeigt alls Sportplätze, die also Laufbahn für die Sportart Laufen deklariert sind. Damit fallen sicher etliche unter den Tisch, aber ohne diese Eingrenzung kommen zuviele Sportplätze, auf denen laufen nicht möglich ist.");
addCheckbox("Friedhöfe", "friedhofCheckbox", false, "Friedhöfe? Hier auf einer Karte für Läufer? 😦 Ja, und zwar aus ganz einfachem Grund: Auf Friedhöfen findet man häufig Wasserhähne aus denen Trinkwasser kommt. Und wenn man mal auf besonders langem Lauf ist, besonders Ultraläufer sind da ja durchaus auch mal Überland unterwegs, dann kann hier im Notfall das Wasser aufgefüllt werden. Radfahrer machen das übrigens auch so.");

// Füge einen Event-Listener zur Checkbox für Toiletten hinzu
document.getElementById('toilettenCheckbox').addEventListener('change', function () {
    if (this.checked) {
        toilettenLayer.addTo(map);
    } else {
        map.removeLayer(toilettenLayer);
    }
});

// Füge einen Event-Listener für das 'change'-Event der Toiletten-Checkbox hinzu
document.getElementById('toilettenCheckbox').addEventListener('change', function () {
    // Lade den Toilettenlayer basierend auf dem aktuellen Zustand der Checkbox
    loadToilettenLayer(map, toilettenLayer, this.checked);
});

// Füge einen Event-Listener zur Checkbox für Trinkwasserstellen hinzu
document.getElementById('trinkwasserCheckbox').addEventListener('change', function () {
    if (this.checked) {
        trinkwasserLayer.addTo(map);
    } else {
        map.removeLayer(trinkwasserLayer);
    }
});

// Füge einen Event-Listener für das 'change'-Event der Trinkwasser-Checkbox hinzu
document.getElementById('trinkwasserCheckbox').addEventListener('change', function () {
    // Lade den Trinkwasserlayer basierend auf dem aktuellen Zustand der Checkbox
    loadTrinkwasserLayer(map, trinkwasserLayer, this.checked);
});

// Füge einen Event-Listener zur Checkbox für Sportplätze hinzu
document.getElementById('sportplatzCheckbox').addEventListener('change', function () {
    if (this.checked) {
        sportplatzLayer.addTo(map);
    } else {
        map.removeLayer(sportplatzLayer);
    }
});

// Füge einen Event-Listener für das 'change'-Event der Sportplatz-Checkbox hinzu
document.getElementById('sportplatzCheckbox').addEventListener('change', function () {
    // Lade den Sportplatzlayer basierend auf dem aktuellen Zustand der Checkbox
    loadSportplatzLayer(map, sportplatzLayer, this.checked);
});

// Füge einen Event-Listener zur Checkbox für Friedhöfe hinzu
document.getElementById('friedhofCheckbox').addEventListener('change', function () {
    if (this.checked) {
        friedhofLayer.addTo(map);
    } else {
        map.removeLayer(friedhofLayer);
    }
});

// Füge einen Event-Listener für das 'change'-Event der Friedhof-Checkbox hinzu
document.getElementById('friedhofCheckbox').addEventListener('change', function () {
    // Lade den Friedhoflayer basierend auf dem aktuellen Zustand der Checkbox
    loadFriedhofLayer(map, friedhofLayer, this.checked);
});