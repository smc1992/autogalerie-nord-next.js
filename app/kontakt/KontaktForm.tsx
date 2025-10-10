
'use client';

import { useState } from 'react';

export default function KontaktForm() {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    betreff: '',
    email: '',
    telefon: '',
    nachricht: '',
    datenschutz: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formStartedAt] = useState(() => Date.now());
  const [submissionId] = useState(() =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.vorname || !formData.nachname || !formData.betreff || !formData.email || !formData.telefon || !formData.nachricht || !formData.datenschutz) {
      setSubmitStatus('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    if (formData.nachricht.length > 500) {
      setSubmitStatus('Die Nachricht darf maximal 500 Zeichen lang sein.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value.toString());
      });
      // Idempotency token and basic timing for server-side checks
      formBody.append('submissionId', submissionId);
      formBody.append('formStartedAt', String(formStartedAt));

      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      if (response.status === 429) {
        setSubmitStatus('Zu viele Anfragen. Bitte versuchen Sie es später erneut.');
      } else if (response.ok) {
        setSubmitStatus('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.');
        setFormData({
          vorname: '',
          nachname: '',
          betreff: '',
          email: '',
          telefon: '',
          nachricht: '',
          datenschutz: false
        });
      } else {
        setSubmitStatus('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      setSubmitStatus('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nachricht senden
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Schreiben Sie uns eine Nachricht.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form id="kontakt-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vorname *
                </label>
                <input
                  type="text"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Ihr Vorname"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Ihr Nachname"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Betreff *
              </label>
              <input
                type="text"
                name="betreff"
                value={formData.betreff}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                placeholder="Worum geht es?"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="ihre@email.de"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="+49 123 456789"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nachricht *
              </label>
              <textarea
                name="nachricht"
                value={formData.nachricht}
                onChange={handleInputChange}
                rows={6}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 resize-none"
                placeholder="Ihre Nachricht an uns..."
                required
              ></textarea>
              <div className="text-sm text-gray-500 mt-1">
                {formData.nachricht.length}/500 Zeichen
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="datenschutz"
                  checked={formData.datenschutz}
                  onChange={handleInputChange}
                  className="mt-1 mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  required
                />
                <span className="text-sm text-gray-600">
                  Ich stimme der <span className="text-red-600 hover:underline cursor-pointer">Datenschutzerklärung</span> zu *
                </span>
              </label>
            </div>

            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.includes('erfolgreich') 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {submitStatus}
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Nachricht senden
                      <i className="ri-send-plane-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
