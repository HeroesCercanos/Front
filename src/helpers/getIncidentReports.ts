export const getIncidentReports = async (token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}incidents`, {
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
};


/*export const getIncidentReports = async (token: string) => {
  try {
    const response = await fetch("https://api.heroescercanos.com/incidents", {
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

