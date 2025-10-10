
'use client';

import { useState } from 'react';

export default function BusinessContact() {
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    privacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formStartedAt] = useState(() => Date.now());
  const [submissionId] = useState(() =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
  );

  const services = [
    'Persönliche Beratung',
    'Flottenmanagement', 
    'Leasing & Finanzierung',
    'Wartung & Service',
    'Versicherung & Garantie',
    'Großkunden-Rabatte',
    'Komplettpaket'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.contact || !formData.email || !formData.privacy) {
      setSubmitStatus('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value.toString());
      });
      formBody.append('submissionId', submissionId);
      formBody.append('formStartedAt', String(formStartedAt));

      const response = await fetch('/api/business-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      if (response.status === 429) {
        setSubmitStatus('Zu viele Anfragen. Bitte versuchen Sie es später erneut.');
      } else if (response.ok) {
        setSubmitStatus('Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.');
        setFormData({
          company: '',
          contact: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          privacy: false
        });
      } else {
        setSubmitStatus('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      setSubmitStatus('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-full mb-4">
              B2B Kontakt
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kontakt für <span className="text-red-600">B2B-Anfragen</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lassen Sie uns gemeinsam die perfekte Lösung für Ihren Fuhrpark entwickeln. Kontaktieren Sie uns für ein unverbindliches Angebot.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <form id="business-contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Unternehmensname *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Ihr Unternehmensname"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ansprechpartner *
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Vor- und Nachname"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-Mail-Adresse *
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
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gewünschter Service
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Service auswählen</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ihre Nachricht
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 resize-none"
                  placeholder="Beschreiben Sie Ihre Anforderungen..."
                ></textarea>
                <div className="text-sm text-gray-500 mt-1">
                  {formData.message.length}/500 Zeichen
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Anfrage senden
                      <i className="ri-send-plane-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
