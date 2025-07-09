import { ILoginProps, ILoginResponse } from "@/interfaces";

export const sendLogin = async (
  credentials: ILoginProps
): Promise< ILoginResponse | undefined> => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al iniciar sesión.");
  }
};
