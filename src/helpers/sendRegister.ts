import { IRegisterProps, IRegisterResponse } from "@/interfaces";

export const sendRegister = async (
  newUser: IRegisterProps
): Promise<IRegisterResponse | null> => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al registrar usuario.");
    return null;
  }
};
