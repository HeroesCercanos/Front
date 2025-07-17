export const getIncidentHistory = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/incident/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Error al obtener historial");
  return res.json();
};


/*export const getIncidentHistory = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/incident/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener historial");
  return res.json();
};*/
