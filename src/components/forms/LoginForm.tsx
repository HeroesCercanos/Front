"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { validateLoginForm } from "@/helpers/validateLoginRegister";
import { sendLogin } from "@/helpers/sendLogin";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

import {
  ILoginErrors,
  ILoginProps,
} from "@/interfaces/AuthInterfaces/login.interfaces";

const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<ILoginProps>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<ILoginErrors>({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);
      document.cookie = `jwtToken=${token}; path=/;`;

      try {
        type Payload = {
          sub: string;
          email: string;
          name?: string;
          role: "admin" | "user";
          exp: number;
        };

        const decoded = jwtDecode<Payload>(token);

        setUserData({
          token,
          user: {
            id: Number(decoded.sub),
            email: decoded.email,
            name: decoded.name || "",
            role: decoded.role,
            donations: [],
          },
        });

        router.push(
          `/?welcome=${encodeURIComponent(decoded.name || "usuario")}`
        );
      } catch (err) {
        console.error("Token inválido", err);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLoginForm(formValues);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      try {
        const response = await sendLogin(formValues);

        if (response && response.token) {
          const token = response.token;

          localStorage.setItem("jwtToken", token);
          document.cookie = `jwtToken=${token}; path=/;`;

          type Payload = {
            sub: string;
            email: string;
            name?: string;
            role: "admin" | "user";
            exp: number;
          };

          const decoded = jwtDecode<Payload>(token);

          setUserData({
            token,
            user: {
              id: Number(decoded.sub),
              email: decoded.email,
              name: decoded.name || "",
              role: decoded.role,
              donations: [],
            },
          });

          toast.success(`¡Bienvenido, ${decoded.name}!`, {
            icon: "🔥",
          });

          router.push("/");
        }
      } catch (error) {
        console.error("Error en login:", error);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
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
