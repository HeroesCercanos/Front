import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LabelList,
} from "recharts";

interface Props {
  title: string;
  data: any[];
  dataKey: string;
  valueKey: string;
}

export const CustomizedLabelLineChart = ({ title, data, dataKey, valueKey }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 my-6">
      <h3 className="font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={valueKey}
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          >
            <LabelList dataKey={valueKey} position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
