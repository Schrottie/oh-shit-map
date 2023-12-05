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