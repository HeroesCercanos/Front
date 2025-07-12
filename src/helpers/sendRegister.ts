import { IRegisterProps, IRegisterResponse } from "@/interfaces/AuthInterfaces/register.interfaces";

export const sendRegister = async (
  newUser: IRegisterProps
): Promise<IRegisterResponse | null> => {
  try {
    console.log("Usuario que se enviará:", newUser);

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json(); // <-- capturamos respuesta

    if (!response.ok) {
      throw new Error(data.message || "Error al registrar usuario"); // <-- mostramos error del backend
    }

    return data;
  } catch (error: any) {
    console.error("Error en sendRegister:", error.message);
    alert(error.message); // <-- mostralo al usuario
    return null;
  }
};

