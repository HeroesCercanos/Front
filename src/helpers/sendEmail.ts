
/*
export const sendRegistrationEmail = async (userData: { name: string; email: string }) => {
  try {
    const res = await fetch("/api/send-registration-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("Error al enviar el email de registro");

    return true;
  } catch (error) {
    console.error("Error enviando email de registro:", error);
    return false;
  }
};

export const sendDonationEmail = async (donationData: {
  name: string;
  email: string;
  amount: number;
}) => {
  try {
    const res = await fetch("/api/send-donation-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });

    if (!res.ok) throw new Error("Error al enviar el email de donación");

    return true;
  } catch (error) {
    console.error("Error enviando email de donación:", error);
    return false;
  }
};

export const sendIncidentEmail = async (incidentData: {
  name: string;
  email: string;
  type: string;
  location: string;
}) => {
  try {
    // 🚧 Endpoint aún no implementado, esto es temporal
    console.warn("🔧 El endpoint de email de incidente aún no está disponible.");
    
    // Simulamos éxito para que no se rompa la app
    return true;

    // Cuando esté listo, descomentá esto:
    /*
    const res = await fetch("/api/send-incident-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incidentData),
    });

    if (!res.ok) throw new Error("Error al enviar el email de incidente");

    return true;
    
  } catch (error) {
    console.error("Error enviando email de incidente:", error);
    return false;
  }
};

/*
export const sendIncidentEmail = async (incidentData: {
  name: string;
  email: string;
  type: string;
  location: string;
}) => {
  try {
    const res = await fetch("/api/send-incident-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incidentData),
    });

    if (!res.ok) throw new Error("Error al enviar el email de incidente");

    return true;
  } catch (error) {
    console.error("Error enviando email de incidente:", error);
    return false;
  }
};*/
