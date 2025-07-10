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
}
