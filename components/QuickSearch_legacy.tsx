'use client';

import Script from 'next/script';

// This component now only renders the static HTML structure required by the legacy script.
// It then uses Next.js's Script component to load jQuery, the quicksearch script, and the initialization logic.

export default function QuickSearch() {
  return (
    <>
      <div className="quicksearch">
        <div className="quicksearch-container">
          <div className="quicksearch-toggle"></div>
          <div className="quicksearch-header">
            <a href="/fahrzeuge" className="quicksearch-headline">Fahrzeugsuche</a>
          </div>
          <div className="quicksearch-body">
            <div className="quicksearch-body-relative">
              <div className="quicksearch-form">
                {/* The select options will be populated by the script */}
                <div className="quicksearch-row">
                  <select id="hersteller" name="manufacturer"><option value="">Marke</option></select>
                  <select id="modell" name="model"><option value="">Modell</option></select>
                </div>
                <div className="quicksearch-row">
                  <select id="preismax" name="prRange">
                      <option value="">Preis bis</option>
                      <option value="5000">5.000 €</option>
                      <option value="10000">10.000 €</option>
                      <option value="15000">15.000 €</option>
                      <option value="20000">20.000 €</option>
                      <option value="25000">25.000 €</option>
                      <option value="30000">30.000 €</option>
                      <option value="40000">40.000 €</option>
                      <option value="50000">50.000 €</option>
                      <option value="75000">75.000 €</option>
                      <option value="100000">100.000 €</option>
                  </select>
                  <select id="kraftstoff" name="fueltype"><option value="">Kraftstoff</option></select>
                </div>
                <div className="quicksearch-row">
                   <select id="karosserie" name="bodytype"><option value="">Karosserie</option></select>
                   <select id="fahrzeugart" name="category"><option value="">Fahrzeugart</option></select>
                </div>
                 <div className="quicksearch-row">
                  <select id="kilometerbis" name="kmRange"><option value="">Kilometer bis</option></select>
                  <select id="zulassungvon" name="frRange"><option value="">Erstzulassung ab</option></select>
                </div>
                <div className="quicksearch-row">
                  <a id="carsearchlink" className="button full-width" href="#">
                    <span className="quicksearch-count">...</span> Fahrzeuge
                  </a>
                </div>
                <div className="quicksearch-row">
                   <a id="car-search-reset" className="link" style={{cursor: 'pointer'}}>Filter zurücksetzen</a>
                   <a id="car-search-detail" className="link" style={{cursor: 'pointer', marginLeft: '20px'}}>Detailsuche</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load jQuery first */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="lazyOnload" />

      {/* Then load the quicksearch script */}
      <Script src="/quicksearch-norequire_1.4.2.min.js" strategy="lazyOnload" />

      {/* Finally, run the initialization script */}
      <Script id="quicksearch-init" strategy="lazyOnload">
        {`
          try {
            var marketplace = {
              url: '/', // The missing top-level URL, pointing to the site root.
              target: '/fahrzeuge',
              culture: 'de-DE',
              hideOtherManufactueres: false,
              api: {
                url: '/api/', // The actual API endpoint via our proxy
                key: '0536fa11-99df-43f8-bf26-42af233f5478'
              }
            };
            if (window.jQuery && window.quicksearch) {
              window.jQuery(document).ready(function(){
                window.quicksearch.init(marketplace);
              });
            } else {
              console.error('jQuery or quicksearch not available.');
            }
          } catch (e) {
            console.error('Error initializing quicksearch:', e);
          }
        `}
      </Script>
    </>
  );
}