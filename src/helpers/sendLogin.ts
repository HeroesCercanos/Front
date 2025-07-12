import { ILoginProps } from "@/interfaces/AuthInterfaces/login.interfaces";

export const sendLogin = async (
  credentials: ILoginProps
): Promise<{ token: string } | undefined> => {
  try {
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Credenciales inválidas");
    }

    return { token: data.access_token }; // 👈 adaptamos a lo que frontend espera
  } catch (error) {
    console.error("Login error:", error);
    alert("Credenciales inválidas");
  }
};
