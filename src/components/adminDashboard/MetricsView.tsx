"use client";

import { useEffect, useState } from 'react';
import AdminStatsCard from './AdminStatsCard';
import {User, Flame, DollarSign, ChevronDown, ChevronUp} from 'lucide-react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell, LineChart, Line,
  AreaChart, Area, PieChart, Pie,} from 'recharts';
import { getDonationsMetrics } from '@/helpers/getDonationsMetrics';
import { getUsersMetrics } from '@/helpers/getUsersMetrics';
import { getReportsMetrics } from '@/helpers/getReportsMetrics';
import Sidebar from './Sidebar';

const COLORS = [
  '#fecaca', '#fcd34d', '#fca5a5', '#a5b4fc',
  '#93c5fd', '#fbbf24', '#f87171', '#c7d2fe',
];

export default function MetricsView() {
  const [openSection, setOpenSection] = useState<null | string>(null);

  const [donations, setDonations] = useState<{
    total: number;
    weekly: { date: string; total: number; count?: number }[];
    monthly: { month: string; total: number; count?: number }[];
  }>({
    total: 0,
    weekly: [],
    monthly: [],
  });

  const [users, setUsers] = useState<{
    total: number;
    daily: { semana: string; altas: number }[];
  }>({
    total: 0,
    daily: [],
  });

  const [reports, setReports] = useState<{
    total: number;
    weekly: { date: string; count: number }[];
    monthly: { month: string; count: number }[];
    byStatus: { status: string; count: number }[];
    byType: { type: string; count: number }[];
  }>({
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
        const monthlyMapped = Array.isArray(donationData.monthly)
          ? donationData.monthly.map((m: any) => ({
              month: m.month,
              total: m.total,
            }))
          : [];

        const weeklyMapped = Array.isArray(donationData.weekly)
          ? donationData.weekly.map((w: any) => ({
              date: w.date,
              total: w.total,
            }))
          : [];

        setDonations({
          total: donationData?.total ?? 0,
          monthly: monthlyMapped,
          weekly: weeklyMapped,
        });

        const userData = await getUsersMetrics();

        const dailyFormatted = Array.isArray(userData.daily)
          ? userData.daily.map((item: any) => ({
              semana: new Date(item.date).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
              }),
              altas: item.count,
            }))
          : [];

        setUsers({
          total: userData?.total || 0,
          daily: dailyFormatted,
        });

        // 👉 NUEVO: métricas de reportes
        const reportData = await getReportsMetrics();
      
        setReports({
          total: reportData.total?.total || 0,
          weekly: reportData.weekly || [],
          monthly: reportData.monthly || [],
          byStatus: reportData.byStatus || [],
          byType: reportData.byType || [],
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
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        <h2 className="text-2xl font-bold mb-10">Panel de Métricas</h2>

        {[
          {
            id: 'donaciones',
            title: 'Donaciones',
            content: (
              <>
                <div className="flex flex-wrap gap-4">
                  <AdminStatsCard icon={<DollarSign />} label="Total Recaudado" value={`$${donations.total}`} />
                </div>
                <div className="mt-6 space-y-6">
                  <MetricChart
                    title="Donaciones por mes"
                    data={donations.monthly.map((m: any) => ({
                      mes: m.month,
                      monto: m.total,
                    }))}
                    dataKey="mes"
                    valueKey="monto"
                  />
                  <MetricChart
                    title="Donaciones por semana"
                    data={donations.weekly.map((d: any) => ({
                      semana: new Date(d.date).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'short',
                      }),
                      monto: d.total,
                    }))}
                    dataKey="semana"
                    valueKey="monto"
                  />
                </div>
              </>
            ),
          },
          {
            id: 'usuarios',
            title: 'Usuarios',
            content: (
              <>
                <div className="flex flex-wrap gap-4">
                  <AdminStatsCard icon={<User />} label="Total de Usuarios" value={users.total} />
                </div>
                <div className="mt-6">
                  <MetricChart title="Altas por semana" data={users.daily} dataKey="semana" valueKey="altas" />
                </div>
              </>
            ),
          },
          {
            id: 'reportes',
            title: 'Reportes',
            content: (
              <>
                <div className="flex flex-wrap gap-4">
                  <AdminStatsCard icon={<Flame />} label="Total de Reportes" value={reports.total} />
                </div>
                <div className="mt-6 space-y-6">
                  <MetricChart
                    title="Reportes por semana"
                    data={reports.weekly.map((r: any) => ({
                      semana: new Date(r.week).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                      }),
                      cantidad: r.count,
                    }))}
                    dataKey="semana"
                    valueKey="cantidad"
                  />
                  <MetricChart
                     title="Reportes por mes"
                     data={reports.monthly.map((m: any) => {
                    const fecha = new Date(m.month);
                    const mes = isNaN(fecha.getTime())
                    ? "Sin fecha"
                    : fecha.toLocaleDateString("es-AR", {
                    month: "short",
                    year: "numeric",
                  });

    return {
      mes,
      cantidad: m.count,
    };
  })}
  dataKey="mes"
  valueKey="cantidad"
/>

                  <MetricChart
                    title="Reportes por estado"
                    data={reports.byStatus.map((item) => ({
                    estado: item.status,
                    cantidad: item.count,
                  }))}
                    dataKey="estado"
                    valueKey="cantidad"
                  />

                  <MetricChart
                    title="Reportes por tipo"
                    data={reports.byType.map((item) => ({
                    tipo: item.type,
                    cantidad: item.count,
                 }))}
                    dataKey="tipo"
                    valueKey="cantidad"
                    />

                </div>
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
            {openSection === section.id && (
              <div className="px-6 py-4 bg-white">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



const MetricChart = ({
  title,
  data,
  dataKey,
  valueKey,
}: {
  title: string;
  data: any[];
  dataKey: string;
  valueKey: string;
}) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="font-medium mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={valueKey} shape={<CustomBarShape />}>
          {data.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const CustomBarShape = (props: any) => {
  const { x, y, width, height, fill } = props;
  const centerX = x + width / 2;
  return (
    <path
      d={`M${x},${y + height} L${centerX},${y} L${x + width},${y + height} Z`}
      fill={fill}
    />
  );
};
