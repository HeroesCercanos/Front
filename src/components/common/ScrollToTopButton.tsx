"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > document.body.scrollHeight / 2); 
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
      className="fixed bottom-6 left-6 bg-red-600/70 hover:bg-red-700 text-white p-2 rounded-full shadow-md shadow-black/50 ring-1 ring-white z-50 transition-all backdrop-blur-md"
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
);


}
