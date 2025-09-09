
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-100 to-transparent rounded-full opacity-30 animate-pulse animation-delay-1000"></div>

      <div className="px-4 md:px-6 py-8 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {/* Logo und Beschreibung */}
            <div className="sm:col-span-2 md:col-span-1 group flex flex-col items-center text-center md:text-left mb-6 sm:mb-4 md:mb-0">
              <div className="mb-3 transform transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/images/logo.png" 
                  alt="Autogalerie Nord Logo" 
                  className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto transform transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-4">
                Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Norddeutschland.
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                {[
                  { icon: 'ri-facebook-fill', href: 'https://www.facebook.com/profile.php?id=61565890614324', label: 'Facebook-Seite von Autogalerie Nord besuchen' },
                  { icon: 'ri-instagram-line', href: 'https://www.instagram.com/autogalerie.nord.gmbh/', label: 'Instagram-Profil von Autogalerie Nord besuchen' },
                  { icon: 'ri-youtube-line', href: 'https://www.youtube.com/channel/UCJgqiKOxC-9VRx53LF8aZKg', label: 'YouTube-Kanal von Autogalerie Nord besuchen' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-12 h-12 sm:w-10 sm:h-10 md:w-8 md:h-8 flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-red-100 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-lg sm:text-base md:text-sm text-gray-600 group-hover/social:text-red-600 transition-colors duration-300`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="group flex flex-col items-center text-center md:text-left md:items-start mb-6 md:mb-0">
              <h3 className="font-semibold text-lg sm:text-base text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 w-full">
                {[
                  { href: '/', label: 'Startseite' },
                  { href: '/fahrzeuge', label: 'Fahrzeuge' },
                  { href: '/autoankauf', label: 'Autoankauf' },
                  { href: '/ueber-uns', label: 'Über Uns' },
                  { href: '/kontakt', label: 'Kontakt' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group/link text-gray-600 hover:text-red-600 cursor-pointer text-base sm:text-sm py-3 sm:py-2 md:py-1 transition-all duration-300 transform hover:translate-x-2 inline-block w-full"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover/link:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>



            {/* Kontakt */}
            <div className="group flex flex-col items-center text-center md:text-left md:items-start mb-6 md:mb-0">
              <div>
                <h3 className="font-semibold text-lg sm:text-base text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-4">
                  Kontakt
                </h3>
                <div className="space-y-4 w-full">
                  <div className="group/item flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center mt-0.5 mb-2 sm:mb-1 md:mb-0 sm:mr-3 transform group-hover/item:rotate-12 transition-transform duration-300">
                      <i className="ri-map-pin-line text-red-600 text-base sm:text-sm"></i>
                    </div>
                    <div className="text-gray-600 text-base sm:text-sm group-hover/item:text-gray-800 transition-colors duration-300">
                      <div>Lüneburger Str. 30,</div>
                      <div>21435 Stelle</div>
                    </div>
                  </div>

                  <a href="tel:+4904174596970" className="group/item flex flex-col sm:flex-row items-center justify-center sm:justify-start py-3 sm:py-2 md:py-0 transform transition-all duration-300 hover:translate-x-2 cursor-pointer">
                    <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center mb-2 sm:mb-1 md:mb-0 sm:mr-3 transform group-hover/item:rotate-12 transition-transform duration-300">
                      <i className="ri-phone-line text-red-600 text-base sm:text-sm"></i>
                    </div>
                    <span className="text-gray-600 text-base sm:text-sm group-hover/item:text-red-600 transition-colors duration-300">
                      041 745 969 70
                    </span>
                  </a>

                  <a href="mailto:info@autogalerie-nord.de" className="group/item flex flex-col sm:flex-row items-center justify-center sm:justify-start py-3 sm:py-2 md:py-0 transform transition-all duration-300 hover:translate-x-2 cursor-pointer">
                    <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center mb-2 sm:mb-1 md:mb-0 sm:mr-3 transform group-hover/item:rotate-12 transition-transform duration-300">
                      <i className="ri-mail-line text-red-600 text-base sm:text-sm"></i>
                    </div>
                    <span className="text-gray-600 text-base sm:text-sm group-hover/item:text-red-600 transition-colors duration-300">
                      info@autogalerie-nord.de
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Kundenbewertungen Widget */}
            <div className="sm:col-span-2 md:col-span-1 group flex flex-col items-center text-center md:text-left md:items-start">
              <div>
              <div className="text-base sm:text-sm text-gray-600 mb-3 group-hover:text-gray-800 transition-colors duration-300 font-semibold">
                Kundenbewertungen
              </div>
              <div className="flex flex-col sm:flex-row items-center mb-3">
                <span className="text-4xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-1 md:mb-0 sm:mr-2 transform transition-all duration-300 group-hover:scale-110 group-hover:text-red-600">
                  4,7
                </span>
                <div className="flex mb-2 sm:mb-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center transform transition-all duration-300 hover:scale-125">
                      <i
                        className="ri-star-fill text-yellow-400 text-base sm:text-sm animate-pulse"
                        style={{ animationDelay: `${star * 100}ms` }}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm sm:text-xs text-gray-500 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                648 Bewertungen
              </div>
              <div className="text-sm sm:text-xs text-red-600 font-medium mb-4 group-hover:text-red-700 transition-colors duration-300">
                92% Weiterempfehlungen
              </div>

              <div className="space-y-2 text-sm sm:text-xs w-full">
                {[
                  { platform: 'Mobile', count: 343 },
                  { platform: 'Scout24', count: 51 },
                  { platform: 'Google', count: 254 },
                  { platform: 'Facebook', count: 5 },
                ].map((review, index) => (
                  <div key={index} className="group/review flex flex-col sm:flex-row items-center justify-center sm:justify-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="flex mb-1 sm:mb-0 sm:mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-4 h-4 sm:w-3 sm:h-3 flex items-center justify-center">
                          <i className="ri-star-fill text-yellow-400 text-sm sm:text-xs transform group-hover/review:scale-110 transition-transform duration-300"></i>
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-600 mb-1 sm:mb-0 sm:mr-2 group-hover/review:text-red-600 transition-colors duration-300">
                      {review.platform}
                    </span>
                    <span className="text-gray-500 group-hover/review:text-gray-700 transition-colors duration-300">
                      ({review.count})
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 md:pt-8 mt-8 md:mt-8">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-6 md:space-y-0">
              <p className="text-gray-600 text-sm sm:text-base order-2 md:order-1">
                {new Date().getFullYear()} Autogalerie Nord. Alle Rechte vorbehalten.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 text-base sm:text-sm text-center order-1 md:order-2">
                <Link href="/impressum" className="text-gray-600 hover:text-red-600 py-3 sm:py-2 md:py-0 px-4 sm:px-0 rounded-lg sm:rounded-none hover:bg-gray-50 sm:hover:bg-transparent transition-all duration-300">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-gray-600 hover:text-red-600 py-3 sm:py-2 md:py-0 px-4 sm:px-0 rounded-lg sm:rounded-none hover:bg-gray-50 sm:hover:bg-transparent transition-all duration-300">
                  Datenschutz
                </Link>
                <Link href="/cookie-einstellungen" className="text-gray-600 hover:text-red-600 py-3 sm:py-2 md:py-0 px-4 sm:px-0 rounded-lg sm:rounded-none hover:bg-gray-50 sm:hover:bg-transparent transition-all duration-300">
                  Cookie-Einstellungen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        /* Force extreme spacing changes */
        footer .grid {
          gap: 0.5rem !important; /* 8px */
        }
        
        footer h3 {
          margin-bottom: 0.25rem !important; /* 4px */
        }
        
        footer ul {
          gap: 0.25rem !important; /* 4px */
        }
        
        footer .space-y-1 > * + * {
          margin-top: 0.25rem !important; /* 4px */
        }
        
        footer .space-y-3 > * + * {
          margin-top: 0.75rem !important; /* 12px */
        }
        
        footer .mt-1 {
          margin-top: 0.25rem !important; /* 4px */
        }
        
        footer .mb-1 {
          margin-bottom: 0.25rem !important; /* 4px */
        }
      `}</style>
    </footer>
  );
}
