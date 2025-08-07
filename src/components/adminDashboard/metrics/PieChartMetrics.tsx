import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  title: string;
  data: { [key: string]: any }[];
  dataKey: string;
  valueKey: string;
}

const PieChartMetrics = ({ title, data, dataKey, valueKey }: Props) => {
  const getColor = (entry: any) => {
    const valor = entry[dataKey];

    if (dataKey === "status") {
      if (valor === "activo") return "#ef4444"; 
      if (valor === "asistido") return "#22c55e"; 
      if (valor === "eliminado") return "#9ca3af"; 
    }

    if (dataKey === "type") {
      if (valor === "incendio") return "#f97316"; 
      if (valor === "accidente") return "#facc15"; 
    }

    return "#a1a1aa"; 
  };

  const renderCustomLegend = () => (
    <ul className="mt-4 space-y-1 text-sm">
      {data.map((entry, index) => {
        const label = entry[dataKey];
        const count = entry[valueKey];
        const color = getColor(entry);
        const icon = getIcon(label);

        return (
          <li key={index} className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
            <span className="capitalize">{label}: {count}</span>
          </li>
        );
      })}
    </ul>
  );

  const getIcon = (label: string) => {
    switch (label) {
      case "activo":
        return "🔴";
      case "asistido":
        return "🟢";
      case "eliminado":
        return "⚪";
      case "incendio":
        return "🔥";
      case "accidente":
        return "🚑";
      default:
        return "📊";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 my-6">
      <h3 className="font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={dataKey}
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {renderCustomLegend()}
    </div>
  );
};

export default PieChartMetrics;
