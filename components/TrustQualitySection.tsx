"use client";
import Section from "./Section";

export default function TrustQualitySection() {
  const features = [
    {
      icon: "ri-shield-check-line",
      title: "Geprüfte Fahrzeuge",
      desc: "Technisch und optisch sorgfältig geprüft – nur, was überzeugt, steht bei uns zum Verkauf."
    },
    {
      icon: "ri-user-heart-line",
      title: "Persönliche Beratung",
      desc: "Wir nehmen uns Zeit für Sie – mit Erfahrung, Fachwissen und ehrlicher Empfehlung."
    },
    {
      icon: "ri-money-euro-circle-line",
      title: "Faire Konditionen",
      desc: "Attraktive Preise, transparente Abläufe und flexible Finanzierung für eine sichere Entscheidung."
    }
  ];

  return (
    <Section title="Vertrauen. Erfahrung. Qualität." align="center" background="white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {features.map((f) => (
          <div key={f.title} className="group bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-neutral-100 rounded-lg mb-5 group-hover:bg-red-600 transition-colors duration-300">
              <i className={`${f.icon} text-2xl sm:text-3xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
              {f.title}
            </h3>
            <p className="text-muted leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}