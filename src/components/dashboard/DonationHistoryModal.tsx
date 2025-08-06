"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";
import { IDonation } from "@/interfaces/donation.interface";
import LoadingSpinner from "../common/Spinner";

interface Props {
  onClose: () => void;
}

export default function DonationHistoryModal({ onClose }: Props) {
  const { userData } = useAuth();
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/users/${userData?.user.id}/donations`,
          { credentials: "include" }
        );
        if (!res.ok) {
          throw new Error("No se pudo obtener el historial de donaciones.");
        }
        const data = await res.json();
        setDonations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.user.id) fetchDonations();
  }, [userData?.user.id]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Historial de Donaciones</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : donations.length === 0 ? (
          <p>No realizaste ninguna donación aún.</p>
        ) : (
          <ul>
            {donations.map((don, idx) => (
              <div key={don.id}>
                <li className="p-4 rounded-lg shadow-inner shadow-gray-300 flex justify-between">
                  <div>
                    <p className="font-medium">Monto: ${don.amount}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(don.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm italic text-gray-600">
                    {don.message || "Sin mensaje"}
                  </p>
                </li>
                {idx !== donations.length - 1 && (
                  <hr className="my-3 border-gray-200" />
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
