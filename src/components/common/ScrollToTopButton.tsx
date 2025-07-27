"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > document.body.scrollHeight / 2); // 👈 aparece solo si bajaste más de 100px
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
    <button
  onClick={scrollToTop}
  className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg shadow-black/50 ring-1 ring-white z-50 transition-all"
  aria-label="Volver arriba"
>
  <ArrowUp className="w-5 h-5" />
</button>

    )
  );
}
