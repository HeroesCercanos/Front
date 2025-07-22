"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { validateIncidentReport } from "@/helpers/validateIncidentReport";
import { sendIncidentReport } from "@/helpers/sendIncidentReport";
import { IncidentReport, IncidentType } from "@/interfaces/incident.interface";
import { toast } from "react-hot-toast";
import { notifyOnIncident } from "@/helpers/sendEmailNotification";

const MapSelector = dynamic(() => import("../Map/MapSelector"), { ssr: false });


interface Props {
  onClose: (showToast?: boolean) => void;
}

export const IncidentReportForm = ({ onClose }: Props) => {
  const { userData } = useAuth();
  const [incidentType, setIncidentType] = useState<IncidentType | "">("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      setError("Debés seleccionar una ubicación en el mapa.");
      toast.error("Debés seleccionar una ubicación en el mapa.");
      return;
    }

    const report: IncidentReport = {
      type: incidentType as IncidentType,
      location,
      description: description.trim() || undefined,
    };

    const errorMessage = validateIncidentReport(report);
    if (errorMessage) {
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    toast.custom((t) => (
      <div
        className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          ¿Estás seguro?
        </h2>
        <p className="text-gray-600 mb-4">
          Vas a enviar un reporte de incidente.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              if (!userData) {
                toast.error("Debés iniciar sesión para enviar un reporte.");
                return;
              }
              try {
                await sendIncidentReport(report);
                console.log("Datos para enviar mail:", {
  name: userData.user.name,
  email: userData.user.email,
  type: incidentType,
  location: `${location.lat}, ${location.lng}`,
});

                await notifyOnIncident(
                 userData.user.name,
                 userData.user.email,
                 incidentType,
                 `${location.lat}, ${location.lng}`
                );
                toast.success("¡Reporte enviado! Gracias por tu colaboración.");
                setIncidentType("");
                setLocation(null);
                setDescription("");
                setError("");
                onClose(false);
              } catch {
                toast.error("No se pudo enviar el reporte.");
              }
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Sí, enviar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  const handleClose = () => {
    toast.custom((t) => (
      <div
        className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          ¿Cerrar formulario?
        </h2>
        <p className="text-gray-600 mb-4">Perderás los datos ingresados.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onClose();
              toast("Formulario cerrado");
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Sí, cerrar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-4 p-4 w-full max-w-md"
      aria-label="Formulario de reporte"
    >
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

        <textarea
          placeholder="(Opcional) Describí el incidente, agrega detalles de la ubicación o cualquier dato que creas necesario."
          className="mt-3 block w-full rounded border-gray-300 shadow-sm px-3 py-2 resize-y min-h-[150px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Descripción de la ubicación"
          />

      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

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
