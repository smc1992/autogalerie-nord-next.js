
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-100 to-transparent rounded-full opacity-30 animate-pulse animation-delay-1000"></div>

      <div className="px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Logo und Beschreibung */}
            <div className="md:col-span-1 group">
              <div className="mb-6 transform transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/images/logo.png" 
                  alt="Autogalerie Nord Logo" 
                  className="h-32 w-auto mb-4 transform transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Norddeutschland.
              </p>
              <div className="flex space-x-3 mt-6">
                {[
                  { icon: 'ri-facebook-fill', href: 'https://www.facebook.com/profile.php?id=61565890614324' },
                  { icon: 'ri-instagram-line', href: 'https://www.instagram.com/autogalerie.nord.gmbh/' },
                  { icon: 'ri-youtube-line', href: 'https://www.youtube.com/channel/UCJgqiKOxC-9VRx53LF8aZKg' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-8 h-8 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-red-100 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                  >
                    <i className={`${social.icon} text-gray-600 group-hover/social:text-red-600 transition-colors duration-300`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="group">
              <h3 className="font-semibold text-gray-900 mb-6 group-hover:text-red-600 transition-colors duration-300">
                Quick Links
              </h3>
              <ul className="space-y-3">
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
                      className="group/link text-gray-600 hover:text-red-600 cursor-pointer text-sm transition-all duration-300 transform hover:translate-x-2 inline-block"
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

            {/* Rechtliches */}
            <div className="group">
              <h3 className="font-semibold text-gray-900 mb-6 group-hover:text-red-600 transition-colors duration-300">
                Rechtliches
              </h3>
              <ul className="space-y-3">
                {[
                  { href: '/impressum', label: 'Impressum' },
                  { href: '#', label: 'Datenschutz' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group/link text-gray-600 hover:text-red-600 cursor-pointer text-sm transition-all duration-300 transform hover:translate-x-2 inline-block"
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
            <div className="group">
              <h3 className="font-semibold text-gray-900 mb-6 group-hover:text-red-600 transition-colors duration-300">
                Kontakt
              </h3>
              <div className="space-y-4">
                <div className="group/item flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-4 h-4 flex items-center justify-center mt-0.5 mr-3 transform group-hover/item:rotate-12 transition-transform duration-300">
                    <i className="ri-map-pin-line text-red-600 text-sm"></i>
                  </div>
                  <div className="text-gray-600 text-sm group-hover/item:text-gray-800 transition-colors duration-300">
                    <div>Lüneburger Str. 30,</div>
                    <div>21435 Stelle</div>
                  </div>
                </div>

                <a href="tel:+4941745969770" className="group/item flex items-center transform transition-all duration-300 hover:translate-x-2 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center mr-3 transform group-hover/item:rotate-12 transition-transform duration-300">
                    <i className="ri-phone-line text-red-600 text-sm"></i>
                  </div>
                  <span className="text-gray-600 text-sm group-hover/item:text-red-600 transition-colors duration-300">
                    041 745 969 70
                  </span>
                </a>

                <a href="mailto:info@autogalerie-nord.de" className="group/item flex items-center transform transition-all duration-300 hover:translate-x-2 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center mr-3 transform group-hover/item:rotate-12 transition-transform duration-300">
                    <i className="ri-mail-line text-red-600 text-sm"></i>
                  </div>
                  <span className="text-gray-600 text-sm group-hover/item:text-red-600 transition-colors duration-300">
                    info@autogalerie-nord.de
                  </span>
                </a>
              </div>
            </div>

            {/* Kundenbewertungen Widget */}
            <div className="group">
              <div className="text-sm text-gray-600 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                Kundenbewertungen
              </div>
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-gray-900 mr-2 transform transition-all duration-300 group-hover:scale-110 group-hover:text-red-600">
                  4,7
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 flex items-center justify-center transform transition-all duration-300 hover:scale-125">
                      <i
                        className="ri-star-fill text-yellow-400 text-sm animate-pulse"
                        style={{ animationDelay: `${star * 100}ms` }}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1 group-hover:text-gray-700 transition-colors duration-300">
                648 Bewertungen
              </div>
              <div className="text-xs text-red-600 font-medium mb-4 group-hover:text-red-700 transition-colors duration-300">
                92% Weiterempfehlungen
              </div>

              <div className="space-y-1 text-xs">
                {[
                  { platform: 'Mobile', count: 343 },
                  { platform: 'Scout24', count: 51 },
                  { platform: 'Google', count: 254 },
                  { platform: 'Facebook', count: 5 },
                ].map((review, index) => (
                  <div key={index} className="group/review flex items-center transform transition-all duration-300 hover:translate-x-1">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-3 h-3 flex items-center justify-center">
                          <i className="ri-star-fill text-yellow-400 text-xs transform group-hover/review:scale-110 transition-transform duration-300"></i>
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-600 mr-2 group-hover/review:text-red-600 transition-colors duration-300">
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

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm mb-4 md:mb-0">
                {new Date().getFullYear()} Autogalerie Nord. Alle Rechte vorbehalten.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/impressum" className="text-gray-600 hover:text-blue-600">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-gray-600 hover:text-blue-600">
                  Datenschutz
                </Link>
                <Link href="/cookie-einstellungen" className="text-gray-600 hover:text-blue-600">
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
      `}</style>
    </footer>
  );
}
