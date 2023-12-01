# Oh-Shit-Map

Die Oh-Shit-Map ist eine Fullscreen-Karte, auf der öffentliche Toiletten dargestellt werden. Dabei wird versucht, möglichst alle in Openstreetmap aufgeführten, öffentlichen Toiletten zu erfassen. Das gelingt leider nicht immer, da nicht alle Toiletten korrekt getaggt sind.

Das Original befindet sich unter [https://running.maik-bischoff.de/oh-shit-map/](https://running.maik-bischoff.de/oh-shit-map/), ein wenig mehr zum Hintergrund bzw. der Entstehungsgeschichte dieser Karte gibt es in meinem Blogartikel [Ernährung, Ausdauersport und was (immer im unpassendsten Moment) am Ende dabei herauskommt](https://running.maik-bischoff.de/ernaehrung-im-ausdauersport-und-was-am-ende-herauskommt/).

An der Karte darf selbstverständlich mitgearbeitet werden. Allerdings behalte ich mir vor, die beträge Dritter zunächst zu prüfen, da alles was hier in den main-Branch gemerged wird, per Action sofort auf meinen Webserver geschoben wird und damit live geht. Und da soll ja kein Unfug landen, der schlimmstenfalls später Ärger bringt, gelle?! 😉

### Credits

Die Karte stammt von [Openstreetmap](https://www.openstreetmap.org/copyright), wo sie unter der [CC BY 3.0 Lizenz](https://creativecommons.org/licenses/by/3.0/) veröffentlicht wird. Die Kartendaten stammen ebenfalls von Openstreetmap und sind unter der [Open Database License](https://opendatacommons.org/licenses/odbl/) veröffentlicht.

Für die Darstellung der Karte auf dieser Seite kommt [Leaflet](https://leafletjs.com/) zum Einsatz. Die Toilettendaten werden dabei mittels [Overpass-API](https://overpass-api.de/) abgerufen. Die Sidebar wurde mit Hilfe von [Bootstrap](https://getbootstrap.com/) und [JQuery](https://jquery.com/) realisiert.

### ToDo/Wishes

* Routingfunktion für Läufer
* Wegbelagauswertung wie bei Komoot
* Auswahl des bevorzugten Wegbelags (Asphalt, Waldwege, Singletrails)
* Export von Strecken als GPX
