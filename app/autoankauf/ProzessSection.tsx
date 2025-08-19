
import React from 'react';

export default function ProzessSection() {
  const schritte = [
    {
      nummer: '1',
      title: 'Kontakt aufnehmen',
      description: 'Rufen Sie uns an oder schreiben Sie uns eine E‑Mail',
      icon: 'ri-phone-line',
    },
    {
      nummer: '2',
      title: 'Fahrzeug bewerten',
      description: 'Unser Experte prüft Ihr Fahrzeug vor Ort',
      icon: 'ri-search-eye-line',
    },
    {
      nummer: '3',
      title: 'Sofort Geld erhalten',
      description: 'Bei Einigung erhalten Sie sofort Ihr Geld',
      icon: 'ri-money-euro-circle-line',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            So <span className="text-red-600">einfach</span> geht&apos;s
          </h2>
          <p className="text-xl text-gray-600">
            Wir kümmern uns um die gesamte Abwicklung – von der Abmeldung Ihres
            alten Fahrzeugs bis zur Auszahlung. Alles aus einer Hand, schnell und
            unkompliziert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schritte.map((schritt, index) => (
            <div key={schritt.nummer ?? index} className="relative">
              {/* Verbindungslinie */}
              {index < schritte.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-red-200 z-0 transform translate-x-8"></div>
              )}

              <div className="relative bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 z-10">
                {/* Schritt Nummer */}
                <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {schritt.nummer}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6">
                  <i className={`${schritt.icon} text-2xl text-red-600`}></i>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {schritt.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{schritt.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-8">
            Egal ob Barzahlung, Überweisung oder Verrechnung mit einem neuen Fahrzeug
            – wir finden die passende Lösung für Sie. Die Auszahlung erfolgt sofort
            nach Vertragsabschluss.
          </p>
          <a
            href="tel:+4941745969770"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center"
          >
            <i className="ri-phone-line mr-2"></i>
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
}
