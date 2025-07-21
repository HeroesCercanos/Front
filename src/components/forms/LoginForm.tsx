"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/helpers/validateLoginRegister";
import { sendLogin } from "@/helpers/sendLogin";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

import {
  ILoginErrors,
  ILoginProps,
} from "@/interfaces/AuthInterfaces/login.interfaces";
import { API_BASE_URL } from "@/config/api";

const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<ILoginProps>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<ILoginErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLoginForm(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await sendLogin(formValues); // deja la cookie

      // 1) Llamo a /auth/me para actualizar userData inmediatamente
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("No autenticado tras login");
      const data = await res.json(); // { user: { … } }

      // 2) Actualizo el contexto manualmente
      setUserData({
        token: "",
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          donations: data.user.donations ?? [],
        },
      });

      // 3) Ahora sí tengo userData.user.name
      toast.success(`¡Bienvenido ${data.user.name}! 🔥`);

      // 4) Redirijo a la home o dashboard
      router.push("/");
    } catch (error: any) {
      console.error("Error en login:", error);
      toast.error(error.message || "Error de autenticación");
    }
  };
  
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-md text-black mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Iniciar sesión</h2>
      <p className="text-center text-sm text-gray-700 mb-4">
        ¡Bienvenido! <br />
        Gracias por donar, ayudar y salvar.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={formValues.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500 cursor-pointer"
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <div className="text-right text-sm">
          <a href="#" className="text-red-500 hover:underline cursor-pointer">
            <p>Olvidé mi contraseña</p>
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
        >
          Iniciar sesión
        </button>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="cursor-pointer w-full border border-gray-300 hover:bg-gray-100 text-black font-medium py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          <Image src="/google-icon.png" alt="Google" width={20} height={20} />
          Continuar con Google
        </button>

        <p className="text-center text-sm mt-2">
          No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-red-500 font-semibold hover:underline cursor-pointer"
          >
            Registrarse
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
