"use client";

import Link from "next/link";
import {LayoutDashboard, Flag, FileText, PlayCircle } from "lucide-react";

const Sidebar = () => {
 
  return (
    <aside className="w-60 bg-black text-white h-screen flex flex-col justify-between">
      <nav className="px-6 py-8 space-y-6">

        <Link
          href="/admin"
          className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
        >
          <LayoutDashboard size={18} />
          <p className="text-sm">Incio</p>
        </Link>

        <Link
          href="/admin/campaigns"
          className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
        >
          <Flag size={18} />
          <p className="text-sm">Campañas</p>
        </Link>

        <Link
          href="/admin/reports"
          className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
        >
          <FileText size={18} />
          <p className="text-sm">Reportes</p>
        </Link>

        <Link
          href="/admin/training"
          className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
        >
          <PlayCircle  size={18} />
          <p className="text-sm">Capacitaciones</p>
        </Link>
        
      </nav>
    </aside>
  );
};

export default Sidebar;
