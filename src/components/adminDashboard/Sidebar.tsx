"use client";

import Link from "next/link";
import { LogOut, LayoutDashboard, Flag, FileText, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  /* TODO: Chequear con COOKIES */
  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUserData(null);
    router.push("/");
  };

  return (
    <aside className="w-64 bg-black text-white h-screen flex flex-col justify-between">
      <nav className="px-6 py-8 space-y-6">

        <Link
          href="/admin"
          className="flex items-center gap-3 text-white hover:text-red-400 transition"
        >
          <LayoutDashboard size={20} />
          INICIO
        </Link>

        <Link
          href="/admin/campaigns"
          className="flex items-center gap-3 text-white hover:text-red-400 transition"
        >
          <Flag size={20} />
          CAMPAÑAS
        </Link>

        <Link
          href="/admin/reports"
          className="flex items-center gap-3 text-white hover:text-red-400 transition"
        >
          <FileText size={20} />
          REPORTES
        </Link>

        <Link
          href="/admin/training"
          className="flex items-center gap-3 text-white hover:text-red-400 transition"
        >
          <PlayCircle  size={20} />
          CAPACITACIONES
        </Link>

        

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-white hover:text-red-400 transition"
        >
          <LogOut size={20} />
          CERRAR SESIÓN
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
