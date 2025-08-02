// components/ActiveReportsList.tsx
import { CheckSquare, Trash2 } from "lucide-react";
import { FullIncident } from "@/interfaces/incident.interface";

interface Props {
  reports: FullIncident[];
  onAction: (report: FullIncident, type: "asistido" | "eliminado") => void;
}

export const ActiveReportsList = ({ reports, onAction }: Props) => {
  if (reports.length === 0) {
    return <p className="text-sm text-gray-600">No hay reportes activos.</p>;
  }

  return (
    <>
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white p-3 rounded flex justify-between items-center shadow"
        >
          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              Reporte de {report.type || "Tipo no especificado"}
            </p>
            {report.description && (
              <p className="text-sm text-gray-700">
                Comentario del usuario: {report.description}
              </p>
            )}
            {report.user?.name && (
              <p className="text-sm text-gray-700">Reportado por: {report.user.name}</p>
            )}
            <p className="text-xs text-gray-600">
              Ubicación: Lat {parseFloat(report.latitude).toFixed(4)}, Lng{" "}
              {parseFloat(report.longitude).toFixed(4)}
            </p>
            <p className="text-xs text-gray-500">
              Reportado el: {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2">
            <CheckSquare
              className="text-green-600 hover:text-green-800 cursor-pointer"
              size={20}
              onClick={() => onAction(report, "asistido")}
            />
            <Trash2
              className="text-red-600 hover:text-red-800 cursor-pointer"
              size={20}
              onClick={() => onAction(report, "eliminado")}
            />
          </div>
        </div>
      ))}
    </>
  );
};
