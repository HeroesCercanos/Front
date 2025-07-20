import { API_BASE_URL } from "@/config/api";
import { IncidentReport }     from "@/interfaces/incident.interface"; // ajusta la ruta si es necesario

/**
 * Actualiza un incidente desde el panel de admin.
 * Ahora usamos cookie-based auth: eliminamos el token como parámetro
 * y enviamos la cookie HttpOnly con credentials: 'include'.
 */
export const updateIncidentByAdmin = async (
  id: string | number,
  data: {
    status: "asistido" | "eliminado";
    adminComment?: string;
    victimName?: string;
    reason?: string;
  }
  /* REMOVED: token: string */
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/incident/admin/${id}`, {
      method: "PATCH",
      // ADDED: para que el navegador envíe la cookie jwtToken HTTP-Only
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // REMOVED: Authorization header con Bearer token
        // Authorization: Bearer ${token},
      },
      body: JSON.stringify(data),
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      // mostramos el mensaje del backend si existe, o fallback genérico
      throw new Error(payload.message || "No se pudo actualizar el reporte");
    }

    return payload as IncidentReport;
  } catch (error) {
    console.error("Error al actualizar incidente:", error);
    throw error;
  }
};


/* import { API_BASE_URL } from "@/config/api";

export const updateIncidentByAdmin = async (
  id: string | number,
  data: {
    status: "asistido" | "eliminado";
    adminComment?: string;
    victimName?: string;
    reason?: string;
  },
  token: string
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/incident/admin/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "No se pudo actualizar el reporte");
    }

    return await res.json();
  } catch (error) {
    console.error("Error al actualizar incidente:", error);
    throw error;
  }
};
 */