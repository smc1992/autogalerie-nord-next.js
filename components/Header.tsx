
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeistungenOpen, setIsLeistungenOpen] = useState(false);
  const [isKontaktOpen, setIsKontaktOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [whiteLogoOk, setWhiteLogoOk] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock scroll robustly when mobile menu is open (handles iOS/Safari)
  useEffect(() => {
    const root = document.documentElement;
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      // Prevent background scroll while keeping current scroll position
      document.body.style.position = 'fixed';
      (document.body.style as any).top = `-${scrollY}px`;
      root.style.overflow = 'hidden';
    } else {
      // Restore scroll position and styles
      const top = (document.body.style as any).top || '';
      if (top) {
        const scrollY = -parseInt(top, 10) || 0;
        document.body.style.position = '';
        (document.body.style as any).top = '';
        root.style.overflow = '';
        window.scrollTo(0, scrollY);
      } else {
        root.style.overflow = '';
        document.body.style.overflow = '';
      }
    }
    return () => {
      root.style.overflow = '';
      document.body.style.position = '';
      (document.body.style as any).top = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const leistungenSubMenu = [
    { href: '/leistungen/finanzierung', label: 'Finanzierung', icon: 'ri-bank-card-line' },
    { href: '/leistungen/zulassungsservice', label: 'Zulassungsservice', icon: 'ri-file-text-line' },
    { href: '/leistungen/import-export', label: 'Import & Export', icon: 'ri-ship-line' },
    { href: '/leistungen/kommissionsverkauf', label: 'Kommissionsverkauf', icon: 'ri-exchange-dollar-line' },
    { href: '/service', label: 'Service', icon: 'ri-tools-line' },
    { href: '/autoankauf', label: 'Fahrzeug verkaufen', icon: 'ri-money-dollar-circle-line' }
  ];

  return (
    <>
      {/* Main Header - enthält Top-Bar und Navigation, als fester Overlay */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors`}>
        {/* Top Contact Bar - oben transparent, bei Scroll solid */}
        <div className={`${mounted && isScrolled ? 'bg-red-600' : 'bg-transparent'} text-white py-2`}> 
          <div className="px-4 md:px-6">
            <div className="flex justify-center md:justify-end items-center">
              {/* Desktop Contact Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a 
                  href="https://wa.me/4941717889111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  aria-label="WhatsApp-Chat mit Autogalerie Nord starten"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                    <i className="ri-whatsapp-line text-sm"></i>
                  </div>
                  <span className="text-sm whitespace-nowrap">WhatsApp</span>
                </a>
                <a 
                  href="tel:+4904174596970" 
                  className="group flex items-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  aria-label="Autogalerie Nord anrufen: +49 41 745 969 70"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                    <i className="ri-phone-line text-sm"></i>
                  </div>
                  <span className="text-sm whitespace-nowrap">+49 41 745 969 70</span>
                </a>
                <a 
                  href="mailto:info@autogalerie-nord.de" 
                  className="group flex items-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  aria-label="E-Mail an Autogalerie Nord senden: info@autogalerie-nord.de"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                    <i className="ri-mail-line text-sm"></i>
                  </div>
                  <span className="text-sm whitespace-nowrap">info@autogalerie-nord.de</span>
                </a>
              </div>

              {/* Mobile Contact Links */}
              <div className="flex md:hidden items-center space-x-2">
                <a 
                  href="https://wa.me/4941717889111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12 rounded-lg"
                  aria-label="WhatsApp-Chat mit Autogalerie Nord starten"
                >
                  <i className="ri-whatsapp-fill text-lg"></i>
                </a>
                <a 
                  href="tel:+4904174596970" 
                  className="w-10 h-10 flex items-center justify-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12 rounded-lg"
                  aria-label="Autogalerie Nord anrufen"
                >
                  <i className="ri-phone-fill text-lg"></i>
                </a>
                <a 
                  href="mailto:info@autogalerie-nord.de" 
                  className="w-10 h-10 flex items-center justify-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12 rounded-lg"
                  aria-label="E-Mail an Autogalerie Nord senden"
                >
                  <i className="ri-mail-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigationsbereich - oben transparent, beim Scroll weiß */}
        <div className={`${mounted && isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
          <div className="pl-2 pr-4 md:px-6">
          <nav className={`flex items-center justify-between lg:grid lg:grid-cols-3 lg:items-center ${mounted && isScrolled ? 'h-16 md:h-20 lg:h-20 py-2 md:py-2' : 'h-16 md:h-20 lg:h-20 py-2 md:py-2'}`}>
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center h-full cursor-pointer ml-0"
              aria-label="Zur Startseite von Autogalerie Nord"
            >
              <div className="relative h-full w-[220px] md:w-[260px]">
                {/* Weißes Logo (sichtbar wenn nicht gescrollt; Fallback bei Fehler) */}
                <img
                  src="/images/1x/Autogalerie%20Nord%20Logo%20White.webp"
                  alt="Autogalerie Nord Logo"
                  onError={() => setWhiteLogoOk(false)}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[30px] md:h-[34px] w-auto object-contain transition-opacity duration-500 ease-in-out ${mounted && isScrolled ? 'opacity-0' : (whiteLogoOk ? 'opacity-100' : 'opacity-0')} filter drop-shadow-md`}
                />
                {/* Dunkles Logo (sichtbar beim Scrollen) */}
                <img
                  src="/images/1x/Autogalerie%20Nord%20Logo%20Dark.webp"
                  alt="Autogalerie Nord Logo dunkel"
                  aria-hidden={mounted && isScrolled ? undefined : true}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[30px] md:h-[34px] w-auto object-contain transition-opacity duration-500 ease-in-out filter drop-shadow-md ${(mounted && isScrolled) || !whiteLogoOk ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </Link>

            {/* Desktop Navigation (zentriert) */}
            <div className="hidden lg:flex items-center space-x-8 justify-center">
              <Link href="/fahrzeuge" className={`${mounted && isScrolled ? 'text-gray-700' : 'text-white'} cursor-pointer lg:uppercase`}>
                Fahrzeuge
              </Link>
              <a href="https://autogalerie-nord.de/fahrzeuge#!/tradein" target="_blank" rel="noopener noreferrer" className={`${mounted && isScrolled ? 'text-gray-700' : 'text-white'} cursor-pointer lg:uppercase`}>
                Autoankauf
              </a>
              <div 
                className="relative"
                onMouseEnter={() => setIsLeistungenOpen(true)}
                onMouseLeave={() => setIsLeistungenOpen(false)}
              >
                <Link href="/leistungen" className={`${mounted && isScrolled ? 'text-gray-700' : 'text-white'} cursor-pointer flex items-center lg:uppercase`}>
                  Services
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </Link>
                {isLeistungenOpen && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {leistungenSubMenu.map((item, index) => (
                      <Link key={index} href={item.href} className="flex items-center px-4 py-3 text-gray-700 cursor-pointer">
                        <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/businessloesungen" className={`${mounted && isScrolled ? 'text-gray-700' : 'text-white'} cursor-pointer lg:uppercase`}>
                Business
              </Link>

              {/* Kontakt mit Submenu */}
              <div 
                className="relative"
                onMouseEnter={() => setIsKontaktOpen(true)}
                onMouseLeave={() => setIsKontaktOpen(false)}
              >
                <Link href="/kontakt" className={`${mounted && isScrolled ? 'text-gray-700' : 'text-white'} cursor-pointer flex items-center lg:uppercase`}>
                  Kontakt
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </Link>
                {isKontaktOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <Link href="/kontakt" className="flex items-center px-4 py-3 text-gray-700 cursor-pointer">
                      <i className="ri-mail-line w-5 h-5 mr-3"></i>
                      Kontakt
                    </Link>
                    <Link href="/ueber-uns" className="flex items-center px-4 py-3 text-gray-700 cursor-pointer">
                      <i className="ri-team-line w-5 h-5 mr-3"></i>
                      Über Uns
                    </Link>
                  </div>
                )}
              </div>

            </div>

            {/* Rechte Spalte als Platzhalter für Zentrierung */}
            <div className="hidden lg:block"></div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-3 rounded-xl ${mounted && isScrolled ? 'text-gray-700' : 'text-white'} z-50 relative`}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
            >
              {!isMenuOpen ? (
                <div className="relative w-6 h-6">
                  <span className="absolute top-1 left-0 w-6 h-0.5 bg-current rounded-full"></span>
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-current rounded-full"></span>
                  <span className="absolute top-5 left-0 w-4 h-0.5 bg-current rounded-full"></span>
                </div>
              ) : (
                <div className="relative w-6 h-6">
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-current rotate-45 rounded-full"></span>
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-current -rotate-45 rounded-full"></span>
                </div>
              )}
            </button>
          </nav>

          {/* Mobile Navigation Overlay - ensure it sits above the header */}
          <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm sm:max-w-md bg-white shadow-2xl transition-transform duration-300 ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <i className="ri-navigation-line text-white text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Navigation</h3>
                      <p className="text-xs text-gray-500">Autogalerie Nord</p>
                    </div>
                  </div>
                  {/* Close button inside mobile panel */}
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Menü schließen"
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="px-4 pt-4 grid grid-cols-3 gap-3">
                  <a href="tel:+4904174596970" className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 text-gray-700 hover:text-red-700 transition-colors">
                    <i className="ri-phone-line text-xl mb-1"></i>
                    <span className="text-xs">Anrufen</span>
                  </a>
                  <a href="https://wa.me/4941717889111" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 text-gray-700 hover:text-green-700 transition-colors">
                    <i className="ri-whatsapp-line text-xl mb-1"></i>
                    <span className="text-xs">WhatsApp</span>
                  </a>
                  <Link href="/kontakt" className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 text-gray-700 hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <i className="ri-mail-line text-xl mb-1"></i>
                    <span className="text-xs">E-Mail</span>
                  </Link>
                </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 overflow-y-auto py-6">
                    <div className="space-y-3 px-4">
                      {/* Home entfernt */}
                      
                      <Link 
                        href="/fahrzeuge" 
                        className="flex items-center px-4 py-5 text-gray-700 rounded-xl cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i className="ri-car-line text-lg"></i>
                        </div>
                        <span className="font-medium">Fahrzeuge</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400"></i>
                      </Link>
                      
                      <a 
                        href="https://autogalerie-nord.de/fahrzeuge#!/tradein" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-4 text-gray-700 rounded-xl cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i className="ri-money-dollar-circle-line text-lg"></i>
                        </div>
                        <span className="font-medium">Autoankauf</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400"></i>
                      </a>
                      
                      <Link 
                        href="/leistungen" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-service-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Services</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>

                      {/* Leistungen Submenu */}
                      <div className="ml-6 space-y-2 bg-gray-50 rounded-xl p-3">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Unsere Services</div>
                        {leistungenSubMenu.map((item, index) => (
                          <Link 
                            key={index}
                            href={item.href} 
                            className="group flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-red-600 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-6 h-6 bg-gray-200 group-hover:bg-red-100 rounded-md flex items-center justify-center mr-3 transition-all duration-300">
                              <i className={`${item.icon} text-xs group-hover:text-red-600 transition-colors duration-300`}></i>
                            </div>
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      <Link 
                        href="/businessloesungen" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-building-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Business</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                      
                      {/* Kontakt Submenu (mobil) */}
                      <div className="ml-6 space-y-2 bg-gray-50 rounded-xl p-3">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kontakt</div>
                        <Link 
                          href="/kontakt" 
                          className="group flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-red-600 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="w-6 h-6 bg-gray-200 group-hover:bg-red-100 rounded-md flex items-center justify-center mr-3 transition-all duration-300">
                            <i className="ri-mail-line text-xs group-hover:text-red-600 transition-colors duration-300"></i>
                          </div>
                          <span className="text-sm">Kontakt</span>
                        </Link>
                        <Link 
                          href="/ueber-uns" 
                          className="group flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-red-600 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="w-6 h-6 bg-gray-200 group-hover:bg-red-100 rounded-md flex items-center justify-center mr-3 transition-all duration-300">
                            <i className="ri-team-line text-xs group-hover:text-red-600 transition-colors duration-300"></i>
                          </div>
                          <span className="text-sm">Über Uns</span>
                        </Link>
                      </div>
                      
                      {/* Über Uns als Top-Level entfernt, jetzt unter Kontakt */}
                      
                      <Link 
                        href="/kontakt" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-phone-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Kontakt</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Contact Actions */}
                  <div className="p-6 border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600 mb-1">Haben Sie Fragen?</p>
                      <p className="text-xs text-gray-500">Wir sind für Sie da!</p>
                    </div>
                    <a 
                      href="tel:+4904174596970"
                      className="group w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer inline-flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                        <i className="ri-phone-line text-lg"></i>
                      </div>
                      <span>Jetzt anrufen</span>
                      <i className="ri-arrow-right-line ml-auto transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </a>
                    <a 
                      href="https://wa.me/4941717889111"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer inline-flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 border border-red-600 group-hover:border-white rounded-lg flex items-center justify-center mr-3 group-hover:bg-white group-hover:bg-opacity-20 transition-all duration-300">
                        <i className="ri-whatsapp-line text-lg group-hover:text-white"></i>
                      </div>
                      <span>WhatsApp Chat</span>
                      <i className="ri-arrow-right-line ml-auto transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      </header>
    </>
  );
}
