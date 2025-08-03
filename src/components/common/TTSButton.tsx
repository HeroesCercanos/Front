
import React, { ReactNode } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa'; 
import useSpeech from '@/helpers/useSpeech';

interface TTSButtonProps {
  text: string;
  icon?: ReactNode;
  ariaLabel?: string; 
}

const TTSButton: React.FC<TTSButtonProps> = ({ text, icon, ariaLabel }) => {
  const { speak, stop, isSpeaking } = useSpeech(text);

  return (
    <button
      onClick={isSpeaking ? stop : speak}
      disabled={isSpeaking && window.speechSynthesis.paused}
      className="p-2 rounded-full bg-red-500 hover:scale-110 text-white transition-colors duration-200"
      aria-label={ariaLabel || (isSpeaking ? 'Detener lectura' : 'Leer texto')}
    >
      {icon ? (
        <div className="flex items-center justify-center">
          {isSpeaking ? <FaStop size={24} className="mr-2" /> : null}
          {icon}
        </div>
      ) : (
        isSpeaking ? (
          <FaStop size={16} />
        ) : (
          <FaPlay size={16} />
        )
      )}
    </button>
  );
};

export default TTSButton;