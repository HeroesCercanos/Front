"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { validateRegisterForm } from "@/helpers/validateLoginRegister";
import { sendRegister } from "@/helpers/sendRegister";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { IRegisterErrors } from "@/interfaces/AuthInterfaces/register.interfaces";
import { notifyOnRegister } from "@/helpers/sendEmailNotification";

const RegisterForm = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<IRegisterErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // validamos solo este campo
    const errors = validateRegisterForm({
      ...formValues,
      [name]: value,
    });
    setFormErrors((prev) => ({
      ...prev,
      [name]: errors[name as keyof IRegisterErrors],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validamos todo el form
    const errors = validateRegisterForm(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => msg && toast.error(msg));
      return;
    }

    try {
      const result = await sendRegister(formValues);
      if (!result) {
        toast.error("No se pudo completar el registro. Inténtalo de nuevo.");
        return;
      }
      await notifyOnRegister(formValues.name, formValues.email);
      toast.success((result as any).message);
      router.replace("/login");
    } catch (err: any) {
      toast.error(err.message || "Hubo un error al registrar la cuenta");
    }
  };

  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-md text-black">
      <h2 className="text-2xl font-bold text-center mb-4">Crear cuenta</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formValues.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${
              formErrors.name
                ? "border-red-500 ring-red-500"
                : "focus:ring-red-500"
            }`}
            aria-label="Nombre completo"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${
              formErrors.email
                ? "border-red-500 ring-red-500"
                : "focus:ring-red-500"
            }`}
            aria-label="Email"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 pr-10 ${
              formErrors.password
                ? "border-red-500 ring-red-500"
                : "focus:ring-red-500"
            }`}
            aria-label="Contraseña"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formValues.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 pr-10 ${
              formErrors.confirmPassword
                ? "border-red-500 ring-red-500"
                : "focus:ring-red-500"
            }`}
            aria-label="Confirmar contraseña"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
            aria-label="Mostrar u ocultar confirmar contraseña"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Registrarse
        </button>

        <p className="text-center text-sm mt-2">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>

        <p className="text-xs text-center text-gray-600 mt-4">
          Gracias por sumarte a nuestra red de apoyo ❤️
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
