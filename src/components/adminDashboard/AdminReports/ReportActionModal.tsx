"use client";

import { FullIncident } from "@/interfaces/incident.interface";
import { X } from "lucide-react";

interface Props {
  report: FullIncident;
  isEditing: boolean;
  comment: string;
  victimName: string;
  reason: string;
  onClose: () => void;
  onConfirm: () => void;
  setComment: (value: string) => void;
  setVictimName: (value: string) => void;
  setReason: (value: string) => void;
}

export const ReportActionModal = ({
  report,
  isEditing,
  comment,
  victimName,
  reason,
  onClose,
  onConfirm,
  setComment,
  setVictimName,
  setReason,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-xl"
          aria-label="Cerrar formulario"
        >
          <X size={24} />
        </button>

        <h3 className="text-lg font-bold text-center">
          {isEditing
            ? "Editar información del reporte"
            : "Agregar información del reporte"}
        </h3>

        <p className="text-sm text-gray-700 text-center">
          {isEditing
            ? `Modificando el reporte "${report.description || report.type}"`
            : `¿Qué se hizo con el reporte de ${report.type} (${report.description || "sin comentario"})?`}
        </p>

        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="text"
          placeholder="Nombre y Apellido del damnificado"
          value={victimName}
          onChange={(e) => setVictimName(e.target.value)}
          aria-label="Nombre del damnificado"
        />

        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="text"
          placeholder="Motivo"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          aria-label="Motivo"
        />

        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
          aria-label="Comentario adicional"
        />

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          onClick={onConfirm}
          disabled={!comment.trim()}
          aria-label="Confirmar acción"
        >
          {isEditing ? "Guardar cambios" : "Confirmar"}
        </button>
      </div>
    </div>
  );
};

