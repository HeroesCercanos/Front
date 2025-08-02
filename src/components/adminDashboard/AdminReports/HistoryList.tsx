// components/HistoryList.tsx
import { Pencil } from "lucide-react";
import { HistoryEntry } from "@/interfaces/incident.interface";

interface Props {
  history: HistoryEntry[];
  onEdit: (entry: HistoryEntry, index: number) => void;
}

export const HistoryList = ({ history, onEdit }: Props) => {
  if (history.length === 0) {
    return <p className="text-sm text-gray-600">Todavía no hay acciones registradas.</p>;
  }

  return (
    <ul className="text-sm text-gray-700 space-y-4">
      {history.map((entry, index) => (
        <li key={entry.id} className="border-b pb-3">
          <p>
            <strong>{entry.text}</strong>
          </p>
          <p>
            Acción: {entry.action === "asistido" ? "✅ Asistido" : "🗑 Eliminado"}
          </p>
          {entry.edited && (
            <p className="text-xs text-gray-700 font-medium">🖊 Editado</p>
          )}
          <p>Comentario: {entry.comment}</p>
          <p>
            Nombre del damnificado: {entry.victimName || "No especificado"}
          </p>
          <p>Motivo: {entry.reason || "No especificado"}</p>
          <p className="text-xs text-gray-500">{entry.timestamp}</p>

          <button
            type="button"
            onClick={() => onEdit(entry, index)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer transition text-sm"
            aria-label="Editar comentario"
          >
            <Pencil size={16} />
            <span>Editar</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
