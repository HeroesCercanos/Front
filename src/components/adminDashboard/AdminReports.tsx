
"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Trash2, Pencil } from "lucide-react";
import Sidebar from "./Sidebar";
import { FullIncident, HistoryEntry } from "@/interfaces/incident.interface";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { updateIncidentByAdmin } from "@/helpers/updateIncidentByAdmin";
import { getIncidentReports } from "@/helpers/getIncidentReports";
import { getIncidentHistory } from "@/helpers/getIncidentHistory";

export default function AdminReports() {
  const { userData } = useAuth();

  const [activeReports, setActiveReports] = useState<FullIncident[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedReport, setSelectedReport] = useState<FullIncident | null>(null);

  const [actionType, setActionType] = useState<"asistido" | "eliminado" | null>(null);
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
      const latestHistoryEntries = new Map<string, HistoryEntry>();
      const sortedHistory = backendHistory.sort(
        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      sortedHistory.forEach((entry: any) => {
       
        const formattedEntry: HistoryEntry = {
          id: entry.id,
          incidentId: entry.incident.id,
          text: `Reporte - ${entry.incident.createdAt.slice(0, 10)} - ${
            entry.incident.description || "Sin descripción"
          }`,
          action: entry.action,
          comment: entry.comment,
          timestamp: new Date(entry.createdAt).toLocaleString(),
          edited: false,
          victimName: entry.victimName,
          reason: entry.reason,
          incidentDescription: entry.incident.description,
          incidentType: entry.incident.type,
        };
        latestHistoryEntries.set(formattedEntry.incidentId, formattedEntry);
      });

      const finalHistory = Array.from(latestHistoryEntries.values());
      finalHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setHistory(finalHistory);
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
    const incidentIdToUpdate = selectedReport.id;
    try {
      await updateIncidentByAdmin(incidentIdToUpdate, {
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

  const handleAction = (report: FullIncident, type: "asistido" | "eliminado") => {
    setSelectedReport(report);
    setActionType(type);
    setEditIndex(null);
    if (report.adminComment) setComment(report.adminComment);
    if (report.victimName) setVictimName(report.victimName);
    if (report.reason) setReason(report.reason);
  };

  const handleEditHistory = (entry: HistoryEntry, index: number) => {
    const tempReport: FullIncident = {
      id: entry.incidentId,
      type: entry.incidentType,
      latitude: "0",
      longitude: "0",
      description: entry.incidentDescription,
      victimName: entry.victimName || null,
      reason: entry.reason || null,
      adminComment: entry.comment || null,
      status: entry.action,
      createdAt: entry.timestamp,
      user: {
        id: "historial-id-desconocido",
        name: "Usuario Desconocido",
      },
    };

    setSelectedReport(tempReport);
    setActionType(entry.action as "asistido" | "eliminado");
    setComment(entry.comment);
    setVictimName(entry.victimName || "");
    setReason(entry.reason || "");
    setEditIndex(index);
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
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    Reporte de {report.type || "Tipo no especificado"}
                  </p>
                  {report.description && (
                    <p className="text-sm text-gray-700">Comentario del usuario: {report.description}</p>
                  )}
                  {report.user && report.user.name && (
                    <p className="text-sm text-gray-700">Reportado por: {report.user.name}</p>
                  )}
                  <p className="text-xs text-gray-600">
                    Ubicación: Lat {parseFloat(report.latitude).toFixed(4)}, Lng {parseFloat(report.longitude).toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Reportado el: {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>

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
                <li key={entry.id} className="border-b pb-3">

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
                    onClick={() => handleEditHistory(entry, index)}
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
                  ? `Modificando el reporte "${selectedReport.description || selectedReport.type}"`
                  : `¿Qué se hizo con el reporte de ${selectedReport.type} (${selectedReport.description || 'sin comentario'})?`}
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