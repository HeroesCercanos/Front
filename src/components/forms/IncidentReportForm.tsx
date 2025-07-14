"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { validateIncidentReport } from "@/helpers/validateIncidentReport";
import { sendIncidentReport } from "@/helpers/sendIncidentReport";
import { IncidentReport, IncidentType } from "@/interfaces/incident.interface";
import { X } from "lucide-react";

const MapSelector = dynamic(() => import("../Map/MapSelector"), { ssr: false });

interface Props {
  onClose: () => void;
}

export const IncidentReportForm = ({ onClose }: Props) => {
  const { userData } = useAuth();
  const [incidentType, setIncidentType] = useState<IncidentType | "">("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const report: IncidentReport = {
      type: incidentType as IncidentType,
      location,
      description: description.trim() || undefined,
      comments: comments.trim() || undefined,
    };

    const errorMessage = validateIncidentReport(report);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    await sendIncidentReport(report);

    setIncidentType("");
    setLocation(null);
    setDescription("");
    setComments("");
    setError("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-4 p-4 w-full max-w-md"
      aria-label="Formulario de reporte"
    >
      {/* Botón de cierre (X) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        aria-label="Cerrar formulario"
      >
        &times;
      </button>

      <div>
        <label htmlFor="incidentType" className="block font-semibold text-sm">
          Tipo de incidente
        </label>
        <select
          id="incidentType"
          value={incidentType}
          onChange={(e) => setIncidentType(e.target.value as IncidentType)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          aria-label="Tipo de incidente"
          required
        >
          <option value="">Seleccionar</option>
          <option value="incendio">Incendio</option>
          <option value="accidente">Accidente</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-sm">Ubicación</label>
        <MapSelector onSelectLocation={setLocation} />

        {location && (
          <p className="text-sm text-gray-600 mt-2">
            Lat: {location.lat.toFixed(4)} - Lng: {location.lng.toFixed(4)}
          </p>
        )}

        <input
          type="text"
          placeholder="(Opcional) Describí la ubicación: calle, referencia, etc."
          className="mt-3 block w-full rounded border-gray-300 shadow-sm px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Descripción de la ubicación"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label htmlFor="comments" className="block font-semibold text-sm">
          Comentarios
        </label>
        <textarea
          id="comments"
          placeholder="Comentá detalles del incidente (opcional)"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm px-3 py-2"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          aria-label="Comentarios del incidente"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        aria-label="Enviar reporte"
      >
        Enviar reporte
      </button>
    </form>
  );
};


