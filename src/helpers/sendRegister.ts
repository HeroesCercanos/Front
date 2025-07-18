import { API_BASE_URL } from "@/config/api";
import { IRegisterProps, IRegisterResponse } from "@/interfaces/AuthInterfaces/register.interfaces";

export const sendRegister = async (
  newUser: IRegisterProps
): Promise<IRegisterResponse | null> => {
  try {
      const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
  } catch (error: any) {
    alert(error.message); 
    return null;
  }
};

