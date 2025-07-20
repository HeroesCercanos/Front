const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const notifyOnRegister = async (name: string, email: string) => {
  try {
    await fetch(`${API}/api/send-registration-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
  } catch (err) {
    console.error("Error al enviar email de registro:", err);
  }
};

export const notifyOnDonation = async (name: string, email: string, amount: number) => {
  try {
    await fetch(`${API}/api/send-donation-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, amount }),
    });
  } catch (err) {
    console.error("Error al enviar email de donación:", err);
  }
};

export const notifyOnIncident = async (name: string, email: string, type: string, location: string) => {
  try {
    await fetch(`${API}/api/send-incident-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, type, location }),
    });
  } catch (err) {
    console.error("Error al enviar email de incidente:", err);
  }
};

