"use client";

import { useState, useEffect } from 'react';
import Section from './Section';
import { useLanguage } from '../context/LanguageContext';
import dictionaries from '../i18n/dictionaries';

export default function GoogleReviews() {
  const { dict } = useLanguage();
  const home = (dict?.home ?? dictionaries.de.home ?? {});
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Verwende Reviews aus dem Wörterbuch, fallback auf DE wenn in aktueller Sprache nicht vorhanden
  const reviews = Array.isArray((home as any).reviewsItems)
    ? (home as any).reviewsItems
    : (Array.isArray((dictionaries as any).de?.home?.reviewsItems)
        ? (dictionaries as any).de.home.reviewsItems
        : []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % (reviews.length || 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <Section background="muted" className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-red-200/20 to-transparent rounded-full animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-gray-100/10 to-transparent rounded-full animate-pulse animation-delay-2000"></div>

      <div className="relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/images/google-logo.svg" 
              alt="Google" 
              className="w-8 h-8 mr-3"
            />
            <h2 className="text-4xl font-bold text-gray-900">
              {home.reviewsTitle}
            </h2>
          </div>
          
          {/* Google Rating Summary */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <span className="text-5xl font-bold text-gray-900 mr-3">4,8</span>
                <div className="flex flex-col">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-star-fill text-yellow-400 text-xl animate-pulse" style={{ animationDelay: `${star * 100}ms` }}></i>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{home.reviewsSummary}</div>
                </div>
              </div>
              
              <a 
                href="https://www.google.com/maps/place/Autogalerie+Nord+GmbH/@53.3823943,10.112712,17z/data=!4m8!3m7!1s0x47b194b2edb929d5:0x6ebe5e811dc94ee0!8m2!3d53.3823911!4d10.1152869!9m1!1b1!16s%2Fg%2F11c58qgx1f?entry=ttu&g_ep=EgoyMDI1MDgxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-external-link-line mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
                {home.reviewsSeeAll}
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {(reviews || []).map((review: any) => (
                <div key={`${review.name}-${review.time}`} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-100 to-transparent rounded-full opacity-50 transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                      <i className="ri-double-quotes-l text-gray-600 text-xl"></i>
                    </div>

                    <div className="relative z-10 pt-8">
                      {/* Stars */}
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-5 h-5 flex items-center justify-center mr-1">
                            <i 
                              className="ri-star-fill text-yellow-400 animate-bounce"
                              style={{ animationDelay: `${star * 150}ms`, animationDuration: '2s' }}
                            ></i>
                          </div>
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-gray-700 text-lg leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                        "{review.text}"
                      </p>

                      {/* Author info */}
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-600 to-red-500 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">
                            {review.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                            {review.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="mr-2">{review.reviews}</span>
                            <span className="text-gray-400">•</span>
                            <span className="ml-2">{review.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {(reviews || []).map((review: any, index: number) => (
              <button
                key={`dot-${review.name}-${review.time}`}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-125 ${
                  index === currentReview 
                    ? 'bg-gray-700 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentReview((prev) => (prev - 1 + (reviews.length || 1)) % (reviews.length || 1))}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-110"
            aria-label={home.reviewsPrevAria}
          >
            <i className="ri-arrow-left-line text-gray-600 group-hover:text-gray-800 transition-colors duration-300"></i>
          </button>
          
          <button
            onClick={() => setCurrentReview((prev) => (prev + 1) % (reviews.length || 1))}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-110"
            aria-label={home.reviewsNextAria}
          >
            <i className="ri-arrow-right-line text-gray-600 group-hover:text-gray-800 transition-colors duration-300"></i>
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-700 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700/90 to-red-600/90"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                {home.reviewsCtaTitle}
              </h3>
              <p className="text-gray-100 mb-6 text-lg">
                {home.reviewsCtaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/fahrzeuge"
                  className="group bg-white text-gray-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center justify-center transform hover:scale-105"
                >
                  <i className="ri-car-line mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
                  {home.reviewsCtaVehicles}
                </a>
                <a 
                  href="/kontakt"
                  className="group border-2 border-white text-white hover:bg-white hover:text-gray-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center justify-center transform hover:scale-105"
                >
                  <i className="ri-phone-line mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
                  {home.reviewsCtaContact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>
      <style jsx>{`
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>
    </Section>
  );
}