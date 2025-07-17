import { Flag, MapPin, DollarSign } from "lucide-react";
import AdminStatsCard from "./AdminStatsCard";

const AdminStatsView = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6 bg-white">
      <AdminStatsCard icon={<Flag size={48} />} label="Campañas activas" value={3} />
      <AdminStatsCard icon={<MapPin size={48} />} label="Reportes pendientes" value={1} />
      <AdminStatsCard icon={<DollarSign size={48} />} label="Total donaciones" value="$115000" />
    </div>
  );
};

export default AdminStatsView;
