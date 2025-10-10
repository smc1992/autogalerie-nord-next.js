'use client';

import { useState } from 'react';

interface KontaktPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KontaktPopup({ isOpen, onClose }: KontaktPopupProps) {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    betreff: 'Terminbuchung',
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

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.vorname ||
      !formData.nachname ||
      !formData.betreff ||
      !formData.email ||
      !formData.telefon ||
      !formData.nachricht ||
      !formData.datenschutz
    ) {
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
      formBody.append('submissionId', submissionId);
      formBody.append('formStartedAt', String(formStartedAt));

      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      });

      if (response.status === 429) {
        setSubmitStatus('Zu viele Anfragen. Bitte versuchen Sie es später erneut.');
      } else if (response.ok) {
        setSubmitStatus('Vielen Dank! Ihre Nachricht wurde gesendet.');
        setTimeout(() => {
          onClose();
          setSubmitStatus('');
        }, 1500);
      } else {
        setSubmitStatus('Es gab einen Fehler beim Senden Ihrer Nachricht.');
      }
    } catch (error) {
      setSubmitStatus('Es gab einen Fehler beim Senden Ihrer Nachricht.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Termin buchen</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Modal schließen"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vorname *</label>
              <input
                type="text"
                name="vorname"
                value={formData.vorname}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nachname *</label>
              <input
                type="text"
                name="nachname"
                value={formData.nachname}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
              <input
                type="tel"
                name="telefon"
                value={formData.telefon}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nachricht *</label>
            <textarea
              name="nachricht"
              value={formData.nachricht}
              onChange={handleInputChange}
              rows={4}
              maxLength={500}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Ihr Anliegen oder Wunschtermin"
            ></textarea>
            <div className="text-xs text-gray-500 mt-1">{formData.nachricht.length}/500 Zeichen</div>
          </div>

          <div>
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                name="datenschutz"
                checked={formData.datenschutz}
                onChange={handleInputChange}
                className="mt-1 mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                required
              />
              <span className="text-sm text-gray-600">Ich stimme der <span className="text-red-600 hover:underline">Datenschutzerklärung</span> zu *</span>
            </label>
          </div>

          {submitStatus && (
            <div className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
              {submitStatus}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow disabled:opacity-60"
            >
              {isSubmitting ? 'Senden…' : 'Anfrage senden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}