"use client";

import React, { useEffect, useState, useRef } from "react";

interface Slide {
  image: string;      
  alt: string;           
}

interface MarketingCarouselProps {
  slides: Slide[];
  intervalMs?: number;
}

const MarketingCarousel: React.FC<MarketingCarouselProps> = ({
  slides,
  intervalMs = 5000,
}) => {
  const [current, setCurrent] = useState(0);
const timerRef = useRef<number|null>(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };


const pause = () => {
  if (timerRef.current !== null) window.clearInterval(timerRef.current);
};
const resume = () => {
  if (timerRef.current !== null) window.clearInterval(timerRef.current);
  timerRef.current = window.setInterval(next, intervalMs);
};

  useEffect(() => {
  timerRef.current = window.setInterval(next, intervalMs);

  return () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }
  };
}, [intervalMs, slides.length]);

  return (
    <section
      className="relative max-w-xs mx-auto overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="relative w-full aspect-square md:aspect-square">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1 h-1 rounded-full transition-colors ${
              i === current ? "bg-red-600" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default MarketingCarousel;
