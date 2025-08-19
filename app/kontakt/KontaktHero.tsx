'use client';

export default function KontaktHero() {
  return (
    <section 
      className="relative h-96 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Modern%20automotive%20customer%20service%20reception%20area%20with%20professional%20consultants%20helping%20customers%2C%20bright%20welcoming%20dealership%20interior%2C%20contemporary%20office%20space%20with%20glass%20windows%2C%20friendly%20customer%20service%20environment%2C%20clean%20professional%20business%20atmosphere&width=1920&height=600&seq=contact-hero&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-red-900/40"></div>
      
      <div className="relative z-10 flex items-center h-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp">
            Kontakt
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-fadeInUp animation-delay-300">
            Nehmen Sie Kontakt mit uns auf - wir sind für Sie da
          </p>
        </div>
      </div>
    </section>
  );
}