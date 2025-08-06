'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportPolicyModal({ isOpen, onClose }: PolicyModalProps) {
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
      aria-labelledby="report-policy-title"
    >
      <div className="relative bg-white text-black rounded-lg w-full max-w-2xl p-6 mx-4 overflow-y-auto max-h-[90vh]">
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

        <h2 id="report-policy-title" className="text-2xl font-bold mb-6 text-center">
          Política de uso responsable del sistema de reportes
        </h2>

        <div className="space-y-4 text-sm text-gray-800">
          <p>
            En <strong>Héroes Cercanos</strong>, el sistema de reporte de incidentes existe para brindar asistencia rápida y eficiente ante emergencias reales. Es fundamental que todos los usuarios hagan un uso <strong>responsable y verídico</strong> de esta herramienta.
          </p>

          <p className="text-red-600 font-semibold">
            ⚠️ El envío de reportes falsos afecta el trabajo de los bomberos voluntarios, genera demoras y pone en riesgo vidas.
          </p>

          <p>Para evitar estos comportamientos, aplicamos la siguiente política de sanciones:</p>

          <table className="w-full border border-gray-300 text-sm text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Cantidad de reportes falsos</th>
                <th className="border px-2 py-1">Sanción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">1ª vez</td>
                <td className="border px-2 py-1">Suspensión de la cuenta por <strong>1 día</strong></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">2ª vez</td>
                <td className="border px-2 py-1">Suspensión de la cuenta por <strong>5 días</strong></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">3ª vez y siguientes</td>
                <td className="border px-2 py-1">Suspensión de la cuenta por <strong>30 días</strong></td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4">
            Un reporte será considerado <strong>falso</strong> si contiene información intencionalmente incorrecta, inventada o maliciosa.
          </p>

          <p>
            El equipo de administración evaluará cada caso antes de aplicar una sanción. En caso de reincidencia grave, se podrá aplicar una expulsión permanente del sistema.
          </p>

          <p className="text-gray-600 italic text-center mt-6">
            Al utilizar esta función, aceptás estas condiciones.
          </p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

