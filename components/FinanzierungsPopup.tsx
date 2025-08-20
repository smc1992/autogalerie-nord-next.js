'use client';

import { useState } from 'react';

interface FinanzierungsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinanzierungsPopup({ isOpen, onClose }: FinanzierungsPopupProps) {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    fahrzeugpreis: '',
    anzahlung: '',
    laufzeit: '',
    einkommen: '',
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

      const response = await fetch('/api/finanzierungsberechnung', {
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
          fahrzeugpreis: '',
          anzahlung: '',
          laufzeit: '',
          einkommen: '',
          nachricht: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('');
        }, 2000);
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
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Finanzierung berechnen</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Füllen Sie das Formular aus und wir erstellen Ihnen ein individuelles Finanzierungsangebot.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Persönliche Daten */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Persönliche Daten</h3>
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

          {/* Finanzierungsdaten */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Finanzierungsdaten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fahrzeugpreis" className="block text-sm font-medium text-gray-700 mb-2">
                  Fahrzeugpreis (€) *
                </label>
                <input
                  type="number"
                  id="fahrzeugpreis"
                  name="fahrzeugpreis"
                  value={formData.fahrzeugpreis}
                  onChange={handleChange}
                  required
                  min="1000"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="anzahlung" className="block text-sm font-medium text-gray-700 mb-2">
                  Anzahlung (€)
                </label>
                <input
                  type="number"
                  id="anzahlung"
                  name="anzahlung"
                  value={formData.anzahlung}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="laufzeit" className="block text-sm font-medium text-gray-700 mb-2">
                  Gewünschte Laufzeit *
                </label>
                <select
                  id="laufzeit"
                  name="laufzeit"
                  value={formData.laufzeit}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="12">12 Monate</option>
                  <option value="24">24 Monate</option>
                  <option value="36">36 Monate</option>
                  <option value="48">48 Monate</option>
                  <option value="60">60 Monate</option>
                  <option value="72">72 Monate</option>
                  <option value="84">84 Monate</option>
                </select>
              </div>
              <div>
                <label htmlFor="einkommen" className="block text-sm font-medium text-gray-700 mb-2">
                  Monatliches Nettoeinkommen (€) *
                </label>
                <input
                  type="number"
                  id="einkommen"
                  name="einkommen"
                  value={formData.einkommen}
                  onChange={handleChange}
                  required
                  min="500"
                  step="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
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
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Besondere Wünsche oder Fragen zur Finanzierung..."
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
                  Finanzierung anfragen
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}