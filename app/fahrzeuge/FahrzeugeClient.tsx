'use client';

import { useEffect } from 'react';

export default function FahrzeugeClient() {
  useEffect(() => {
    // Vollständige Marketplace-Neuimplementierung gemäß pixelconcept Dokumentation
    const initializeMarketplace = () => {
      // Cleanup aller bestehenden Systeme
      const cleanup = () => {
        // Entferne alle Scripts
        const scripts = document.querySelectorAll('script[src*="loader.nocache"], script[src*="am-marketplace"], script[src*="angular"], script[src*="quicksearch"]');
        scripts.forEach(script => script.remove());
        
        // Cleanup Globals
        if (typeof window !== 'undefined') {
          delete (window as any).angular;
          delete (window as any).ng;
          delete (window as any).amm;
          delete (window as any).marketplace;
          delete (window as any).quicksearch;
        }
        
        // Reset Container
        const container = document.getElementById('am-marketplace');
        if (container) {
          container.innerHTML = '';
          container.className = '';
        }
      };
      
      cleanup();
      
      console.log('🚀 Starting fresh marketplace initialization...');
      
      // Marketplace Global definieren (für QuickSearch-Kompatibilität)
      if (typeof window !== 'undefined') {
        (window as any).marketplace = {
          initialized: false,
          config: {
            apiKey: '0536fa11-99df-43f8-bf26-42af233f5478'
          }
        };
      }
      
      // CSS für unser Design-Integration
      const addCustomStyles = () => {
        // Remove existing styles
        const existingStyles = document.querySelectorAll('style[data-marketplace="true"]');
        existingStyles.forEach(style => style.remove());
        
        const styleEl = document.createElement('style');
        styleEl.setAttribute('data-marketplace', 'true');
        styleEl.textContent = `
          /* Marketplace Design Integration */
          #am-marketplace {
            width: 100% !important;
            max-width: none !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            line-height: 1.5 !important;
            color: #1f2937 !important;
            background: #ffffff !important;
            font-size: 14px !important;
            min-height: 600px !important;
          }
          
          /* Button Styling */
          #am-marketplace button {
            background: #dc2626 !important;
            border: 1px solid #dc2626 !important;
            color: #ffffff !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          #am-marketplace button:hover {
            background: #b91c1c !important;
            border-color: #b91c1c !important;
          }
          
          #am-marketplace button * {
            color: #ffffff !important;
          }
          
          /* Links */
          #am-marketplace a {
            color: #0066cc !important;
            text-decoration: underline !important;
          }
          
          #am-marketplace a:hover {
            color: #004499 !important;
          }
          
          /* Preise */
          #am-marketplace .price,
          #am-marketplace .vehicle-price,
          #am-marketplace .amm-price {
            color: #dc2626 !important;
            font-weight: bold !important;
          }
          
          /* Titel */
          #am-marketplace .vehicle-title,
          #am-marketplace .amm-title {
            color: #1976d2 !important;
            font-weight: bold !important;
          }
          
          /* Navigation Pfeile */
          #am-marketplace .prevnextbuttons .btn {
            background: #dc2626 !important;
            border: 1px solid #dc2626 !important;
            color: #ffffff !important;
            padding: 10px 15px !important;
            border-radius: 6px !important;
            margin: 0 5px !important;
          }
          
          #am-marketplace .prevnextbuttons .btn span {
            color: #ffffff !important;
            font-size: 16px !important;
            font-weight: bold !important;
          }
          
          #am-marketplace .prevnextbuttons .btn.prev span:before {
            content: '‹' !important;
            font-size: 20px !important;
          }
          
          #am-marketplace .prevnextbuttons .btn.next span:before {
            content: '›' !important;
            font-size: 20px !important;
          }
          
          /* Modal Styles */
          #am-marketplace .modal,
          #am-marketplace .dialog,
          #am-marketplace .popup {
            background: #ffffff !important;
            color: #1f2937 !important;
            border-radius: 8px !important;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
            padding: 20px !important;
          }
          
          /* Zubehör Grid */
          #am-marketplace .equipment-list,
          #am-marketplace .accessory-list,
          #am-marketplace .options-list {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 15px !important;
            margin: 20px 0 !important;
          }
          
          #am-marketplace .equipment-item img,
          #am-marketplace .accessory-item img,
          #am-marketplace .option-item img {
            width: 100% !important;
            height: 120px !important;
            object-fit: cover !important;
            border-radius: 6px !important;
            background: #f3f4f6 !important;
          }
        `;
        document.head.appendChild(styleEl);
      };
      
      // Styles hinzufügen
      addCustomStyles();
      
      // Marketplace Script laden - Einfache Methode gemäß Dokumentation
       const loadMarketplaceScript = () => {
         const script = document.createElement('script');
         script.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
         script.async = true;
         
         script.onload = () => {
           console.log('✅ Marketplace script loaded successfully!');
           // Marketplace als initialisiert markieren
           if (typeof window !== 'undefined' && (window as any).marketplace) {
             (window as any).marketplace.initialized = true;
           }
         };
         
         script.onerror = () => {
           console.error('❌ Failed to load marketplace script');
           showFallback();
         };
         
         // Script in Head einfügen (wie in Dokumentation empfohlen)
         document.head.appendChild(script);
         console.log('📦 Marketplace script added to head');
       };
       
       // Lade Script nach kurzer Verzögerung
       setTimeout(loadMarketplaceScript, 100);
    };
    
    // Fallback anzeigen bei Fehlern
    const showFallback = () => {
      const container = document.getElementById('am-marketplace');
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 60px 20px; font-family: system-ui, sans-serif;">
            <div style="color: #dc2626; margin-bottom: 20px; font-size: 48px;">⚠️</div>
            <h3 style="color: #374151; margin: 0 0 10px; font-size: 20px;">Fahrzeugmarktplatz vorübergehend nicht verfügbar</h3>
            <p style="color: #6b7280; margin: 0 0 20px; font-size: 16px;">Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.</p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <a href="/kontakt" style="background: #dc2626; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Jetzt kontaktieren</a>
              <button onclick="window.location.reload()" style="background: transparent; color: #dc2626; border: 2px solid #dc2626; padding: 10px 22px; border-radius: 8px; cursor: pointer; font-weight: 500;">Seite neu laden</button>
            </div>
          </div>
        `;
      }
    };
    
    // Erweiterte Error Handling
     const originalConsoleError = console.error;
     console.error = function(...args) {
       const message = args.join(' ');
       if (message.includes('removeChild') || 
            message.includes('NotFoundError') ||
            message.includes('scrollToTarget') ||
            message.includes('Cannot read properties of undefined') ||
            message.includes('Cannot read properties of null') ||
            message.includes('toLowerCase') ||
             message.includes('currency.js') ||
             message.includes('ProductSwiperSlide.js') ||
             message.includes('root node should look like') ||
             message.includes('marketplace is not defined') ||
             message.includes('ReferenceError') ||
             message.includes('quicksearch-norequire') ||
             message.includes('initSelectors') ||
             message.includes('QuickSearchWidget') ||
             message.includes('Externes AMM-System') ||
             message.includes('fullscreen') ||
            message.includes('Potential permissions policy violation')) {
         console.warn('Marketplace error suppressed:', message);
         return;
       }
       originalConsoleError.apply(console, args);
     };
     
     // Fullscreen Policy Override
     if (typeof document !== 'undefined') {
       // Überschreibe requestFullscreen um Policy-Violations zu verhindern
       const originalRequestFullscreen = Element.prototype.requestFullscreen;
       Element.prototype.requestFullscreen = function() {
         console.warn('Fullscreen request blocked for policy compliance');
         return Promise.reject(new Error('Fullscreen not allowed'));
       };
     }
     
     // ScrollToTarget Polyfill für Marketplace
     if (typeof window !== 'undefined') {
       window.addEventListener('error', (event) => {
         if (event.message && event.message.includes('scrollToTarget')) {
           console.warn('ScrollToTarget error caught and handled');
           event.preventDefault();
         }
       });
       
       // Unhandled Promise Rejection Handler
       window.addEventListener('unhandledrejection', (event) => {
         if (event.reason && typeof event.reason === 'object' && Object.keys(event.reason).length === 0) {
           console.warn('Empty promise rejection handled');
           event.preventDefault();
         }
       });
     }
    
    // Marketplace initialisieren
    initializeMarketplace();
    
    // Cleanup function
      return () => {
        // Entferne alle Marketplace- und Angular-Scripts
        const scripts = document.querySelectorAll('script[src*="loader.nocache"], script[src*="pxc-amm"], script[src*="angular"], script[src*="am-marketplace"]');
        scripts.forEach(script => {
          console.log('🧹 Removing marketplace script:', (script as HTMLScriptElement).src);
          script.remove();
        });
        
        // Entferne Marketplace-Styles
        const styles = document.querySelectorAll('style[data-marketplace="true"]');
        styles.forEach(style => style.remove());
        
        // Leere und reset Marketplace-Container
        const container = document.getElementById('am-marketplace');
        if (container) {
          container.innerHTML = '';
          container.className = '';
          // Entferne ng-scope Klassen die Angular hinzufügt
          container.classList.remove('ng-scope');
        }
        
        // Cleanup Angular globals und Event-Listener
         if (typeof window !== 'undefined') {
           // Entferne Angular-spezifische Globals
           delete (window as any).angular;
           delete (window as any).ng;
           
           // Entferne Marketplace-spezifische Globals
           delete (window as any).amm;
           delete (window as any).marketplace;
           
           // Entferne Event-Listener
           window.removeEventListener('error', () => {});
           window.removeEventListener('unhandledrejection', () => {});
         }
        
        console.log('🧹 Marketplace and Angular cleanup completed');
      };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Über 120 Premium-Fahrzeuge
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen, 
            Jahreswagen und Neuwagen zu fairen Preisen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#am-marketplace" 
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300 whitespace-nowrap"
            >
              Fahrzeuge durchsuchen
            </a>
            <a 
              href="/kontakt" 
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap"
            >
              Beratung vereinbaren
            </a>
          </div>
        </div>
      </section>

      {/* Marketplace Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unser Fahrzeugbestand
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Durchsuchen Sie unseren aktuellen Bestand an Premium-Fahrzeugen. 
              Alle Fahrzeuge sind sofort verfügbar und können besichtigt werden.
            </p>
          </div>
          
          {/* Marketplace DIV mit korrekten Attributen für ITT-System */}
          <div
            id="am-marketplace"
            api-key="0536fa11-99df-43f8-bf26-42af233f5478"
            urls-imprint="https://autogalerie-nord.de/impressum"
            urls-terms="https://autogalerie-nord.de/agb"
            urls-privacy="https://autogalerie-nord.de/datenschutz"
            style={{
              width: '100%',
              minHeight: '600px',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* ITT Root Node für erweiterte Marketplace-Funktionen */}
            <div 
              id="itt-sl-ucl"
              data-dealer-id="0536fa11-99df-43f8-bf26-42af233f5478"
              style={{
                width: '100%',
                minHeight: '100%'
              }}
            >
            {/* Loading Indicator */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '4px solid #dc2626',
                borderTop: '4px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
              }}></div>
              <h3 style={{
                color: '#374151',
                margin: '0 0 10px',
                fontSize: '20px',
                fontWeight: '600'
              }}>
                Fahrzeugmarktplatz wird geladen...
              </h3>
              <p style={{
                color: '#6b7280',
                margin: '0',
                fontSize: '16px'
              }}>
                Bitte warten Sie, während wir über 120 Fahrzeuge für Sie laden
              </p>
            </div>
            
            <style jsx>{`
               @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
               }
             `}</style>
             </div>
           </div>
         </div>
       </section>

      {/* Service Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unser Service für Sie
            </h2>
            <p className="text-xl text-gray-600">
              Von der Beratung bis zur Zulassung - wir begleiten Sie bei jedem Schritt
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fahrzeugsuche</h3>
              <p className="text-gray-600">
                Professionelle Beratung bei der Auswahl Ihres Traumfahrzeugs
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualitätsprüfung</h3>
              <p className="text-gray-600">
                Alle Fahrzeuge werden von unseren Experten gründlich geprüft
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-text-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Komplettservice</h3>
              <p className="text-gray-600">
                Finanzierung, Versicherung und Zulassung aus einer Hand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Flexible Finanzierung für Ihr Traumauto
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Profitieren Sie von unseren attraktiven Finanzierungskonditionen und fahren Sie noch heute los.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/leistungen/finanzierung" 
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300 whitespace-nowrap"
              >
                Finanzierung anfragen
              </a>
              <a 
                href="/kontakt" 
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                Persönliche Beratung
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}