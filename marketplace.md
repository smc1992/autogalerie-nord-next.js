Verwendung der pixelconcept
Automanager Marketplace Fahrzeugbörse
auf der eigenen Webseite
Voraussetzungen
- Die Fahrzeugbörse setzt einen aktiven Fahrzeugbestand in der pixelconcept Automanager
Fahrzeugverwaltung voraus. Ausreichend hierfür ist das Basis-Paket Free.
- Die Fahrzeugbörse muss für die Verwendung auf einer eigenen Domain von pixelconcept
lizensiert sein. Diese ist gegebenenfalls zusätzlich zur Fahrzeugverwaltung zu erwerben.
Nähere Angaben finden Sie dazu in der Leistungsbeschreibung.
- Der Anwender muss auf den Quelltext der Webseite zugreifen können.
Integration
Die Einbindung erfolgt grundsätzlich durch die Verwendung einer Skriptreferenz im Quelltext des
HTML-Dokuments, das zur Darstellung der Fahrzeugbörse dienen soll.
Die Skriptreferenz ist in der Lage, unabhängig von anderen Inhalten im selben Dokument, die
Fahrzeugbörse zu initialisieren und darzustellen. Hierzu siehe auch Technische Voraussetzungen und
Rahmenbedingungen für die Integration des AUTOMANAGER Marketplace (Fahrzeugbörse)
Initialisierung
Die Konfiguration der Fahrzeugbörse kann vollständig in der pixelconcept Automanager
Fahrzeugverwaltung vorgenommen werden. Für die Identifikation des Fahrzeugbestands und der
Konfiguration wird der sogenannter API-Key verwendet, den Sie in der Fahrzeugverwaltung angezeigt
bekommen. Üblicherweise handelt es sich um eine Zahlen-/Buchstaben-Kombination wie z.B. diese:
a9058cf1-0a67-2ead-a289-8e5e59967d98.
Einbindung Skriptreferenz
Das folgende HTML-Fragment zeigt den Inhalt eines HTML-Dokuments, auf dem eine Fahrzeugbörse
angezeigt wird:
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>pixelconcept Marketplace</title>
</head>
<body>
<h1>Seiten-Titel<h1>
<script src="https://cdn.dein.auto/pxc-amm/loader.nocache"
api-key="{{API-KEY}}"></script>
<div class="footer">
<a href="impressum.html">Impressum</a>
</div>
</body>
</html>
Die Skriptreferenz der Automanager Fahrzeugbörse ist rot unterlegt. Anstelle des hier gelb
markierten Platzhalters für den API-Key müssen Sie Ihren individuellen Schlüssel eintragen.
Die HTML-Struktur der Seite kann ansonsten frei gestaltet werden.
Die Fahrzeugbörse wird an genau der Stelle eingeblendet, an der sich die Skriptreferenz befindet. In
diesem Fall also unterhalb des H1 Seiten-Titels, vor der Fusszeile mit dem Link auf das Impressum.
Parametrisierung
Einige Parameter können bei der Integration der Skriptreferenz angegeben werden. Insbesondere
sind dies die Verlinkungen zu den Seiten Impressum, AGB und Datenschutz, die nicht Bestandteil der
Fahrzeugbörse sein können, sondern in Ihrer Webpräsenz bereitgestellt werden müssen.
Damit aus der Fahrzeugbörse heraus korrekt auf die AGB, das Impressum und die
Datenschutzbestimmungen verlinkt werden kann, müssen entsprechende Link-Ziele spezifiziert
werden. Dazu werden Attribute auf der Skriptreferenz verwendet, wie nachfolgend dargestellt:
...
<script src="https://cdn.dein.auto/pxc-amm/loader.nocache"
api-key="{{API-KEY}}"
urls-imprint='impressum.html'
urls-terms='agb.html'
urls-privacy='datenschutz.html'></script>
...
Webseiten-Optimierung
Damit Webseiten schneller laden, wird empfohlen, Skriptreferenzen an das Ende des Dokuments zu
verschieben. Im Beispiel wäre das nach dem DIV-Element mit der footer CSS Klasse.
Da die Skriptreferenz der Fahrzeugbörse allerdings sehr schnell lädt, blockiert sie den Aufbau der
Seite im Browser kaum.
Die Fahrzeugbörse lädt ihrerseits alle benötigten weiteren Ressourcen asynchron. In manchen Fällen
kann es in der Benutzererfahrung sogar von Vorteil sein, die Skriptreferenz in den head-Abschnitt
einzufügen, damit sie von Browser priorisiert geladen wird.
Welche Methode das beste Ergebnis liefert, ist von Ihrer Webseite abhängig. Damit Sie die für Sie
beste Lösung umsetzen können, ist die Skriptreferenz frei positionierbar. Sie kann also sowohl in den
head-Abschnitt, als auch an einer beliebigen anderen Stelle der Webseite eingefügt werden. Sie
müssen in beiden Fällen jedoch ein HTML-Element an der Stelle in der Seite vorsehen, an der die
Fahrzeugbörse angezeigt werden soll. Dieses Element muss über das id-Attribut mit dem Wert am-
marketplace verfügen, wie das nachfolgende Beispiel zeigt:
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>pixelconcept Marketplace</title>
<script src="https://cdn.dein.auto/pxc-amm/loader.nocache"></script>
</head>
<body>
<h1>Seiten-Titel<h1>
<div id="am-marketplace"
api-key="{{API-KEY}}"
urls-imprint='impressum.html'
urls-terms='agb.html'
urls-privacy='datenschutz.html'></div>
<div class="footer">
<a href="impressum.html">Impressum</a>
</div>
</body>
</html>