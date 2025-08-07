"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  title: string;
  data: { month: string; count: number }[];
}

export const ReportesPorMesChart = ({ title, data }: Props) => {
  const orderedData = [...data].sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 my-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={orderedData}>
          <defs>
            <linearGradient id="colorCantidadMes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value) => {
              const date = new Date(value);
              const nombreMes = date.toLocaleDateString("es-AR", {
                month: "short",
              });
              const anio = date.getFullYear().toString().slice(-2);
              return `${nombreMes} '${anio}`;
            }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              fontSize: 13,
            }}
            labelStyle={{ fontWeight: "bold" }}
            formatter={(value: any) => [`${value}`, "Cantidad"]}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#60a5fa"
            fillOpacity={1}
            fill="url(#colorCantidadMes)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

