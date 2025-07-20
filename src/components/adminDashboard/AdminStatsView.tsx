"use client";

import { useEffect, useState } from "react";
import { Flag, MapPin, DollarSign } from "lucide-react";
import AdminStatsCard from "./AdminStatsCard";
import { getTotalDonations } from "@/helpers/getTotalDonations";

const AdminStatsView = () => {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const totalFromApi = await getTotalDonations();
      setTotal(totalFromApi);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6 bg-white">
      <AdminStatsCard icon={<Flag size={48} />} label="Campañas activas" value={3} />
      <AdminStatsCard icon={<MapPin size={48} />} label="Reportes pendientes" value={1} />
      <AdminStatsCard
        icon={<DollarSign size={48} />}
        label="Total donaciones"
        value={total !== null ? `$${total}` : "Cargando..."}
      />
    </div>
  );
};

export default AdminStatsView;
