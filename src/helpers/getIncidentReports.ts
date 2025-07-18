export const getIncidentReports = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/incident`, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

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


