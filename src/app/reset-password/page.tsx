"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "@/config/api";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, token }),
            });

            if (!res.ok) throw new Error("Error al restablecer contraseña");

            toast.success("🎉 Contraseña actualizada");
            setPassword("");
        } catch (err: any) {
            toast.error(err.message || "Error al actualizar contraseña");
        }
    };

    if (!token) {
        return <p className="text-red-600 p-4">Token inválido o faltante.</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-xl font-bold">Restablecer contraseña</h2>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                    Guardar nueva contraseña
                </button>
            </form>
        </div>
    );
}
