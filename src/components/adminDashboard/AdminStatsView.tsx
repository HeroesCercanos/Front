"use client";

import { useEffect, useState } from "react";
import { Flag, MapPin, DollarSign } from "lucide-react";
import AdminStatsCard from "./AdminStatsCard";
import { getTotalDonations } from "@/helpers/getTotalDonations";
import { getCampaigns } from "@/helpers/getCampaigns";
import { getIncidentReports } from "@/helpers/getIncidentReports";

const AdminStatsView = () => {
  const [totalDonations, setTotalDonations] = useState<number | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<number>(0);
  const [incidentCount, setIncidentCount] = useState<number>(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [total, campaigns, incidents] = await Promise.all([
        getTotalDonations(),
        getCampaigns(),
        getIncidentReports(),
      ]);

      const now = new Date();
      const active = campaigns.filter((c: any) => new Date(c.endDate) >= now);
      const activeReports = incidents.filter((r: any) => r.status === "activo");

      setActiveCampaigns(active.length);
      setTotalDonations(total);
      setIncidentCount(activeReports.length);
    } catch (error) {
      console.error("Error cargando estadísticas del admin", error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6 bg-white">
      <AdminStatsCard
        icon={<Flag size={48} />}
        label="Campañas activas"
        value={activeCampaigns}
      />
      <AdminStatsCard
        icon={<MapPin size={48} />}
        label="Reportes pendientes"
        value={incidentCount}
      />
      <AdminStatsCard
        icon={<DollarSign size={48} />}
        label="Total donaciones"
        value={totalDonations !== null ? `$${totalDonations}` : "Cargando..."}
      />
    </div>
  );
};

export default AdminStatsView;
