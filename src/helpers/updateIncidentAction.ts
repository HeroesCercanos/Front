export const updateIncidentAction = async (
  id: number,
  action: "asistido" | "eliminado",
  adminCommentary: string,
  token: string,
  adminId?: number
) => {
  try {
    const res = await fetch(`https://api.heroescercanos.com/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action,
        adminCommentary,
        adminId, // opcional
      }),
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
