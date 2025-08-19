
'use client';

import { useState } from 'react';

export default function FahrzeugBewertung() {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    marke: '',
    modell: '',
    baujahr: '',
    kilometerstand: '',
    kraftstoff: '',
    getriebe: '',
    zustand: '',
    nachricht: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('/api/fahrzeugbewertung', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          vorname: '',
          nachname: '',
          email: '',
          telefon: '',
          marke: '',
          modell: '',
          baujahr: '',
          kilometerstand: '',
          kraftstoff: '',
          getriebe: '',
          zustand: '',
          nachricht: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kostenlose Fahrzeugbewertung
          </h2>
          <p className="text-xl text-gray-600">
            Erhalten Sie eine unverbindliche Einschätzung des Wertes Ihres Fahrzeugs
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Alle Felder mit * sind Pflichtfelder
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <form id="fahrzeugbewertung" onSubmit={handleSubmit} className="space-y-6">
            {/* Persönliche Daten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vorname" className="block text-sm font-semibold text-gray-700 mb-2">
                  Vorname *
                </label>
                <input
                  type="text"
                  id="vorname"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label htmlFor="nachname" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  id="nachname"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label htmlFor="telefon" className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Fahrzeugdaten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marke" className="block text-sm font-semibold text-gray-700 mb-2">
                  Marke *
                </label>
                <input
                  type="text"
                  id="marke"
                  name="marke"
                  value={formData.marke}
                  onChange={handleChange}
                  required
                  placeholder="z.B. BMW, Mercedes, Audi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label htmlFor="modell" className="block text-sm font-semibold text-gray-700 mb-2">
                  Modell *
                </label>
                <input
                  type="text"
                  id="modell"
                  name="modell"
                  value={formData.modell}
                  onChange={handleChange}
                  required
                  placeholder="z.B. 320d, C-Klasse, A4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="baujahr" className="block text-sm font-semibold text-gray-700 mb-2">
                  Baujahr *
                </label>
                <select
                  id="baujahr"
                  name="baujahr"
                  value={formData.baujahr}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="">Bitte auswählen</option>
                  {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="kilometerstand" className="block text-sm font-semibold text-gray-700 mb-2">
                  Kilometerstand *
                </label>
                <input
                  type="number"
                  id="kilometerstand"
                  name="kilometerstand"
                  value={formData.kilometerstand}
                  onChange={handleChange}
                  required
                  placeholder="z.B. 50000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="kraftstoff" className="block text-sm font-semibold text-gray-700 mb-2">
                  Kraftstoff *
                </label>
                <select
                  id="kraftstoff"
                  name="kraftstoff"
                  value={formData.kraftstoff}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="">Bitte auswählen</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Erdgas">Erdgas</option>
                  <option value="Autogas">Autogas</option>
                </select>
              </div>
              <div>
                <label htmlFor="getriebe" className="block text-sm font-semibold text-gray-700 mb-2">
                  Getriebe *
                </label>
                <select
                  id="getriebe"
                  name="getriebe"
                  value={formData.getriebe}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="">Bitte auswählen</option>
                  <option value="Schaltgetriebe">Schaltgetriebe</option>
                  <option value="Automatik">Automatik</option>
                  <option value="Halbautomatik">Halbautomatik</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="zustand" className="block text-sm font-semibold text-gray-700 mb-2">
                Fahrzeugzustand *
              </label>
              <select
                id="zustand"
                name="zustand"
                value={formData.zustand}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              >
                <option value="">Bitte auswählen</option>
                <option value="Neuwertig">Neuwertig</option>
                <option value="Sehr gut">Sehr gut</option>
                <option value="Gut">Gut</option>
                <option value="Befriedigend">Befriedigend</option>
                <option value="Reparaturbedürftig">Reparaturbedürftig</option>
              </select>
            </div>

            <div>
              <label htmlFor="nachricht" className="block text-sm font-semibold text-gray-700 mb-2">
                Zusätzliche Informationen
              </label>
              <textarea
                id="nachricht"
                name="nachricht"
                value={formData.nachricht}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Besonderheiten, Ausstattung, Schäden etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Maximaal 500 Zeichen ({formData.nachricht.length}/500)
              </p>
            </div>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-check-circle-line text-green-500 text-xl mr-3"></i>
                  <span className="text-green-800">Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-500 text-xl mr-3"></i>
                  <span className="text-red-800">Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-12 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line mr-2"></i>
                    Kostenlose Bewertung anfordern
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
