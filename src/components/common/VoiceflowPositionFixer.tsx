'use client';

import { useEffect } from 'react';

const VoiceflowPositionFixer = () => {
  useEffect(() => {
    const adjustVoiceflowButton = () => {
      const vfBtn = document.querySelector('.vfrc-launcher') as HTMLElement;

      if (vfBtn) {
        // Posicionamos el botón más arriba y le agregamos z-index alto
        vfBtn.style.bottom = '120px'; // ajustá a gusto (default suele ser 20-40px)
        vfBtn.style.right = '20px';
        vfBtn.style.zIndex = '9999';

        // Removemos clases que puedan interferir
        vfBtn.classList.remove('vfrc-theme-light');
        return true;
      }

      return false;
    };

    // Intentamos varias veces por si aún no cargó
    const interval = setInterval(() => {
      const success = adjustVoiceflowButton();
      if (success) clearInterval(interval);
    }, 300);

    // Por si tarda mucho, cancelamos luego de 5s
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default VoiceflowPositionFixer;

