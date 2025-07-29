'use client';

import { useEffect } from 'react';

const VoiceflowPositionFixer = () => {
  useEffect(() => {
    const adjustVoiceflowButton = () => {
      const vfBtn = document.querySelector('.vfrc-launcher') as HTMLElement;

      if (vfBtn) {
       
        vfBtn.style.bottom = '120px'; 
        vfBtn.style.right = '20px';
        vfBtn.style.zIndex = '9999';

     
        vfBtn.classList.remove('vfrc-theme-light');
        return true;
      }

      return false;
    };


    const interval = setInterval(() => {
      const success = adjustVoiceflowButton();
      if (success) clearInterval(interval);
    }, 300);

 
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default VoiceflowPositionFixer;

