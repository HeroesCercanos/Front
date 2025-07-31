"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/helpers/validateLoginRegister";
import { sendLogin } from "@/helpers/sendLogin";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "@/config/api";
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
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1) Validación de formulario
    const errors = validateLoginForm(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => msg && toast.error(msg));
      return;
    }

    try {
      // 2) Intentar login
      await sendLogin(formValues);

      // 3) Intentar obtener datos del usuario
      const resMe = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });

      if (!resMe.ok) {
        // 3.a) Si el endpoint /me devuelve 401, suponemos que la cuenta está desactivada
        if (resMe.status === 401) {
          throw new Error("Usuario inactivo");
        }
        // 3.b) Otro fallo grave
        throw new Error("No autenticado tras login");
      }

      // 4) Si /me OK, parsear y guardar en contexto
      const { user } = await resMe.json();
      setUserData({
        token: "", // o donde guardes tu token
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          donations: user.donations ?? [],
        },
      });

      // 5) Toast de éxito y redirección
      toast.success(`¡Bienvenido ${user.name}! 🔥`);
      router.push("/");

    } catch (err: any) {
      // 6) Mostrar mensaje específico si es cuenta inactiva
      if (err.message === "Usuario inactivo") {
        toast.error(
          "Tu cuenta ha sido desactivada. Por favor comunícate con Héroes Cercanos a heroescercanos@gmail.com para reactivarla."
        );
      } else {
        toast.error(err.message || "Error de autenticación");
      }
      // No redirigimos en caso de error
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowForgotModal(false);
        setForgotEmail("");
      }
    };
    if (showForgotModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showForgotModal]);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      toast.error("Ingresá un email válido");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      if (!res.ok) throw new Error("No se pudo enviar el email");
      toast.success("📩 Revisa tu correo para restablecer tu contraseña");
      setShowForgotModal(false);
      setForgotEmail("");
    } catch (error: any) {
      toast.error(error.message || "Error al solicitar restablecimiento");
    }
  };

  return (
    <>
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
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Olvidé mi contraseña
            </button>
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
            ¿No tenés cuenta?{" "}
            <a
              href="/register"
              className="text-red-500 font-semibold hover:underline cursor-pointer"
            >
              Registrarse
            </a>
          </p>
        </form>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">Recuperar contraseña</h2>
            <p className="text-gray-600 text-sm mb-4">
              Ingresá tu email para enviarte un enlace de recuperación.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail("");
                  }}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
