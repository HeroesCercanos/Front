"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Trash2, Pencil } from "lucide-react";
import Sidebar from "./Sidebar";
import { Report, HistoryEntry } from "@/interfaces/incident.interface";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { updateIncidentByAdmin } from "@/helpers/updateIncidentByAdmin";
import { getIncidentReports } from "@/helpers/getIncidentReports";
import { getIncidentHistory } from "@/helpers/getIncidentHistory";

export default function AdminReports() {
  const { userData  } = useAuth();

  const [activeReports, setActiveReports] = useState<Report[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  //const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedReport, setSelectedReport] = useState<{ id: number; text: string } | null>(null);

  const [actionType, setActionType] = useState<"asistido" | "eliminado" | null>(
    null
  );
  const [comment, setComment] = useState("");
  const [victimName, setVictimName] = useState("");
  const [reason, setReason] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const fetchReports = async () => {
    if (!userData?.user || userData.user.role !== "admin") return;
     try {
      const incidents = await getIncidentReports();
      const activos = incidents.filter((i) => i.status === "activo");
      setActiveReports(activos);

      const backendHistory = await getIncidentHistory();
      const formattedHistory = backendHistory.map((entry: any) => ({
        id: entry.incident.id,
        text: `Reporte - ${entry.incident.createdAt.slice(0, 10)} - ${
          entry.incident.description || "Sin descripción"
        }`,
        action: entry.action,
        comment: entry.comment,
        timestamp: new Date(entry.createdAt).toLocaleString(),
        edited: false,
        victimName: entry.victimName,
        reason: entry.reason,
      }));
      setHistory(formattedHistory);
    } catch (error) {
      console.error("Error al traer reportes o historial:", error);
      toast.error("No se pudieron cargar los reportes o el historial");
    }
  };

  useEffect(() => {
      fetchReports();
  }, [userData]);

  const confirmAction = async () => {
    if (!selectedReport || !actionType) return;
     try {
      await updateIncidentByAdmin(selectedReport.id, {
        status: actionType,
        adminComment: comment || undefined,
        victimName: victimName || undefined,
        reason: reason || undefined,
      });

      await fetchReports();
      toast.success(
        actionType === "asistido"
          ? "✅ Reporte marcado como asistido"
          : "🗑 Reporte eliminado"
      );

      setSelectedReport(null);
      setActionType(null);
      setComment("");
      setVictimName("");
      setReason("");
      setEditIndex(null);
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
      toast.error("Error al actualizar el reporte");
    }
  };

  const handleAction = (report: Report, type: "asistido" | "eliminado") => {
    setSelectedReport(report);
    setActionType(type);
    setEditIndex(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="w-full p-6 text-black space-y-8">
        <h2 className="text-2xl font-bold">REPORTES</h2>
        <p className="text-sm text-gray-600">GRACIAS POR TU SERVICIO</p>
        <div className="bg-gray-200 p-4 rounded shadow-inner space-y-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          REPORTES ACTIVOS
        </h3>
          {activeReports.length === 0 ? (
            <p className="text-sm text-gray-600">No hay reportes activos.</p>
          ) : (
            activeReports.map((report) => (
              <div
                key={report.id}
                className="bg-white p-3 rounded flex justify-between items-center shadow"
              >
                <p className="text-sm">{report.text}</p>
                <div className="flex gap-2">
                  <CheckSquare
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                    size={20}
                    onClick={() => handleAction(report, "asistido")}
                  />
                  <Trash2
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    size={20}
                    onClick={() => handleAction(report, "eliminado")}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* HISTORIAL DE ACCIONES */}
        <div className="bg-gray-200 p-4 rounded shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            HISTORIAL DE ACCIONES
          </h3>
          {history.length === 0 ? (
            <p className="text-sm text-gray-600">
              Todavía no hay acciones registradas.
            </p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-4">
              {history.map((entry, index) => (
                <li key={`${entry.id}-${index}`} className="border-b pb-3">
                  <p>
                    <strong>{entry.text}</strong>
                  </p>
                  <p>
                    Acción:{" "}
                    {entry.action === "asistido"
                      ? "✅ Asistido"
                      : "🗑 Eliminado"}
                  </p>
                  {entry.edited && (
                    <p className="text-xs text-gray-700 font-medium">
                      🖊 Editado
                    </p>
                  )}
                  <p>Comentario: {entry.comment}</p>
                  <p>
                    Nombre del damnificado:{" "}
                    {entry.victimName || "No especificado"}
                  </p>
                  <p>Motivo: {entry.reason || "No especificado"}</p>
                  <p className="text-xs text-gray-500">{entry.timestamp}</p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReport({ id: entry.id, text: entry.text });
                      setActionType(entry.action);
                      setComment(entry.comment);
                      setVictimName(entry.victimName || "");
                      setReason(entry.reason || "");
                      setEditIndex(index);
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer transition text-sm"
                    aria-label="Editar comentario"
                  >
                    <Pencil size={16} />
                    <span>Editar</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* FORMULARIO MODAL */}
        {selectedReport && actionType && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 relative">
              <button
                onClick={() => {
                  setSelectedReport(null);
                  setActionType(null);
                  setComment("");
                  setVictimName("");
                  setReason("");
                  setEditIndex(null);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-xl"
                aria-label="Cerrar formulario"
              >
                &times;
              </button>

              <h3 className="text-lg font-bold text-center">
                {editIndex !== null
                  ? "Editar información del reporte"
                  : "Agregar información del reporte"}
              </h3>

              <p className="text-sm text-gray-700 text-center">
                {editIndex !== null
                  ? `Modificando el reporte "${selectedReport.text}"`
                  : `¿Qué se hizo con el reporte "${selectedReport.text}"?`}
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
                onClick={confirmAction}
                disabled={!comment.trim()}
                aria-label="Confirmar acción"
              >
                {editIndex !== null ? "Guardar cambios" : "Confirmar"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

