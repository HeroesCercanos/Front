"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import { getIncidentReports } from "@/helpers/getIncidentReports";
import { updateIncidentAction } from "@/helpers/updateIncidentAction";
import { Report, HistoryEntry } from "@/interfaces/incident.interface";

export default function AdminReports() {
  const { userData } = useAuth();
  const [activeReports, setActiveReports] = useState<Report[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionType, setActionType] = useState<"asistido" | "eliminado" | null>(null);
  const [comment, setComment] = useState("");
  const [victimName, setVictimName] = useState("");
  const [reason, setReason] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!userData) return;

      try {
        const data = await getIncidentReports(userData.token);
        const formatted = data.map((r: any) => ({
          id: r.id,
          text: `Reporte - ${new Date(r.createdAt).toLocaleDateString()} - ${r.locationDetail || "Ubicación no especificada"}`
        }));
        setActiveReports(formatted);
      } catch (err) {
        console.error("No se pudieron cargar los reportes", err);
      }
    };

    fetchReports();
  }, [userData]);

  const handleAction = (report: Report, type: "asistido" | "eliminado") => {
    setSelectedReport(report);
    setActionType(type);
    setEditIndex(null);
  };

  const confirmAction = async () => {
    if (!selectedReport || !actionType || !userData) return;

    try {
      await updateIncidentAction(
        selectedReport.id,
        actionType,
        comment,
        userData.token,
        userData.user.id
      );

      const newEntry: HistoryEntry = {
        id: selectedReport.id,
        text: selectedReport.text,
        action: actionType,
        comment,
        timestamp: new Date().toLocaleString(),
        edited: editIndex !== null,
        victimName,
        reason,
      };

      if (editIndex !== null) {
        const updated = [...history];
        updated[editIndex] = newEntry;
        setHistory(updated);
      } else {
        setHistory((prev) => [...prev, newEntry]);
        setActiveReports((prev) =>
          prev.filter((r) => r.id !== selectedReport.id)
        );
      }

      setSelectedReport(null);
      setActionType(null);
      setComment("");
      setVictimName("");
      setReason("");
      setEditIndex(null);
    } catch (error) {
      alert("Error al enviar la acción del administrador");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <section className="w-full p-6 text-black space-y-8">
        <div>
          <h2 className="text-2xl font-bold">REPORTES</h2>
          <p className="text-sm text-gray-600">GRACIAS POR TU SERVICIO</p>
        </div>

        <div className="bg-gray-200 p-4 rounded shadow-inner space-y-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">REPORTES ACTIVOS</h3>

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

        <div className="bg-gray-200 p-4 rounded shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">HISTORIAL DE ACCIONES</h3>
          {history.length === 0 ? (
            <p className="text-sm text-gray-600">Todavía no hay acciones registradas.</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-4">
              {history.map((entry, index) => (
                <li key={`${entry.id}-${index}`} className="border-b pb-3">
                  <p><strong>{entry.text}</strong></p>
                  <p>Acción: {entry.action === "asistido" ? "✅ Asistido" : "🗑️ Eliminado"}</p>
                  <p>Comentario: {entry.comment}</p>
                  {entry.edited && (
                    <p className="text-xs text-yellow-600 font-medium">🖊️ Editado</p>
                  )}
                  <p>Nombre del damnificado: {entry.victimName || "No especificado"}</p>
                  <p>Motivo: {entry.reason || "No especificado"}</p>
                  <p className="text-xs text-gray-500">{entry.timestamp}</p>
                  <button
                    className="mt-1 text-blue-600 hover:text-blue-800 text-sm focus:outline-none focus:ring-0"
                    onClick={() => {
                      setSelectedReport({ id: entry.id, text: entry.text });
                      setActionType(entry.action);
                      setComment(entry.comment);
                      setVictimName(entry.victimName || "");
                      setReason(entry.reason || "");
                      setEditIndex(index);
                    }}
                  >✏️ Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedReport && actionType && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">
                {editIndex !== null ? "Editar información del reporte" : "Agregar información del reporte"}
              </h3>
              <p className="text-sm text-gray-700">
                {editIndex !== null
                  ? `Modificando el reporte "${selectedReport.text}"`
                  : `¿Qué se hizo con el reporte "${selectedReport.text}"?`}
              </p>

              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Nombre y Apellido del damnificado"
                value={victimName}
                onChange={(e) => setVictimName(e.target.value)}
              />

              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Motivo"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 text-sm bg-gray-300 rounded"
                  onClick={() => {
                    setSelectedReport(null);
                    setActionType(null);
                    setComment("");
                    setVictimName("");
                    setReason("");
                    setEditIndex(null);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded"
                  onClick={confirmAction}
                  disabled={!comment.trim()}
                >
                  {editIndex !== null ? "Guardar cambios" : "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}



/*"use client";

import { useState } from "react";
import { CheckSquare, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import { Report, HistoryEntry } from "@/interfaces/incident.interface";

const initialReports: Report[] = [
  { id: 1, text: "Reporte 1 - 2025-07-10 - Av. Siempre Viva 123" },
  { id: 2, text: "Reporte 2 - 2025-07-09 - Calle Falsa 456" },
  { id: 3, text: "Reporte 3 - 2025-07-08 - Rivadavia 789" },
];

export default function AdminReports() {
  const [activeReports, setActiveReports] = useState<Report[]>(initialReports);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionType, setActionType] = useState<"asistido" | "eliminado" | null>(null);
  const [comment, setComment] = useState("");
  const [victimName, setVictimName] = useState("");
  const [reason, setReason] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAction = (report: Report, type: "asistido" | "eliminado") => {
    setSelectedReport(report);
    setActionType(type);
    setEditIndex(null);
  };

  const confirmAction = () => {
    if (!selectedReport || !actionType) return;

    const newEntry: HistoryEntry = {
      id: selectedReport.id,
      text: selectedReport.text,
      action: actionType,
      comment,
      timestamp: new Date().toLocaleString(),
      edited: editIndex !== null,
      victimName,
      reason,
    };

    if (editIndex !== null) {
      const updated = [...history];
      updated[editIndex] = newEntry;
      setHistory(updated);
    } else {
      setHistory((prev) => [...prev, newEntry]);
      setActiveReports((prev) => prev.filter((r) => r.id !== selectedReport.id));
    }

    // Limpiar estados
    setSelectedReport(null);
    setActionType(null);
    setComment("");
    setVictimName("");
    setReason("");
    setEditIndex(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <section className="w-full p-6 text-black space-y-8">
        <div>
          <h2 className="text-2xl font-bold">REPORTES</h2>
          <p className="text-sm text-gray-600">GRACIAS POR TU SERVICIO</p>
        </div>

        <div className="bg-gray-200 p-4 rounded shadow-inner space-y-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">REPORTES ACTIVOS</h3>

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

        <div className="bg-gray-200 p-4 rounded shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">HISTORIAL DE ACCIONES</h3>
          {history.length === 0 ? (
            <p className="text-sm text-gray-600">Todavía no hay acciones registradas.</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-4">
              {history.map((entry, index) => (
                <li key={`${entry.id}-${index}`} className="border-b pb-3">
                  <p><strong>{entry.text}</strong></p>
                  <p>Acción: {entry.action === "asistido" ? "✅ Asistido" : "🗑️ Eliminado"}</p>
                  <p>Comentario: {entry.comment}</p>
                  {entry.edited && (
                    <p className="text-xs text-yellow-600 font-medium">🖊️ Editado</p>
                  )}
                  <p>Nombre del damnificado: {entry.victimName || "No especificado"}</p>
                  <p>Motivo: {entry.reason || "No especificado"}</p>
                  <p className="text-xs text-gray-500">{entry.timestamp}</p>
                  <button
                    className="mt-1 text-blue-600 hover:text-blue-800 text-sm focus:outline-none focus:ring-0"
                    onClick={() => {
                      setSelectedReport({ id: entry.id, text: entry.text });
                      setActionType(entry.action);
                      setComment(entry.comment);
                      setVictimName(entry.victimName || "");
                      setReason(entry.reason || "");
                      setEditIndex(index);
                    }}
                  >✏️ Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

         {selectedReport && actionType && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">
                {editIndex !== null ? "Editar información del reporte" : "Agregar información del reporte"}
              </h3>
              <p className="text-sm text-gray-700">
                {editIndex !== null
                  ? `Modificando el reporte "${selectedReport.text}"`
                  : `¿Qué se hizo con el reporte "${selectedReport.text}"?`}
              </p>

              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Nombre y Apellido del damnificado"
                value={victimName}
                onChange={(e) => setVictimName(e.target.value)}
              />

              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Motivo"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 text-sm bg-gray-300 rounded"
                  onClick={() => {
                    setSelectedReport(null);
                    setActionType(null);
                    setComment("");
                    setVictimName("");
                    setReason("");
                    setEditIndex(null);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded"
                  onClick={confirmAction}
                  disabled={!comment.trim()}
                >
                  {editIndex !== null ? "Guardar cambios" : "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}*/
