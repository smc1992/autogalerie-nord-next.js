'use client';

import { useEffect } from 'react';

export default function FahrzeugeClient() {
  useEffect(() => {
    // Clean up any existing scripts first
    const cleanup = () => {
      // Remove existing scripts
      const existingScripts = document.querySelectorAll('script[src*="loader.nocache"], script[src*="jquery"], script[src*="am-marketplace"]');
      existingScripts.forEach(script => script.remove());

      // Clear marketplace globals
      if (typeof window !== 'undefined' && window.jQuery) {
        try {
          window.jQuery('#am-marketplace').empty();
          // Clean up any marketplace-specific event handlers
          window.jQuery(window).off('.marketplace');
          window.jQuery(document).off('.marketplace');
        } catch (e) {
          console.log('jQuery cleanup skipped');
        }
      }

      // Remove navigation elements
      const navElements = document.querySelectorAll('#am-marketplace-nav, .am-marketplace-nav');
      navElements.forEach(el => el.remove());
    };

    // Show fallback content if marketplace fails

    // Initialize marketplace with proper error handling
    const initializeMarketplace = async () => {
      try {
        cleanup();

        // Wait for DOM to be ready
        if (document.readyState !== 'complete') {
          await new Promise<void>(resolve => {
            const handleLoad = () => {
              window.removeEventListener('load', handleLoad);
              resolve();
            };
            window.addEventListener('load', handleLoad);
          });
        }

        // Load jQuery first with proper version
        if (typeof window !== 'undefined' && !window.jQuery) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            script.crossOrigin = 'anonymous';
            script.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
            script.onload = () => {
              // Ensure global jQuery is available
              window.$ = window.jQuery;
              console.log('jQuery loaded successfully');
              resolve();
            };
            script.onerror = (error) => {
              console.error('Failed to load jQuery:', error);
              reject(error);
            };
            // Append to head as recommended in documentation for better performance
          document.head.appendChild(script);
          console.log('Marketplace script added to head with attributes:', {
            'api-key': script.getAttribute('api-key'),
            'urls-imprint': script.getAttribute('urls-imprint'),
            'urls-terms': script.getAttribute('urls-terms'),
            'urls-privacy': script.getAttribute('urls-privacy')
          });
          });
        }

        // Create required navigation elements BEFORE loading marketplace script
        const createRequiredElements = () => {
          // Remove any existing elements first
          const existingNavs = document.querySelectorAll('#am-marketplace-nav, .am-marketplace-nav');
          existingNavs.forEach(el => el.remove());

          // Create the main navigation element that the marketplace expects
          const navDiv = document.createElement('div');
          navDiv.id = 'am-marketplace-nav';
          navDiv.className = 'am-marketplace-nav';
          navDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 0;
            z-index: -1;
            opacity: 0;
            pointer-events: none;
          `;
          document.body.appendChild(navDiv);

          // Add additional required elements for marketplace functionality
          const styleEl = document.createElement('style');
          styleEl.textContent = `
            #am-marketplace-nav { 
              display: block !important; 
              visibility: hidden !important;
            }
            .am-marketplace-loading {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
            }
          `;
          document.head.appendChild(styleEl);

          console.log('Required navigation elements created');
        };

        createRequiredElements();

        // Wait for jQuery to be fully initialized
        await new Promise<void>(resolve => setTimeout(resolve, 500));

        // Verify jQuery and required elements are available
        if (typeof window === 'undefined' || !window.jQuery) {
          throw new Error('jQuery not available');
        }

        const navElement = document.getElementById('am-marketplace-nav');
        if (!navElement) {
          throw new Error('Navigation element not found');
        }

        // Add comprehensive jQuery extensions that the marketplace expects
        if (typeof window !== 'undefined' && window.jQuery) {
          // Ensure offset method exists and works properly
          if (!window.jQuery.fn.offset) {
            window.jQuery.fn.offset = function() {
              if (!this[0]) return { top: 0, left: 0 };
              const rect = this[0].getBoundingClientRect();
              return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset
              };
            };
          }

          // Add unload method if missing
          if (!window.jQuery.fn.unload) {
            window.jQuery.fn.unload = function(this: JQuery, handler?: Function) {
              if (handler) {
                this.on('beforeunload', handler);
              }
              return this;
            };
          }

          // Add additional jQuery methods that might be expected
          if (!window.jQuery.fn.scrollTop) {
            window.jQuery.fn.scrollTop = function(this: JQuery, value?: number) {
              if (value !== undefined) {
                if (this[0]) {
                  (this[0] as HTMLElement).scrollTop = value;
                }
                return this;
              }
              return this[0] ? (this[0] as HTMLElement).scrollTop : 0;
            };
          }

          // Ensure width and height methods exist
          if (!window.jQuery.fn.width) {
            window.jQuery.fn.width = function(this: JQuery) {
              return this[0] ? (this[0] as HTMLElement).offsetWidth : 0;
            };
          }

          if (!window.jQuery.fn.height) {
            window.jQuery.fn.height = function(this: JQuery) {
              return this[0] ? (this[0] as HTMLElement).offsetHeight : 0;
            };
          }

          // Add show/hide methods
          if (!window.jQuery.fn.show) {
            window.jQuery.fn.show = function(this: JQuery) {
              this.each(function(this: Element) {
                (this as HTMLElement).style.display = '';
              });
              return this;
            };
          }

          if (!window.jQuery.fn.hide) {
            window.jQuery.fn.hide = function(this: JQuery) {
              this.each(function(this: Element) {
                (this as HTMLElement).style.display = 'none';
              });
              return this;
            };
          }

          // Add text method
          if (!window.jQuery.fn.text) {
            window.jQuery.fn.text = function(this: JQuery, value?: string) {
              if (value !== undefined) {
                this.each(function(this: Element) {
                  this.textContent = value;
                });
                return this;
              }
              return this[0] ? this[0].textContent : '';
            };
          }

          // Add html method
          if (!window.jQuery.fn.html) {
            window.jQuery.fn.html = function(this: JQuery, value?: string) {
              if (value !== undefined) {
                this.each(function(this: Element) {
                  this.innerHTML = value;
                });
                return this;
              }
              return this[0] ? this[0].innerHTML : '';
            };
          }

          // Add addClass method
          if (!window.jQuery.fn.addClass) {
            window.jQuery.fn.addClass = function(this: JQuery, className: string) {
              this.each(function(this: Element) {
                this.classList.add(className);
              });
              return this;
            };
          }

          // Add removeClass method
          if (!window.jQuery.fn.removeClass) {
            window.jQuery.fn.removeClass = function(this: JQuery, className: string) {
              this.each(function(this: Element) {
                if (this.classList) {
                  this.classList.remove(className);
                } else {
                  this.className = '';
                }
              });
              return this;
            };
          }

          // Add hasClass method
          if (!window.jQuery.fn.hasClass) {
            window.jQuery.fn.hasClass = function(this: JQuery, className: string) {
              if (!this[0]) return false;
              return this[0].classList.contains(className);
            };
          }

          // Add attr method
          if (!window.jQuery.fn.attr) {
            window.jQuery.fn.attr = function(this: JQuery, name: string, value?: string) {
              if (value !== undefined) {
                this.each(function(this: Element) {
                  this.setAttribute(name, value);
                });
                return this;
              }
              return this[0] ? this[0].getAttribute(name) : null;
            };
          }

          // Add css method
          if (!window.jQuery.fn.css) {
            window.jQuery.fn.css = function(this: JQuery, property: string | object, value?: string) {
              if (typeof property === 'object') {
                this.each(function(this: Element) {
                  Object.assign((this as HTMLElement).style, property);
                });
                return this;
              }
              if (value !== undefined && typeof property === 'string') {
                this.each(function(this: Element) {
                  ((this as HTMLElement).style)[property as any] = value;
                });
                return this;
              }
              return this[0] && typeof property === 'string' ? getComputedStyle(this[0])[property as any] : null;
            };
          }

          // Add val method
          if (!window.jQuery.fn.val) {
            window.jQuery.fn.val = function(this: JQuery, value?: string) {
              if (value !== undefined) {
                this.each(function(this: Element) {
                  if ('value' in this) {
                    (this as HTMLInputElement).value = value;
                  }
                });
                return this;
              }
              return this[0] ? (this[0] as HTMLInputElement).value : '';
            };
          }

          // Add find method
          if (!window.jQuery.fn.find) {
            window.jQuery.fn.find = function(this: JQuery, selector: string) {
              const elements: Element[] = [];
              this.each(function(this: Element) {
                const found = this.querySelectorAll(selector);
                elements.push(...Array.from(found).map(el => el as Element));
              });
              // Create a proper jQuery object from individual elements
              if (elements.length > 0 && window.jQuery) {
                const jq = window.jQuery(elements[0]);
                if (elements.length > 1) {
                  return jq.add(elements.slice(1));
                }
                return jq;
              }
              return window.jQuery ? window.jQuery(document.createDocumentFragment()) : this;
            };
          }

          // Add each method
          if (!window.jQuery.fn.each) {
            window.jQuery.fn.each = function(this: JQuery, callback: (index: number, element: Element) => void) {
              for (let i = 0; i < this.length; i++) {
                callback.call(this[i], i, this[i]);
              }
              return this;
            };
          }

          // Add append method
          if (!window.jQuery.fn.append) {
            window.jQuery.fn.append = function(this: JQuery, content: string | Element) {
              this.each(function(this: Element) {
                if (typeof content === 'string') {
                  this.insertAdjacentHTML('beforeend', content);
                } else {
                  this.appendChild(content);
                }
              });
              return this;
            };
          }

          // Add remove method
          if (!window.jQuery.fn.remove) {
            window.jQuery.fn.remove = function(this: JQuery) {
              this.each(function(this: Element) {
                if (this.parentNode) {
                  this.parentNode.removeChild(this);
                }
              });
              return this;
            };
          }

          // Add empty method
          if (!window.jQuery.fn.empty) {
            window.jQuery.fn.empty = function(this: JQuery) {
              this.each(function(this: Element) {
                this.innerHTML = '';
              });
              return this;
            };
          }

          // Override the problematic offset method to handle the navigation element
          const originalOffset = window.jQuery.fn.offset;
          window.jQuery.fn.offset = function() {
            // Special handling for the marketplace navigation element
            if (this.length > 0 && (this[0].id === 'am-marketplace-nav' || this[0].className.includes('am-marketplace-nav'))) {
              return { top: 0, left: 0 };
            }
            
            if (!this[0]) return { top: 0, left: 0 };
            const rect = this[0].getBoundingClientRect();
            return {
              top: rect.top + window.pageYOffset,
              left: rect.left + window.pageXOffset
            };
          };
        }

        // Override global error handlers to catch marketplace errors
        const originalError = window.onerror;
        window.onerror = function(event, source, lineno, colno, error) {
          // Check if error is from marketplace
          if (source && source.includes('marketplace') || 
              (error && error.stack && error.stack.includes('marketplace'))) {
            console.log('Marketplace error caught:', { event, source, error });
            return true; // Prevent default error handling
          }
          return originalError ? originalError.call(this, event, source, lineno, colno, error) : false;
        };

        // Add unhandled promise rejection handler
        const originalUnhandledRejection = window.onunhandledrejection;
        window.onunhandledrejection = function(event) {
          if (event.reason && typeof event.reason === 'object' && Object.keys(event.reason).length === 0) {
            console.warn('Empty rejection from marketplace script handled');
            event.preventDefault();
            return;
          }
          if (originalUnhandledRejection && typeof originalUnhandledRejection === 'function') {
            return originalUnhandledRejection.call(window, event);
          }
          return undefined;
        };

        // Add beforeunload handler
        window.jQuery(window).on('beforeunload.marketplace', function() {
          console.log('Page unloading, cleaning up marketplace');
          return undefined;
        });

        // Simplified marketplace loading with multiple fallback strategies
        console.log('🚀 Starting marketplace initialization...');
        
        let scriptLoaded = false;
        
        // Strategy 1: Direct script injection
        try {
          console.log('📦 Loading marketplace script...');
          
          const script = document.createElement('script');
          script.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
          script.async = true;
          
          // Set attributes
          script.setAttribute('api-key', '0536fa11-99df-43f8-bf26-42af233f5478');
          script.setAttribute('urls-imprint', '/impressum');
          script.setAttribute('urls-terms', '/agb');
          script.setAttribute('urls-privacy', '/datenschutz');
          
          // Promise with shorter timeout for faster fallback
          await new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
              console.warn('⏰ Script loading timeout, proceeding with fallback');
              resolve();
            }, 10000); // Reduced to 10 seconds
            
            script.onload = () => {
              clearTimeout(timeout);
              console.log('✅ Marketplace script loaded!');
              scriptLoaded = true;
              
              // Quick initialization check
              setTimeout(() => {
                const container = document.getElementById('am-marketplace');
                if (container && container.children.length <= 1) {
                  console.log('🔄 Container still empty, triggering manual check...');
                  // Container is still showing loading, marketplace might need more time
                }
                resolve();
              }, 2000);
            };
            
            script.onerror = () => {
              clearTimeout(timeout);
              console.error('❌ Script loading failed');
              resolve();
            };
            
            document.head.appendChild(script);
            console.log('📤 Script injected into head');
          });
          
        } catch (error) {
          console.error('💥 Script injection failed:', error);
        }
        
        // Strategy 2: Alternative loading if first attempt failed
        if (!scriptLoaded) {
          console.log('🔄 Trying alternative loading method...');
          
          try {
            // Create inline script that loads the marketplace
            const inlineScript = document.createElement('script');
            inlineScript.innerHTML = `
              console.log('🔧 Alternative loader starting...');
              
              // Set up container first
              const container = document.getElementById('am-marketplace');
              if (container) {
                container.innerHTML = \`
                  <div style="text-align: center; padding: 60px 20px; font-family: system-ui, sans-serif;">
                    <div style="width: 60px; height: 60px; border: 4px solid #dc2626; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    <h3 style="color: #374151; margin: 0 0 10px; font-size: 20px;">Fahrzeugmarktplatz wird geladen...</h3>
                    <p style="color: #6b7280; margin: 0; font-size: 16px;">Einen Moment bitte...</p>
                  </div>
                  <style>
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                  </style>
                \`;
              }
              
              // Load script with different approach
              const altScript = document.createElement('script');
              altScript.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
              altScript.setAttribute('api-key', '0536fa11-99df-43f8-bf26-42af233f5478');
              altScript.setAttribute('urls-imprint', '/impressum');
              altScript.setAttribute('urls-terms', '/agb');
              altScript.setAttribute('urls-privacy', '/datenschutz');
              
              altScript.onload = function() {
                console.log('✅ Alternative script loaded successfully!');
              };
              
              altScript.onerror = function() {
                console.error('❌ Alternative script failed, showing fallback');
                if (container) {
                  container.innerHTML = \`
                    <div style="text-align: center; padding: 60px 20px; font-family: system-ui, sans-serif;">
                      <div style="color: #dc2626; margin-bottom: 20px; font-size: 48px;">⚠️</div>
                      <h3 style="color: #374151; margin: 0 0 10px; font-size: 20px;">Fahrzeugmarktplatz vorübergehend nicht verfügbar</h3>
                      <p style="color: #6b7280; margin: 0 0 20px; font-size: 16px;">Bitte versuchen Sie es später erneut.</p>
                      <button onclick="window.location.reload()" style="background: #dc2626; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer;">Seite neu laden</button>
                    </div>
                  \`;
                }
              };
              
              document.head.appendChild(altScript);
              console.log('📤 Alternative script injected');
            `;
            
            document.head.appendChild(inlineScript);
            console.log('🔧 Alternative loader injected');
            
          } catch (altError) {
            console.error('💥 Alternative loading failed:', altError);
            showFallback();
          }
        }

        console.log('Marketplace initialization completed');

      } catch (error) {
        console.error('Failed to initialize marketplace:', error);
        showFallback();
      }
    };

    // Show fallback content if marketplace fails
    const showFallback = () => {
      const container = document.getElementById('am-marketplace');
      if (container) {
        container.innerHTML = `
          <div class="text-center py-20">
            <div class="text-red-600 mb-4">
              <i class="ri-alert-line text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fahrzeugmarktplatz vorübergehend nicht verfügbar</h3>
            <p class="text-gray-600 mb-4">Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/kontakt" class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 whitespace-nowrap">
                Jetzt kontaktieren
              </a>
              <button onclick="window.location.reload()" class="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap">
                Seite neu laden
              </button>
            </div>
          </div>
        `;
      }
    };

    // Start initialization with delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      initializeMarketplace();
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(initTimer);
      cleanup();
      // Remove marketplace-specific event handlers
      if (typeof window !== 'undefined' && window.jQuery) {
        window.jQuery(window).off('.marketplace');
        window.jQuery(document).off('.marketplace');
      }
      // Restore original error handlers
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              Unsere Fahrzeuge
            </h1>
            <p className="text-xl text-red-100 mb-4 animate-fadeInUp animation-delay-300">
              Entdecken Sie über 70 hochwertige Gebrauchtwagen
            </p>
            <p className="text-lg text-red-200 animate-fadeInUp animation-delay-500">
              BMW • Mercedes • Audi • Volkswagen • und viele weitere Marken
            </p>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4 group-hover:bg-red-600 transition-all duration-300">
                <i className="ri-shield-check-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Geprüfte Qualität</h3>
              <p className="text-gray-600 text-sm">Alle Fahrzeuge werden von unseren Experten geprüft</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4 group-hover:bg-red-600 transition-all duration-300">
                <i className="ri-hand-heart-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Faire Preise</h3>
              <p className="text-gray-600 text-sm">Transparente Preisgestaltung ohne versteckte Kosten</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4 group-hover:bg-red-600 transition-all duration-300">
                <i className="ri-customer-service-2-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Persönliche Beratung</h3>
              <p className="text-gray-600 text-sm">Individuelle Betreuung bei Kauf und Finanzierung</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Marketplace Container */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden min-h-[600px]">
            {/* The correct DIV element with required ID (attributes moved to script tag as per documentation) */}
            <div 
              id="am-marketplace"
              className="w-full min-h-[600px] flex items-center justify-center am-marketplace-loading"
            >
              {/* Enhanced loading indicator */}
              <div className="text-center py-20">
                <div className="relative mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto"></div>
                  <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-red-200 mx-auto animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fahrzeugmarktplatz wird geladen...</h3>
                <p className="text-gray-600 mb-2">Bitte warten Sie, während wir über 70 Fahrzeuge für Sie laden</p>
                <div className="flex items-center justify-center space-x-1 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Falls das Laden länger dauert als erwartet, aktualisieren Sie bitte die Seite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Notes */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ihr Wunschfahrzeug nicht dabei?
            </h2>
            <p className="text-xl text-gray-600">
              Kein Problem! Wir beschaffen Ihnen auch individuell Ihr Traumauto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mb-6">
                <i className="ri-search-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fahrzeugsuche</h3>
              <p className="text-gray-700 mb-6">
                Teilen Sie uns Ihre Wünsche mit - wir finden das perfekte Fahrzeug und beschaffen es zu fairen Konditionen für Sie.
              </p>
              <a 
                href="mailto:info@autogalerie-nord.de?subject=Fahrzeugsuche"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center"
              >
                <i className="ri-mail-line mr-2"></i>
                Anfrage senden
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mb-6">
                <i className="ri-phone-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Persönliche Beratung</h3>
              <p className="text-gray-700 mb-6">
                Rufen Sie uns für eine unverbindliche Beratung an. Gerne besprechen wir Ihre Anforderungen und Wünsche.
              </p>
              <a 
                href="tel:+4941745969770"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center"
              >
                <i className="ri-phone-line mr-2"></i>
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Financing CTA */}
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
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-calculator-line mr-2"></i>
                Finanzierung berechnen
              </a>
              <a 
                href="/kontakt"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-user-line mr-2"></i>
                Beratungstermin
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-500 { animation-delay: 500ms; }
      `}</style>
    </div>
  );
}