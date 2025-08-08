"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { toast } from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { FullIncident, HistoryEntry } from "@/interfaces/incident.interface";
import { getIncidentReports } from "@/helpers/getIncidentReports";
import { getIncidentHistory } from "@/helpers/getIncidentHistory";
import { updateIncidentByAdmin } from "@/helpers/updateIncidentByAdmin";

import { ActiveReportsList } from "./ActiveReportsList";
import { HistoryList } from "./HistoryList";
import { ReportActionModal } from "./ReportActionModal";
import { HistoryFilters } from "./HistoryFilters";

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

  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

 /* const fetchReports = async () => {
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
          text: `Reporte - ${entry.incident.createdAt.slice(0, 10)} - ${entry.incident.description || "Sin descripción"}`,
          action: entry.action,
          comment: entry.comment,
          timestamp: entry.createdAt,
          edited: false,
          victimName: entry.victimName,
          reason: entry.reason,
          incidentDescription: entry.incident.description,
          incidentType: entry.incident.type,
        };
        latestHistoryEntries.set(formattedEntry.incidentId, formattedEntry);
      });

      const finalHistory = Array.from(latestHistoryEntries.values()).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setHistory(finalHistory);
    } catch (error) {
      console.error("Error al traer reportes o historial:", error);
      toast.error("No se pudieron cargar los reportes o el historial");
    }
  };*/
  const fetchReports = async () => {
  if (!userData?.user || userData.user.role !== "admin") return;

  try {
    const incidents = await getIncidentReports();
    const activos = incidents.filter((i) => i.status === "activo");
    setActiveReports(activos);

    const backendHistory = await getIncidentHistory();

    // Convertir y mapear TODAS las entradas del historial
    const fullHistory: HistoryEntry[] = backendHistory.map((entry: any) => ({
      id: entry.id,
      incidentId: entry.incident.id,
      text: `Reporte - ${entry.incident.createdAt.slice(0, 10)} - ${entry.incident.description || "Sin descripción"}`,
      action: entry.action,
      comment: entry.comment,
      timestamp: entry.createdAt,
      edited: entry.edited ?? false, //   viene del backend si se editaó
      victimName: entry.victimName,
      reason: entry.reason,
      incidentDescription: entry.incident.description,
      incidentType: entry.incident.type,
    }));

    // Ordenar por fecha más reciente primero
    const orderedHistory = fullHistory.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setHistory(orderedHistory);
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

      resetForm();
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
      toast.error("Error al actualizar el reporte");
    }
  };

  const resetForm = () => {
    setSelectedReport(null);
    setActionType(null);
    setComment("");
    setVictimName("");
    setReason("");
    setEditIndex(null);
  };

  const handleAction = (report: FullIncident, type: "asistido" | "eliminado") => {
    setSelectedReport(report);
    setActionType(type);
    setEditIndex(null);
    setComment(report.adminComment || "");
    setVictimName(report.victimName || "");
    setReason(report.reason || "");
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
    <div className="flex flex-col md:flex-row min-h-screen">
 <aside className="w-full md:w-64 bg-black text-black">
    <Sidebar />
  </aside>
        <section className="flex-1 p-6 text-black bg-gray-50 pt-9 md:pt-8">
        <h2 className="text-2xl font-bold">REPORTES</h2>
        <p className="text-sm text-gray-600 mb-8">GRACIAS POR TU SERVICIO</p>

        <div className="bg-gray-200 p-4 rounded shadow-inner space-y-4 mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">REPORTES ACTIVOS</h3>
          <ActiveReportsList reports={activeReports} onAction={handleAction} />
        </div>

        <div className="bg-gray-200 p-4 rounded shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">HISTORIAL DE ACCIONES</h3>

          <HistoryFilters
            statusFilter={statusFilter}
            startDate={startDate}
            endDate={endDate}
            setStatusFilter={setStatusFilter}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <HistoryList
            history={history.filter((entry) => {
              const matchesStatus = statusFilter === "all" || entry.action === statusFilter;
              const entryDate = new Date(entry.timestamp);
              const isAfterStart = !startDate || entryDate >= new Date(startDate);
              const isBeforeEnd = !endDate || entryDate <= new Date(endDate + "T23:59:59");
              return matchesStatus && isAfterStart && isBeforeEnd;
            })}
            onEdit={handleEditHistory}
          />
        </div>

        {selectedReport && actionType && (
          <ReportActionModal
            report={selectedReport}
            isEditing={editIndex !== null}
            comment={comment}
            victimName={victimName}
            reason={reason}
            onClose={resetForm}
            onConfirm={confirmAction}
            setComment={setComment}
            setVictimName={setVictimName}
            setReason={setReason}
          />
        )}
      </section>
    </div>
  );
}



