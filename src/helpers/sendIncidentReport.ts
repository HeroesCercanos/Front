import { IncidentReport } from "@/interfaces/incident.interface";

export const sendIncidentReport = async (
  report: IncidentReport,
  token: string
) => {
  try {
    const response = await fetch("http://localhost:3000/incident", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: report.type,
        latitude: report.location.lat,
        longitude: report.location.lng,
        description: report.description || "",
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el reporte");
    }

    return await response.json();
  } catch (error) {
    console.error("Error enviando reporte:", error);
    alert("Ocurrió un error al enviar el reporte.");
  }
};




/*import { IncidentReport } from "@/interfaces/incident.interface";

export const sendIncidentReport = async (
  report: IncidentReport,
  token: string,
  reporterId: number
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const body = {
    incidentType: report.type,
    latitude: report.location?.lat,
    longitude: report.location?.lng,
    locationDetail: report.description || "",
    commentaries: report.comments || "",
    reporterId: reporterId,
  };

  console.log("Enviando reporte:", body);
console.log("Token:", token);
console.log("URL:", `${baseUrl}/incidents`);


  try {
    

    const response = await fetch(`${baseUrl}/incidents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
  let errorMessage = "Error al enviar el reporte";
  try {
    const errorData = await response.json();
    errorMessage = errorData?.message || errorMessage;
  } catch (e) {
    console.error("No se pudo parsear el error como JSON", e);
  }
  throw new Error(errorMessage);
}


    return await response.json();
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    alert("Ocurrió un error al enviar el reporte.");
  }
};



import { IncidentReport } from "@/interfaces/incident.interface";

export const sendIncidentReport = async (report: IncidentReport) => {
  console.log("Simulando envío del reporte:", report);

  return new Promise((resolve) => {
    setTimeout(() => {
      alert("Simulación: reporte enviado correctamente");
      resolve({ ok: true });
    }, 1000);
  });
};

//Se usará el codigo de arriba hasta que se conecte al back, luego usaré el de aca abajo

/*import { IncidentReport } from "@/interfaces";

export const sendIncidentReport = async (report: IncidentReport) => {
  try {
    const response = await fetch("/api/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el reporte");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al enviar el reporte.");
  }
};*/
