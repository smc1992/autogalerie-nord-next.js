"use client";

import React from "react";

type SectionProps = {
  title?: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  background?: "white" | "muted" | "none";
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  subtitle,
  align = "center",
  background = "white",
  className = "",
  children
}: SectionProps) {
  const bgClass =
    background === "white"
      ? "bg-white"
      : background === "muted"
      ? "bg-neutral-50"
      : "";

  const textAlign = align === "center" ? "text-center" : "text-left";

  return (
    <section className={`${bgClass} py-12 sm:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {(title || subtitle) && (
          <div className={`${textAlign} mb-8 sm:mb-10`}>
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-lg sm:text-xl text-neutral-600">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}