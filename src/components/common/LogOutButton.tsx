"use client";

import { useAuth } from "@/context/AuthContext";
import { CircleX, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  const handleLogout = () => {
    // ✅ Limpiar token del localStorage
    localStorage.removeItem("jwtToken");

    // ✅ Limpiar cookie manualmente (setearla con fecha expirada)
  document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // ✅ Resetear el contexto
    setUserData(null);

    // ✅ Redirigir a home o landing
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
    >
      <CircleX size={18} />
      <h2 className="text-sm">Cerrar sesión</h2>
    </button>
  );
};

export default LogOutButton;
