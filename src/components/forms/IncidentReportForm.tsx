"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { validateIncidentReport } from "@/helpers/validateIncidentReport";
import { sendIncidentReport } from "@/helpers/sendIncidentReport";
import { sendIncidentEmail } from "@/helpers/sendEmail";
import { IncidentReport, IncidentType } from "@/interfaces/incident.interface";

const MapSelector = dynamic(() => import("../Map/MapSelector"), { ssr: false });

export const IncidentReportForm = () => {
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

    // 1. Enviar el reporte al backend
    await sendIncidentReport(report);

    // 2. Enviar el email
    await sendIncidentEmail({
      name: userData?.user.name || "Usuario Anónimo",
      email: userData?.user.email || "anonimo@email.com",
      type: incidentType,
      location: location ? `${location.lat}, ${location.lng}` : "No definida",
    });

    alert("¡Reporte enviado con éxito!");

    setIncidentType("");
    setLocation(null);
    setDescription("");
    setComments("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-semibold">Tipo de incidente</label>
        <select
          value={incidentType}
          onChange={(e) => setIncidentType(e.target.value as IncidentType)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccionar</option>
          <option value="incendio">Incendio</option>
          <option value="accidente">Accidente</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Ubicación</label>
        <MapSelector onSelectLocation={setLocation} />

        {location && (
          <p className="text-sm text-gray-600 mt-2">
            Lat: {location.lat.toFixed(4)} - Lng: {location.lng.toFixed(4)}
          </p>
        )}

        <input
          type="text"
          placeholder="(Opcional) Describí la ubicación: calle, referencia, etc."
          className="mt-3 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-semibold mb-1">Comentarios</label>
        <textarea
          placeholder="Comentá detalles del incidente (opcional)"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >Enviar Reporte
      </button>
    </form>
  );
};
