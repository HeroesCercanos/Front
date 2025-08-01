import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#f87171", "#facc15", "#60a5fa", "#a78bfa",
  "#34d399", "#fbbf24", "#818cf8", "#fda4af",
];

interface Props {
  title: string;
  data: any[];
  dataKey: string;
  valueKey: string;
}

export const MixBarChart = ({ title, data, dataKey, valueKey }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 my-6">
      <h3 className="text-lg font-medium mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={35}>
          <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey={dataKey}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value: any) => [`${value}`, "Cantidad"]}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "13px",
            }}
            labelStyle={{ color: "#111827", fontWeight: 600 }}
          />
          <Bar dataKey={valueKey} radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


