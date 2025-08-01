'use client';

import { useEffect, useState } from 'react';
import { getIncidentReports } from '@/helpers/getIncidentReports';
import { FullIncident } from '@/interfaces/incident.interface';
import { ICampaign } from '@/interfaces/campaign.interface';
import { Heart, Clock, Flag } from 'lucide-react';
import { getCampaigns } from '@/helpers/getCampaigns';

const calcularDiasRestantes = (fechaFin: string): number => {
  const hoy = new Date();
  const fin = new Date(fechaFin);
  const diferenciaEnMs = fin.getTime() - hoy.getTime();
  return Math.ceil(diferenciaEnMs / (1000 * 60 * 60 * 24));
};

const AdminWelcome = () => {
  const [incidents, setIncidents] = useState<FullIncident[]>([]);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incidentData, campaignData] = await Promise.all([
          getIncidentReports(),
          getCampaigns(),
        ]);
        setIncidents(incidentData);
        setCampaigns(campaignData);
      } catch (error) {
        console.error("Error al cargar datos para el admin overview:", error);
      }
    };
    fetchData();
  }, []);

  const activeReports = incidents.filter((r) => r.status === 'activo');
  const activeCampaigns = campaigns.filter((c) => c.isActive === true);

  return (
    <section
      className="mt-10 p-6 bg-gray-100 rounded-xl shadow-md text-black dark:text-gray-100"
      aria-labelledby="admin-welcome-heading"
      role="region"
    >
      <header
        id="admin-welcome-heading"
        className="flex items-center gap-2 text-xl font-semibold mb-4"
      >
        <Heart className="text-red-500" aria-hidden="true" />
        <span>¿Qué hacemos hoy?</span>
      </header>

      <p
        className="mb-6 text-sm text-gray-600 dark:text-gray-300"
        aria-live="polite"
      >
        Tu labor es fundamental para que esta comunidad funcione. Te dejamos un resumen de las tareas pendientes:
      </p>

      <ul className="space-y-4 text-sm" role="list" aria-label="Lista de tareas pendientes">
        <li className="flex items-center gap-2" role="listitem">
          <Clock className="text-yellow-500" size={18} aria-hidden="true" />
          <span>
            <strong>{activeReports.length}</strong> reportes de incendio están pendientes de revisión.
          </span>
        </li>

        {activeCampaigns.length > 0 ? (
          activeCampaigns.map((camp) => {
            const daysLeft = calcularDiasRestantes(camp.endDate);
            return (
              <li key={camp.id} className="flex items-center gap-2" role="listitem">
                <Flag className="text-blue-500" size={18} aria-hidden="true" />
                <span>
                  La campaña <strong>"{camp.title}"</strong> finaliza en <strong>{daysLeft} días</strong>.
                </span>
              </li>
            );
          })
        ) : (
          <li className="text-gray-500 italic" role="listitem">
            No hay campañas activas en este momento.
          </li>
        )}
      </ul>
    </section>
  );
};

export default AdminWelcome;
