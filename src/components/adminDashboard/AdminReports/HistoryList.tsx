
/*import { Pencil } from "lucide-react";
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
  <strong>
    {(() => {
      const match = entry.text.match(/Reporte - (\d{4}-\d{2}-\d{2}) - (.+)/);
      if (match) {
        const [_, rawDate, description] = match;
        const formattedDate = new Date(rawDate).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return `Reporte - ${formattedDate} - ${description}`;
      }
      return entry.text;
    })()}
  </strong>
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
          <p className="text-xs text-gray-500">
  {new Date(entry.timestamp).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</p>


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
};*/


import { Pencil } from "lucide-react";
import { HistoryEntry } from "@/interfaces/incident.interface";

interface Props {
  history: HistoryEntry[];
  onEdit: (entry: HistoryEntry, index: number) => void;
}

export const HistoryList = ({ history, onEdit }: Props) => {
  if (history.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        Todavía no hay acciones registradas.
      </p>
    );
  }

  return (
    <ul className="text-sm text-gray-700 space-y-4">
      {history.map((entry, index) => {
  console.log("REPORTE:", entry.text, "EDITADO:", entry.edited); // ✅ Esto va a funcionar

  return (
    <li
      key={entry.id}
      className={`border-b pb-3 pl-3 rounded ${
        entry.edited
          ? "border-l-8 border-blue-500 bg-blue-100"
          : "border-l-4 border-gray-300"
      }`}
    >
      {entry.edited && (
        <p className="text-sm text-blue-800 font-bold mb-1">
          🖊 Entrada editada
        </p>
      )}

      <p>
        <strong>
          {(() => {
            const match = entry.text.match(
              /Reporte - (\d{4}-\d{2}-\d{2}) - (.+)/
            );
            if (match) {
              const [_, rawDate, description] = match;
              const formattedDate = new Date(rawDate).toLocaleDateString(
                "es-AR",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              );
              return `Reporte - ${formattedDate} - ${description}`;
            }
            return entry.text;
          })()}
        </strong>
      </p>

      <p>
        Acción:{" "}
        {entry.action === "asistido" ? "✅ Asistido" : "🗑 Eliminado"}
      </p>

      <p>
        Comentario: {entry.comment}
        {entry.edited && (
          <span className="text-gray-600 italic"> (editado)</span>
        )}
      </p>

      <p>
        Nombre del damnificado: {entry.victimName || "No especificado"}
      </p>

      <p>Motivo: {entry.reason || "No especificado"}</p>

      <p className="text-xs text-gray-500">
        {new Date(entry.timestamp).toLocaleString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </p>

      <button
        type="button"
        onClick={() => onEdit(entry, index)}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer transition text-sm mt-1"
        aria-label="Editar comentario"
      >
        <Pencil size={16} />
        <span>Editar</span>
      </button>
    </li>
  );
})}

    </ul>
  );
};

