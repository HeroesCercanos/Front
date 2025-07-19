import { API_BASE_URL } from "@/config/api";
import { Report }       from "@/interfaces/incident.interface";

export const getIncidentReports = async (/* REMOVED: token param */): Promise<Report[]> => {
  // ADDED: credentials so the HttpOnly jwtToken cookie is sent automatically
  const response = await fetch(`${API_BASE_URL}/incident`, {
    method:      "GET",
    credentials: "include",  // ← send the cookie to the backend
    // REMOVED: Authorization header with Bearer token
    // headers: { Authorization: Bearer ${token} },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    // preserve backend message if any, else fallback
    throw new Error(payload.message || "Error al obtener los reportes");
  }

  return payload as Report[];
};

/*export const getIncidentReports = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/incident", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los reportes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener los reportes:", error);
    throw error;
  }
};*/


