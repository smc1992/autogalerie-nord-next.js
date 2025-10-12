"use client";
import Section from "./Section";

export default function BrandLogoGrid() {
  const brands = [
    { name: "Mercedes-Benz", slug: "mercedes" },
    { name: "Audi", slug: "audi" },
    { name: "BMW", slug: "bmw" },
    { name: "Porsche", slug: "porsche" },
    { name: "Ferrari", slug: "ferrari" },
    { name: "Škoda", slug: "skoda" },
    { name: "Volkswagen", slug: "volkswagen" }
  ];

  return (
    <Section title="Premium‑Marken. Premium‑Anspruch." align="center" background="white">
      <div className="logo-marquee py-2">
        <div className="logo-fade-left" aria-hidden="true" />
        <div className="logo-fade-right" aria-hidden="true" />
        <ul className="logo-track">
          {[...brands, ...brands].map((b, i) => (
            <li
              key={`${b.slug}-${i}`}
              className="group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white ring-1 ring-neutral-200 shadow-sm hover:shadow-md transition-colors duration-200"
              title={b.name}
              aria-label={`${b.name} Logo`}
            >
              <img
                src={`/images/brand-logos/${b.slug}.svg`}
                alt={`${b.name} Logo`}
                className="h-8 sm:h-10 md:h-12 w-auto grayscale brightness-0 contrast-125 opacity-90 transition-transform duration-200 group-hover:scale-105 group-hover:opacity-100"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}