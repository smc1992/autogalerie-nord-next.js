
'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function KontaktInfo() {
  const { dict } = useLanguage();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {dict.kontakt.infoTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Adresse */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-map-pin-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">{dict.kontakt.addressTitle}</h3>
            <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <p>Lüneburger Str. 30</p>
              <p>21435 Stelle</p>
              <p>Deutschland</p>
            </div>
          </div>

          {/* Telefon */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-phone-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">{dict.kontakt.phoneTitle}</h3>
            <a 
              href="tel:+4904174596970" 
              className="text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer text-lg font-medium"
            >
              041 745 969 70
            </a>
          </div>

          {/* E-Mail */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-mail-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">{dict.kontakt.emailTitle}</h3>
            <a 
              href="mailto:info@autogalerie-nord.de" 
              className="text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer break-all"
            >
              info@autogalerie-nord.de
            </a>
          </div>

          {/* Öffnungszeiten */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-time-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">{dict.kontakt.hoursTitle}</h3>
            <div className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300 space-y-1">
              <div className="flex justify-between">
                <span>{dict.kontakt.days.monday}:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.kontakt.days.tuesday}:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.kontakt.days.wednesday}:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.kontakt.days.thursday}:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.kontakt.days.friday}:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.kontakt.days.saturday}:</span>
                <span className="font-medium">09:00 - 15:00</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.kontakt.days.sunday}:</span>
                <span className="font-medium">{dict.kontakt.closed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
