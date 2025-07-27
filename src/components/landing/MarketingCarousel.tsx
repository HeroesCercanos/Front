"use client";

import React, { useEffect, useRef, useState } from "react";

interface Slide {
  image: string;
  alt: string;
}

interface MarketingCarouselProps {
  slides: Slide[];
  visibleCount?: number;
  intervalMs?: number;
}

const MarketingCarousel: React.FC<MarketingCarouselProps> = ({
  slides,
  visibleCount = 3,
  intervalMs = 5000,
}) => {
  const [start, setStart] = useState(0);
  const timerRef = useRef<number | null>(null);
  const total = slides.length;

  const nextBlock = () => {
    setStart((prev) => (prev + visibleCount) % total);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(nextBlock, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [intervalMs, visibleCount, total]);

  const pause = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
  };

  const resume = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(nextBlock, intervalMs);
  };

  // Obtener el bloque circular de slides
  const currentSlides = Array.from({ length: Math.min(visibleCount, total) }).map((_, i) =>
    slides[(start + i) % total]
  );

  return (
    <section
      className="relative w-full overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={pause}
      onMouseLeave={resume}
      role="region"
      aria-label="Carrusel de imágenes"
    >
      <div className="flex transition-transform duration-700 ease-in-out">
        {currentSlides.map((slide, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 p-1 transition-all duration-700 ease-in-out"
            style={{ width: `${100 / visibleCount}%` }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-80 object-cover rounded-lg transition-all duration-700 ease-in-out"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          pause();
          setStart((s) => (s - visibleCount + total) % total);
        }}
        className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-opacity-75 p-0.5 rounded-full hover:bg-white"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={() => {
          pause();
          nextBlock();
        }}
        className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-opacity-75 p-0.5 rounded-full hover:bg-white"
        aria-label="Siguiente"
      >
        ›
      </button>
    </section>
  );
};

export default MarketingCarousel;
