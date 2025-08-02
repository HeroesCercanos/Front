import React from "react";

interface Props {
  statusFilter: string;
  startDate: string;
  endDate: string;
  setStatusFilter: (value: string) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}

export const HistoryFilters = ({
  statusFilter,
  startDate,
  endDate,
  setStatusFilter,
  setStartDate,
  setEndDate,
}: Props) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Estado:</label>
        <select
          className="border rounded px-3 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="asistido">Asistido</option>
          <option value="eliminado">Eliminado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Desde:</label>
        <input
          type="date"
          className="border rounded px-3 py-1"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hasta:</label>
        <input
          type="date"
          className="border rounded px-3 py-1"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 invisible">.</label>
        <button
          className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-sm rounded"
          onClick={() => {
            setStatusFilter("all");
            setStartDate("");
            setEndDate("");
          }}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
