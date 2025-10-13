
export default function BusinessHero() {
  return (
    <section 
      className="relative min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/images/Hero-Business.webp')`
      }}
    >
      <div className="container mx-auto px-6 pt-28 sm:pt-32 pb-20 relative z-10">
        <div className="text-center md:text-left max-w-4xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full mb-6 transform hover:scale-105 transition-all duration-300">
              Business Solutions
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Unsere <span className="text-red-400">Business-Services</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
              Von der individuellen Beratung bis zur kompletten Fuhrparkverwaltung - wir bieten Ihnen maßgeschneiderte Lösungen für Ihr Unternehmen.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap">
              <span className="flex items-center">
                Beratung vereinbaren
                <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
              </span>
            </button>
            <button className="group bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white border border-white border-opacity-30 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap">
              <span className="flex items-center">
                <i className="ri-phone-line mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
                +49 41 745 969 70
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-600 to-transparent opacity-20 rounded-full"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-bl from-blue-400 to-transparent opacity-15 rounded-full animate-pulse"></div>
    </section>
  );
}
