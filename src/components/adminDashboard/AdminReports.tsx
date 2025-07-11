"use client";

import { useState } from "react";
import { CheckSquare, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar"
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

  const handleAction = (report: Report, type: "asistido" | "eliminado") => {
    setSelectedReport(report);
    setActionType(type);
  };

  const confirmAction = () => {
    if (!selectedReport || !actionType) return;

    // Guardamos en historial
    setHistory((prev) => [
      ...prev,
      {
        id: selectedReport.id,
        text: selectedReport.text,
        action: actionType,
        comment,
        timestamp: new Date().toLocaleString(),
      },
    ]);

    // Quitamos el reporte activo
    setActiveReports((prev) => prev.filter((r) => r.id !== selectedReport.id));

    // Limpiamos estados
    setSelectedReport(null);
    setActionType(null);
    setComment("");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <section className="w-full p-6 text-black space-y-8">
        <div>
          <h2 className="text-2xl font-bold">REPORTES</h2>
          <p className="text-sm text-gray-600">GRACIAS POR TU SERVICIO</p>
        </div>

        {/* Reportes activos */}
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

        {/* Historial */}
        <div className="bg-gray-200 p-4 rounded shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">HISTORIAL DE ACCIONES</h3>
          {history.length === 0 ? (
            <p className="text-sm text-gray-600">Todavía no hay acciones registradas.</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-2">
              {history.map((entry) => (
                <li key={entry.id} className="border-b pb-2">
                  <p><strong>{entry.text}</strong></p>
                  <p>Acción: {entry.action === "asistido" ? "✅ Asistido" : "🗑️ Eliminado"}</p>
                  <p>Comentario: {entry.comment}</p>
                  <p className="text-xs text-gray-500">{entry.timestamp}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal simple de comentario */}
        {selectedReport && actionType && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">Agregar comentario</h3>
              <p className="text-sm text-gray-700">
                ¿Qué se hizo con el reporte "{selectedReport.text}"?
              </p>
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
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded"
                  onClick={confirmAction}
                  disabled={!comment.trim()}
                >
                  Confirmar
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

interface Report {
  id: number;
  text: string;
}

const initialReports: Report[] = [
  { id: 1, text: "Reporte 1 - 2025-07-10 - Av. Siempre Viva 123" },
  { id: 2, text: "Reporte 2 - 2025-07-09 - Calle Falsa 456" },
  { id: 3, text: "Reporte 3 - 2025-07-08 - Rivadavia 789" },
];

const initialAssisted: Report[] = [
  { id: 4, text: "Reporte 4 - 2025-07-01 - Corrientes 1500" },
  { id: 5, text: "Reporte 5 - 2025-06-29 - San Martín 800" },
  { id: 6, text: "Reporte 6 - 2025-06-25 - Av. Belgrano 999" },
];

export default function AdminReports() {
  const [activeReports, setActiveReports] = useState<Report[]>(initialReports);
  const [assistedReports, setAssistedReports] = useState<Report[]>(initialAssisted);

  const markAsAssisted = (report: Report) => {
    setActiveReports((prev) => prev.filter((r) => r.id !== report.id));
    setAssistedReports((prev) => [...prev, report]);
  };

  const deleteReport = (id: number) => {
    setActiveReports((prev) => prev.filter((r) => r.id !== id));
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
                    aria-label="Marcar como asistido"
                    onClick={() => markAsAssisted(report)}
                  />
                  <Trash2
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    size={20}
                    aria-label="Eliminar reporte"
                    onClick={() => deleteReport(report.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-gray-200 p-4 rounded shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">REPORTES ASISTIDOS</h3>
          {assistedReports.length === 0 ? (
            <p className="text-sm text-gray-600">Aún no se asistió ningún reporte.</p>
          ) : (
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {assistedReports.map((report) => (
                <li key={report.id}>{report.text}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}


"use client";

import { CheckSquare, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";

const mockReports = [
  { id: 1, text: "Reporte 1 - 2025-07-10 - Av. Siempre Viva 123" },
  { id: 2, text: "Reporte 2 - 2025-07-09 - Calle Falsa 456" },
  { id: 3, text: "Reporte 3 - 2025-07-08 - Rivadavia 789" },
];

const assistedReports = [
  "Reporte 4 - 2025-07-01 - Corrientes 1500",
  "Reporte 5 - 2025-06-29 - San Martín 800",
  "Reporte 6 - 2025-06-25 - Av. Belgrano 999",
];

export default function AdminReports() {
  return (
     <div className="flex h-screen">
        <Sidebar/>
    <section className="w-full p-6 text-black space-y-8">
      <div>
        <h2 className="text-2xl font-bold">REPORTES</h2>
        <p className="text-sm text-gray-600">GRACIAS POR TU SERVICIO</p>
      </div>

      <div className="bg-gray-200 p-4 rounded shadow-inner space-y-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">REPORTES ACTIVOS</h3>

        {mockReports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-3 rounded flex justify-between items-center shadow"
          >
            <p className="text-sm">{report.text}</p>
            <div className="flex gap-2">
              <CheckSquare
                className="text-green-600 hover:text-green-800 cursor-pointer"
                size={20}
                aria-label="Marcar como asistido"
              />
              <Trash2
                className="text-red-600 hover:text-red-800 cursor-pointer"
                size={20}
                aria-label="Eliminar reporte"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 p-4 rounded shadow-inner">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">REPORTES ASISTIDOS</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {assistedReports.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </ul>
      </div>
    </section>
    </div>
  );
}*/
