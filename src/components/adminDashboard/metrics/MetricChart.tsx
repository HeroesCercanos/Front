import {ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, Legend, BarChart, Bar, Cell,} from "recharts";
import CustomBarShape from "./CustomBarShape";

const COLORS = [
  "#fecaca", "#fcd34d", "#fca5a5", "#a5b4fc",
  "#93c5fd", "#fbbf24", "#f87171", "#c7d2fe",
];

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
  <div className="bg-white rounded-xl shadow p-6 my-6">
    <h3 className="font-medium mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={valueKey} shape={<CustomBarShape />}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MetricChart;
