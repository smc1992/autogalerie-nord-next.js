'use client';

import { useState } from 'react';

interface AutoankaufPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AutoankaufPopup({ isOpen, onClose }: AutoankaufPopupProps) {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    fahrzeugmarke: '',
    fahrzeugmodell: '',
    baujahr: '',
    kilometerstand: '',
    kraftstoff: '',
    zustand: '',
    wunschpreis: '',
    nachricht: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const [submissionId] = useState(() => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    // Fallback: einfache UUID-ähnliche Zeichenkette
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  });
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
      // Idempotency + simple timing token
      formDataToSend.append('submissionId', submissionId);
      formDataToSend.append('formStartedAt', String(formStartedAt));

      const response = await fetch('/api/autoankauf', {
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
          fahrzeugmarke: '',
          fahrzeugmodell: '',
          baujahr: '',
          kilometerstand: '',
          kraftstoff: '',
          zustand: '',
          wunschpreis: '',
          nachricht: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('');
        }, 2000);
      } else if (response.status === 429) {
        setSubmitStatus('rate_limited');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Fahrzeug verkaufen</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Füllen Sie das Formular aus und wir erstellen Ihnen ein unverbindliches Angebot für Ihr Fahrzeug.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Persönliche Daten */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ihre Kontaktdaten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vorname" className="block text-sm font-medium text-gray-700 mb-2">
                  Vorname *
                </label>
                <input
                  type="text"
                  id="vorname"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  id="nachname"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Fahrzeugdaten */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fahrzeugdaten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fahrzeugmarke" className="block text-sm font-medium text-gray-700 mb-2">
                  Marke *
                </label>
                <input
                  type="text"
                  id="fahrzeugmarke"
                  name="fahrzeugmarke"
                  value={formData.fahrzeugmarke}
                  onChange={handleChange}
                  required
                  placeholder="z.B. BMW, Mercedes, Audi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="fahrzeugmodell" className="block text-sm font-medium text-gray-700 mb-2">
                  Modell *
                </label>
                <input
                  type="text"
                  id="fahrzeugmodell"
                  name="fahrzeugmodell"
                  value={formData.fahrzeugmodell}
                  onChange={handleChange}
                  required
                  placeholder="z.B. 320d, C-Klasse, A4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="baujahr" className="block text-sm font-medium text-gray-700 mb-2">
                  Baujahr *
                </label>
                <select
                  id="baujahr"
                  name="baujahr"
                  value={formData.baujahr}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  {Array.from({ length: 30 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="kilometerstand" className="block text-sm font-medium text-gray-700 mb-2">
                  Kilometerstand *
                </label>
                <input
                  type="number"
                  id="kilometerstand"
                  name="kilometerstand"
                  value={formData.kilometerstand}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                  placeholder="z.B. 50000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="kraftstoff" className="block text-sm font-medium text-gray-700 mb-2">
                  Kraftstoff *
                </label>
                <select
                  id="kraftstoff"
                  name="kraftstoff"
                  value={formData.kraftstoff}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Gas (LPG)">Gas (LPG)</option>
                  <option value="Gas (CNG)">Gas (CNG)</option>
                </select>
              </div>
              <div>
                <label htmlFor="zustand" className="block text-sm font-medium text-gray-700 mb-2">
                  Zustand *
                </label>
                <select
                  id="zustand"
                  name="zustand"
                  value={formData.zustand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="Sehr gut">Sehr gut</option>
                  <option value="Gut">Gut</option>
                  <option value="Befriedigend">Befriedigend</option>
                  <option value="Ausreichend">Ausreichend</option>
                  <option value="Mangelhaft">Mangelhaft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preisvorstellung */}
          <div>
            <label htmlFor="wunschpreis" className="block text-sm font-medium text-gray-700 mb-2">
              Preisvorstellung (€)
            </label>
            <input
              type="number"
              id="wunschpreis"
              name="wunschpreis"
              value={formData.wunschpreis}
              onChange={handleChange}
              min="0"
              step="100"
              placeholder="z.B. 15000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Zusätzliche Informationen */}
          <div>
            <label htmlFor="nachricht" className="block text-sm font-medium text-gray-700 mb-2">
              Zusätzliche Informationen
            </label>
            <textarea
              id="nachricht"
              name="nachricht"
              value={formData.nachricht}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Besonderheiten, Schäden, Extras, etc..."
            ></textarea>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <i className="ri-check-circle-line text-green-600 mr-2"></i>
                <span className="text-green-800">Ihre Anfrage wurde erfolgreich gesendet! Wir melden uns in Kürze bei Ihnen.</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <i className="ri-error-warning-line text-red-600 mr-2"></i>
                <span className="text-red-800">Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.</span>
              </div>
            </div>
          )}

          {submitStatus === 'rate_limited' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <i className="ri-timer-line text-yellow-600 mr-2"></i>
                <span className="text-yellow-800">Sie haben kürzlich bereits eine Anfrage gesendet. Bitte warten Sie kurz und versuchen Sie es später erneut.</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Wird gesendet...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line mr-2"></i>
                  Anfrage senden
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}