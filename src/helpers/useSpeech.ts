import { useState, useEffect } from 'react';

interface SpeechHook {
  speak: () => void;
  stop: () => void;
  isSpeaking: boolean;
}

const useSpeech = (text: string): SpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const newUtterance = new SpeechSynthesisUtterance(text);

      newUtterance.onstart = () => setIsSpeaking(true);
      newUtterance.onend = () => setIsSpeaking(false);
      newUtterance.onerror = (event) => {
        console.error('Error en el TTS:', event.error);
        setIsSpeaking(false);
      };

      setUtterance(newUtterance);

      return () => {
        synth.cancel();
      };
    } else {
      console.warn('La API de Web Speech no es compatible con este navegador.');
    }
  }, [text]);

  const speak = () => {
    if (utterance && !isSpeaking) {
      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
  };

  return { speak, stop, isSpeaking };
};

export default useSpeech;