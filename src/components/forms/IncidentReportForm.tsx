"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { validateIncidentReport } from "@/helpers/validateIncidentReport";
import { sendIncidentReport } from "@/helpers/sendIncidentReport";
import { IncidentReport, IncidentType } from "@/interfaces/incident.interface";
import { toast } from "react-hot-toast";


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
      toast.custom((t) => (
        <div className={`bg-white border border-red-300 rounded-xl shadow-lg p-4 w-[90%] max-w-md ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <h2 className="text-red-600 font-semibold mb-2">Error</h2>
          <p className="text-gray-700 text-sm">{errorMessage}</p>
        </div>
      ));
      return;
    }

    // Confirmación personalizada
    toast.custom((t) => (
      <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">¿Estás seguro?</h2>
        <p className="text-gray-600 mb-4">Vas a enviar un reporte de incidente.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await sendIncidentReport(report);
                toast.custom((t) => (
                  <div className={`bg-white border border-green-300 rounded-xl shadow-lg p-4 w-[90%] max-w-md ${t.visible ? "animate-enter" : "animate-leave"}`}>
                    <h2 className="text-green-700 font-semibold mb-2">¡Reporte enviado!</h2>
                    <p className="text-gray-700 text-sm">Gracias por tu colaboración.</p>
                  </div>
                ));

                setIncidentType("");
                setLocation(null);
                setDescription("");
                setComments("");
                setError("");
                onClose();
              } catch (err) {
                console.error(err);
                toast.custom((t) => (
                  <div className={`bg-white border border-red-300 rounded-xl shadow-lg p-4 w-[90%] max-w-md ${t.visible ? "animate-enter" : "animate-leave"}`}>
                    <h2 className="text-red-600 font-semibold mb-2">Error</h2>
                    <p className="text-gray-700 text-sm">No se pudo enviar el reporte.</p>
                  </div>
                ));
              }
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Sí, enviar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  const handleClose = () => {
    toast.custom((t) => (
      <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">¿Cerrar formulario?</h2>
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
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition"
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
      <button
        type="button"
        onClick={handleClose}
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


/*"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { validateIncidentReport } from "@/helpers/validateIncidentReport";
import { sendIncidentReport } from "@/helpers/sendIncidentReport";
import { IncidentReport, IncidentType } from "@/interfaces/incident.interface";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

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
    toast.error(errorMessage); // ✅ mostramos error con toast
    return;
  }

  // 🔒 Confirmación previa
  const confirm = window.confirm("¿Estás seguro que querés enviar este reporte?");
  if (!confirm) {
    toast("Reporte cancelado");
    return;
  }

  try {
    await sendIncidentReport(report);
    toast.success("¡Reporte enviado exitosamente!");

    // Limpiar campos
    setIncidentType("");
    setLocation(null);
    setDescription("");
    setComments("");
    setError("");
    onClose();
  } catch (err) {
    toast.error("Ocurrió un error al enviar el reporte");
    console.error(err);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-4 p-4 w-full max-w-md"
      aria-label="Formulario de reporte"
    >
      
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
};*/


