import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { GithubIcon, Linkedin, User2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  name: string;
  photo: string;
  description: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

const team: TeamMember[] = [
  {
    name: 'Camila Inés Ladner',
    photo: '/Camila.jpg',
    description: 'Full Stack - Especializada en FrontEnd - Apasionada por UX/UI',
    linkedin: 'https://www.linkedin.com/in/camila-ladner/',
    github: 'https://github.com/CamilaLadner',
    portfolio: 'https://camilaladner.vercel.app/',
  },
  {
    name: 'Enzo Ibarra',
    photo: '/Enzo.jpeg',
    description: 'Full Stack - Especializado en FrontEnd',
    github: 'https://github.com/EnzoIbarra',
  },
  {
    name: 'Manuela Castro Arellano',
    photo: '/Manuela.jpeg',
    description: 'Full Stack - Especializada en BackEnd',
    linkedin: 'https://www.linkedin.com/in/manucastroa7/',
    github: 'https://github.com/manucastroa7',
  },
  {
    name: 'Mario Fuceneco',
    photo: '/Mario.jpg',
    description: 'Full Stack - Especializado en FrontEnd',
    linkedin: 'https://www.linkedin.com/in/mario-fuceneco-261949269/',
    github: 'https://github.com/Tano9703',
  },
  {
    name: 'Victoria Garay',
    photo: '/Victoria.jpg',
    description: 'Full Stack - Especializada en FrontEnd',
    linkedin: 'https://www.linkedin.com/in/victoria-mercedes-garay/',
    github: 'https://github.com/VMGaray',
  },
];

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (typeof window === 'undefined' || !isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30"
      aria-modal="true"
      role="dialog"
      aria-labelledby="about-modal-title"
    >
      <div className="relative bg-white text-black rounded-lg w-full max-w-2xl p-6 mx-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Cerrar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 id="about-modal-title" className="text-2xl font-bold mb-6 text-center">
          Acerca de nosotros
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div key={member.name} className="flex items-start space-x-4">
              <Image
                src={member.photo}
                alt={member.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{member.name}</p>
                <p className="text-sm text-gray-700 mb-2">{member.description}</p>
                <div className="flex space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="hover:text-blue-600"
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="hover:text-gray-800"
                    >
                      <GithubIcon size={24} />
                    </a>
                  )}
                  {member.portfolio && (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} Portfolio`}
                      className="hover:text-green-600"
                    >
                      <User2 size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
}
