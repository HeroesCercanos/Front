import { API_BASE_URL } from "@/config/api";

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
