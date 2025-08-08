"use client";

import { useEffect, useState } from "react";
import { User, Flame, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "../Sidebar";
import AdminStatsCard from "../AdminStatsCard";
import { getDonationsMetrics } from "@/helpers/getDonationsMetrics";
import { getUsersMetrics } from "@/helpers/getUsersMetrics";
import { getReportsMetrics } from "@/helpers/getReportsMetrics";
import { DonationMetrics, UserMetrics, ReportMetrics } from "@/interfaces/metrics.interface";
import PieChartMetrics from "./PieChartMetrics";
import { CustomizedLabelLineChart } from "./CustomizedLabelLineChart";
import { ReportesPorMesChart } from "./ReportesPorMesChart";
import { ReportesPorSemanaChart } from "./ReportesPorSemanaChart";

export default function MetricsView() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const [donations, setDonations] = useState<DonationMetrics>({
    total: 0,
    weekly: [],
    monthly: [],
  });

  const [users, setUsers] = useState<UserMetrics>({
    total: 0,
    daily: [],
  });

  const [reports, setReports] = useState<ReportMetrics>({
    total: 0,
    weekly: [],
    monthly: [],
    byStatus: [],
    byType: [],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const donationData = await getDonationsMetrics();
        const userData = await getUsersMetrics();
        const reportData = await getReportsMetrics();


        setDonations({
          total: donationData?.total ?? 0,
          weekly: donationData?.weekly ?? [],
          monthly: donationData?.monthly ?? [],
        });

        setUsers({
          total: userData?.total ?? 0,
          daily: userData?.daily ?? [],
        });

        setReports({
          total: reportData?.total ?? 0,
          weekly: reportData?.weekly ?? [],
          monthly: reportData?.monthly ?? [],
          byStatus: reportData?.byStatus ?? [],
          byType: reportData?.byType ?? [],
        });
      } catch (error) {
        console.error("❌ Error al cargar métricas:", error);
      }
    };

    fetchMetrics();
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full md:w-64 bg-black text-black">
    <Sidebar />
  </aside>
      <div className="flex-1 p-4 overflow-auto bg-gray-50 pt-9 md:pt-2">
        <h2 className="text-2xl font-bold mb-10">Panel de Métricas</h2>

        {[
          {
            id: "donaciones",
            title: "Donaciones",
            content: (
              <>
                <AdminStatsCard icon={<DollarSign />} label="Total Recaudado" value={`$${donations.total}`} />
                <CustomizedLabelLineChart title="Donaciones por mes" data={donations.monthly} dataKey="month" valueKey="total" />
                <CustomizedLabelLineChart title="Donaciones por semana" data={donations.weekly} dataKey="date" valueKey="total" />
              </>
            ),
          },
          {
            id: "usuarios",
            title: "Usuarios",
            content: (
              <>
                <AdminStatsCard icon={<User />} label="Total de Usuarios" value={users.total} />
                <CustomizedLabelLineChart
                  title="Altas por semana"
                  data={users.daily.map((d) => ({
                    date: new Date(d.date).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                    }),
                    count: d.count,
                  }))}
                  dataKey="date"
                  valueKey="count"
                />
              </>
            ),
          },
          {
            id: "reportes",
            title: "Reportes",
            content: (
              <>
                <AdminStatsCard icon={<Flame />} label="Total de Reportes" value={reports.total} />
                <ReportesPorSemanaChart
                  title="Reportes por semana"
                  data={reports.weekly.map((r) => ({
                    semana: new Date(r.week).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                    }),
                    cantidad: r.count,
                  }))}
                />
                <ReportesPorMesChart title="Reportes por mes" data={reports.monthly} />
                <PieChartMetrics title="Reportes por estado" data={reports.byStatus} dataKey="status" valueKey="count" />
                <PieChartMetrics title="Reportes por tipo" data={reports.byType} dataKey="type" valueKey="count" />
              </>
            ),
          },
        ].map((section) => (
          <div key={section.id} className="mb-2 border border-gray-300 rounded-xl overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 text-left font-semibold text-lg transition"
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
              {openSection === section.id ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSection === section.id && <div className="px-6 py-4 bg-white">{section.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

