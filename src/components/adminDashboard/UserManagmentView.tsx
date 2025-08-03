"use client";

import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  totalDonated?: number;
  reportsCount?: number;
  isActive: boolean;
  createdAt: string,
}

const UserManagementView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showToggleModal, setShowToggleModal] = useState(false);

const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`, { credentials: "include" });
    const data: User[] = await res.json();

    // 1) enriquecemos con donaciones/reportes
    const enriched = await Promise.all(
      data.map(async (u) => {
        try {
          const [donRes, repRes] = await Promise.all([
            fetch(`${API_BASE_URL}/donations/user/${u.id}/history`, { credentials: "include" }),
            fetch(`${API_BASE_URL}/incident/${u.id}/history`,    { credentials: "include" }),
          ]);
          const don = await donRes.json();
          const rep = await repRes.json();
          return {
            ...u,
            totalDonated: don.total || 0,
            reportsCount: rep.length || 0,
          };
        } catch {
          return { ...u, totalDonated: 0, reportsCount: 0 };
        }
      })
    );

    enriched.sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    setUsers(enriched);
  } catch {
    toast.error("Error al traer usuarios");
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (user: User) => {
    try {
      const newRole = user.role === "admin" ? "user" : "admin";
      const res = await fetch(`${API_BASE_URL}/users/${user.id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Error al cambiar el rol");
      }
      toast.success(`Rol cambiado a ${newRole}`);
      await fetchUsers();
    } catch {
      toast.error("Error al cambiar el rol");
    }
  };

  const handleToggleActive = async () => {
    if (!selectedUser) return;
    const newStatus = !selectedUser.isActive;
    try {
      const res = await fetch(
        `${API_BASE_URL}/users/${selectedUser.id}/active`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ isActive: newStatus }),
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Error al cambiar estado");
      }
      toast.success(newStatus ? "Usuario reactivado" : "Usuario desactivado");
      setShowToggleModal(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch {
      toast.error("Error al cambiar estado de la cuenta");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-black text-white h-full">
  <Sidebar />
</div>
      <main className="flex-1 p-4 overflow-auto bg-gray-50">

        <div className="overflow-x-auto shadow rounded bg-white mb-4">
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <label htmlFor="search" className="sr-only">
              Buscar usuario
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 p-2 border rounded"
              placeholder="Buscar por nombre o email"
            />
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {filtered.map((u) => (
            <div key={u.id} className="bg-white rounded shadow p-4">
              <p className="font-medium">{u.name}</p>
              <p className="text-xs text-gray-600 mb-2">{u.email}</p>
              <p className="text-sm">
                <strong>Rol:</strong> {u.role}
              </p>
              <p className="text-sm">
                <strong>Estado:</strong>
                <span
                  className={`ml-1 px-1 rounded ${
                    u.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {u.isActive ? "Activo" : "Inactivo"}
                </span>
              </p>
              <p className="text-sm">
                <strong>Donado:</strong> ${u.totalDonated?.toFixed(2)}
              </p>
              <p className="text-sm mb-2">
                <strong>Reportes:</strong> {u.reportsCount}
              </p>
              <div className="flex flex-wrap gap-2">
                {u.isActive && (
                  <button
                    onClick={() => handleToggleRole(u)}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    {u.role === "admin" ? "Degradar" : "Promover"}
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedUser(u);
                    setShowToggleModal(true);
                  }}
                  className={`text-sm hover:underline ${
                    u.isActive ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {u.isActive ? "Desactivar" : "Reactivar"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table for md+ */}
        <div className="hidden md:block overflow-x-auto shadow rounded bg-white">
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2 hidden lg:table-cell">Total Donado</th>
                <th className="px-4 py-2 hidden lg:table-cell">Reportes</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-gray-600">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        u.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    ${u.totalDonated?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {u.reportsCount}
                  </td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    {u.isActive && (
                      <button
                        onClick={() => handleToggleRole(u)}
                        className="text-indigo-600 text-sm hover:underline"
                      >
                        {u.role === "admin" ? "Degradar" : "Promover"}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setShowToggleModal(true);
                      }}
                      className={`text-sm hover:underline ${
                        u.isActive ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {u.isActive ? "Desactivar" : "Reactivar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Toggle Modal */}
        {showToggleModal && selectedUser && (
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-medium mb-2">
                {selectedUser.isActive
                  ? "Desactivar usuario"
                  : "Reactivar usuario"}
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                {selectedUser.isActive
                  ? `Vas a desactivar a ${selectedUser.name}.`
                  : `Vas a reactivar a ${selectedUser.name}.`}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowToggleModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleToggleActive}
                  className={`px-4 py-2 rounded text-white ${
                    selectedUser.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {selectedUser.isActive ? "Desactivar" : "Reactivar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManagementView;
