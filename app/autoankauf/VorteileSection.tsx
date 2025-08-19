
export default function VorteileSection() {
  const vorteile = [
    {
      icon: 'ri-shield-check-line',
      title: 'Kostenlose Fahrzeugbewertung',
      description: 'Unser Experte prüft Ihr Fahrzeug gründlich und erstellt eine faire, transparente Bewertung - völlig kostenlos und unverbindlich.'
    },
    {
      icon: 'ri-price-tag-3-line',
      title: 'Faire Preise',
      description: 'Sie erhalten einen marktgerechten Preis für Ihr Fahrzeug. Wir orientieren uns an aktuellen Marktpreisen und dem Fahrzeugzustand.'
    },
    {
      icon: 'ri-time-line',
      title: 'Schnelle Abwicklung',
      description: 'Von der Bewertung bis zur Auszahlung - wir wickeln alles schnell und unkompliziert ab. Meist ist der Verkauf am selben Tag abgeschlossen.'
    },
    {
      icon: 'ri-bank-card-line',
      title: 'Sofortige Barauszahlung',
      description: 'Bei Vertragsabschluss erhalten Sie sofort Ihr Geld - bar, per Überweisung oder Verrechnung mit einem neuen Fahrzeug.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ihr Auto in <span className="text-red-600">besten Händen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sie möchten Ihr Fahrzeug verkaufen? Bei der Autogalerie Nord erhalten Sie eine faire und transparente Bewertung Ihres Fahrzeugs. Unser erfahrenes Team prüft Ihr Auto gründlich und macht Ihnen ein attraktives Angebot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vorteile.map((vorteil, index) => (
            <div
              key={index}
              className="group text-center bg-gray-50 rounded-2xl p-8 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
                <i className={`${vorteil.icon} text-3xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {vorteil.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {vorteil.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
