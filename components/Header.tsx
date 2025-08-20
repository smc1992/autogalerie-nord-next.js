
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
        <div className="px-4 md:px-6">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
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
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 z-50 relative"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
          </nav>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              
              <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Menü</h3>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 overflow-y-auto py-6">
                    <div className="space-y-2 px-4">
                      <Link 
                        href="/" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-home-line w-5 h-5 mr-3"></i>
                        Home
                      </Link>
                      
                      <Link 
                        href="/fahrzeuge" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-car-line w-5 h-5 mr-3"></i>
                        Fahrzeuge
                      </Link>
                      
                      <Link 
                        href="/autoankauf" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-car-line w-5 h-5 mr-3"></i>
                        Autoankauf
                      </Link>
                      
                      <Link 
                        href="/leistungen" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-service-line w-5 h-5 mr-3"></i>
                        Leistungen
                      </Link>

                      {/* Leistungen Submenu */}
                      <div className="ml-4 space-y-1">
                        {leistungenSubMenu.map((item, index) => (
                          <Link 
                            key={index}
                            href={item.href} 
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <i className={`${item.icon} w-4 h-4 mr-3`}></i>
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      <Link 
                        href="/businessloesungen" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-building-line w-5 h-5 mr-3"></i>
                        Business
                      </Link>
                      
                      <Link 
                        href="/service" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-tools-line w-5 h-5 mr-3"></i>
                        Service
                      </Link>
                      
                      <Link 
                        href="/ueber-uns" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-team-line w-5 h-5 mr-3"></i>
                        Über Uns
                      </Link>
                      
                      <Link 
                        href="/kontakt" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-phone-line w-5 h-5 mr-3"></i>
                        Kontakt
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Contact Actions */}
                  <div className="p-6 border-t border-gray-200 space-y-3">
                    <a 
                      href="tel:+4941745969770"
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="ri-phone-line mr-2"></i>
                      Jetzt anrufen
                    </a>
                    <a 
                      href="https://wa.me/4941717889111"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="ri-whatsapp-line mr-2"></i>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
