
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeistungenOpen, setIsLeistungenOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leistungenSubMenu = [
    { href: '/leistungen/finanzierung', label: 'Finanzierung', icon: 'ri-bank-card-line' },
    { href: '/leistungen/zulassungsservice', label: 'Zulassungsservice', icon: 'ri-file-text-line' },
    { href: '/leistungen/import-export', label: 'Import & Export', icon: 'ri-ship-line' },
    { href: '/leistungen/kommissionsverkauf', label: 'Kommissionsverkauf', icon: 'ri-exchange-dollar-line' }
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-red-600 text-white py-2 transform transition-all duration-300 hover:bg-red-700">
        <div className="px-4 md:px-6">
          <div className="flex justify-center md:justify-end items-center">
            {/* Desktop Contact Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="https://wa.me/4941717889111" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                  <i className="ri-whatsapp-line text-sm"></i>
                </div>
                <span className="text-sm whitespace-nowrap">WhatsApp</span>
              </a>
              <a 
                href="tel:+4941745969770" 
                className="group flex items-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                  <i className="ri-phone-line text-sm"></i>
                </div>
                <span className="text-sm whitespace-nowrap">+49 41 745 969 70</span>
              </a>
              <a 
                href="mailto:info@autogalerie-nord.de" 
                className="group flex items-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                  <i className="ri-mail-line text-sm"></i>
                </div>
                <span className="text-sm whitespace-nowrap">info@autogalerie-nord.de</span>
              </a>
            </div>

            {/* Mobile Contact Links */}
            <div className="flex md:hidden items-center space-x-4">
              <a 
                href="https://wa.me/4941717889111" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-125 hover:rotate-12"
              >
                <i className="ri-whatsapp-fill text-lg"></i>
              </a>
              <a 
                href="tel:+4941745969770" 
                className="w-8 h-8 flex items-center justify-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-125 hover:rotate-12"
              >
                <i className="ri-phone-fill text-lg"></i>
              </a>
              <a 
                href="mailto:info@autogalerie-nord.de" 
                className="w-8 h-8 flex items-center justify-center hover:text-red-200 transition-all duration-300 cursor-pointer transform hover:scale-125 hover:rotate-12"
              >
                <i className="ri-mail-fill text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white shadow-lg relative z-50 ${isScrolled ? 'shadow-xl' : 'shadow-md'}`}>
        <div className="pl-2 pr-4 md:px-6">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer group -ml-4 md:ml-0">
              <img 
                src="/images/logo.png" 
                alt="Autogalerie Nord Logo" 
                className="h-32 md:h-36 lg:h-40 w-auto transform transition-all duration-300 group-hover:scale-110"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Home
              </Link>
              <Link href="/fahrzeuge" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Fahrzeuge
              </Link>
              <Link href="/autoankauf" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Autoankauf
              </Link>
              <div 
                className="relative"
                onMouseEnter={() => setIsLeistungenOpen(true)}
                onMouseLeave={() => setIsLeistungenOpen(false)}
              >
                <Link href="/leistungen" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer flex items-center">
                  Leistungen
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </Link>
                {isLeistungenOpen && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {leistungenSubMenu.map((item, index) => (
                      <Link key={index} href={item.href} className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                        <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/businessloesungen" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Business
              </Link>

              <Link href="/service" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Service
              </Link>

              <Link href="/ueber-uns" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Über Uns
              </Link>

              <Link href="/kontakt" className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                Kontakt
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 z-50 relative transition-all duration-300 transform hover:scale-110"
            >
              {!isMenuOpen ? (
                <div className="relative w-6 h-6">
                  <span className="absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full"></span>
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full"></span>
                  <span className="absolute top-5 left-0 w-4 h-0.5 bg-current transform transition-all duration-300 rounded-full"></span>
                </div>
              ) : (
                <div className="relative w-6 h-6">
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-current transform rotate-45 transition-all duration-300 rounded-full"></span>
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-current transform -rotate-45 transition-all duration-300 rounded-full"></span>
                </div>
              )}
            </button>
          </nav>

          {/* Mobile Navigation Overlay */}
          <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div 
              className="absolute inset-0 bg-black transition-opacity duration-500 ease-in-out"
              style={{ opacity: isMenuOpen ? 0.6 : 0 }}
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-all duration-500 ease-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-center p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <i className="ri-navigation-line text-white text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Navigation</h3>
                      <p className="text-xs text-gray-500">Autogalerie Nord</p>
                    </div>
                  </div>
                </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 overflow-y-auto py-6">
                    <div className="space-y-3 px-4">
                      <Link 
                        href="/" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-home-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Home</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                      
                      <Link 
                        href="/fahrzeuge" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-car-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Fahrzeuge</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                      
                      <Link 
                        href="/autoankauf" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-money-dollar-circle-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Autoankauf</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                      
                      <Link 
                        href="/leistungen" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-service-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Leistungen</span>
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
                      
                      <Link 
                        href="/service" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-tools-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Service</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                      
                      <Link 
                        href="/ueber-uns" 
                        className="group flex items-center px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-600 rounded-lg flex items-center justify-center mr-4 transition-all duration-300">
                          <i className="ri-team-line text-lg group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <span className="font-medium">Über Uns</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300"></i>
                      </Link>
                      
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
                      href="tel:+4941745969770"
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
      </header>
    </>
  );
}
