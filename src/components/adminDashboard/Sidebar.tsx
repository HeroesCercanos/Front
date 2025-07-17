"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Flag,
  FileText,
  PlayCircle,
  ArrowBigLeft,
  UserRoundSearch,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Botón hamburguesa (visible solo en mobile) */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden p-4 text-black z-50"
        aria-label="Abrir menú"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative sm:flex`}
      >
        <nav className="px-6 py-8 space-y-6 flex flex-col">
          <Link href="/admin" className="flex items-center gap-2 hover:text-red-400">
            <LayoutDashboard size={18} />
            <p className="text-sm">Inicio</p>
          </Link>
          <Link href="/admin/campaigns" className="flex items-center gap-2 hover:text-red-400">
            <Flag size={18} />
            <p className="text-sm">Campañas</p>
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-2 hover:text-red-400">
            <FileText size={18} />
            <p className="text-sm">Reportes</p>
          </Link>
          <Link href="/admin/training" className="flex items-center gap-2 hover:text-red-400">
            <PlayCircle size={18} />
            <p className="text-sm">Capacitaciones</p>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-red-400">
            <UserRoundSearch size={18} />
            <p className="text-sm">Vista del usuario</p>
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:text-red-400">
            <ArrowBigLeft size={18} />
            <p className="text-sm">Volver</p>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
