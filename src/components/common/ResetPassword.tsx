"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface Props {
  token: string;
}

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (value: string): string => {
    if (value.length < 8)
      return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[A-Za-z]/.test(value)) return "Debe contener al menos una letra.";
    if (!/[0-9]/.test(value)) return "Debe contener al menos un número.";
    if (!/[^A-Za-z0-9]/.test(value))
      return "Debe contener al menos un carácter especial.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError("");

    try {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token, newPassword, confirmPassword }),
});


      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Error al restablecer");

      toast.success("🎉 Contraseña actualizada, redirigiendo al login…");

      setNewPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Restablecer contraseña
        </h2>

        {/* Input Nueva Contraseña */}
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500 cursor-pointer"
            aria-label="Mostrar u ocultar nueva contraseña"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Input Confirmar Contraseña */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500 cursor-pointer"
            aria-label="Mostrar u ocultar confirmación"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Guardando…" : "Guardar nueva contraseña"}
        </button>
      </form>
    </div>
  );
}