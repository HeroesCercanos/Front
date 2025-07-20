"use client";

import { useAuth } from "@/context/AuthContext";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React from "react";

const LogOutButton = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUserData(null);

    toast.success("Sesión cerrada correctamente");
    router.push("/");
  };

  const showConfirmLogout = () => {
    toast.custom((t) => (
      <div
        className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${t.visible ? "animate-enter" : "animate-leave"
          }`}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          ¿Estás seguro?
        </h2>
        <p className="text-gray-600 mb-4">Vas a cerrar tu sesión actual.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleLogout();
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            Sí, cerrar sesión
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  return (
    <button
      onClick={showConfirmLogout}
      className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
    >
      <CircleX size={18} />
      <h2 className="text-sm">Cerrar sesión</h2>
    </button>
  );
};

export default LogOutButton;
