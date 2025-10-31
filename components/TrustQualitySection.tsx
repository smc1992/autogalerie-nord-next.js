"use client";
import Section from "./Section";
import { useLanguage } from "../context/LanguageContext";
import dictionaries from "../i18n/dictionaries";
import type { DictionaryTop } from "../i18n/dictionaries";

export default function TrustQualitySection() {
  const { dict } = useLanguage();
  const d = dict as DictionaryTop;
  const home = (dict?.home ?? dictionaries.de.home ?? {});
  const features = [
    {
      icon: "ri-shield-check-line",
      title: home.trustFeature1Title,
      desc: home.trustFeature1Desc
    },
    {
      icon: "ri-user-heart-line",
      title: home.trustFeature2Title,
      desc: home.trustFeature2Desc
    },
    {
      icon: "ri-money-euro-circle-line",
      title: home.trustFeature3Title,
      desc: home.trustFeature3Desc
    }
  ];

  return (
    <Section title={home.trustTitle} align="center" background="white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {features.map((f, index) => (
          <div key={`trust-feature-${index}`} className="group bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300">
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