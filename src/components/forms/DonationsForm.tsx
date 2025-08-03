"use client";

import { API_BASE_URL } from "@/config/api";
import React, { useState } from "react";

const DonationForm = () => {

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/donations/create_preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          amount: Number(amount),
          description,
        }),
      });
      const data = await res.json();
      const { checkoutUrl, preferenceId } = data;
      if (!res.ok || !checkoutUrl) {
        throw new Error(data.message || "Error al crear preferencia de pago");
      }

      console.log("Preference ID:", preferenceId);

      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2 w-full max-w-md flex flex-col">
      <div>
        <label htmlFor="amount" className="block font-semibold text-sm">
          Monto a donar
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          placeholder="Ej: 500"
          required
          min={1}
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold text-sm">
          Mensaje (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          rows={3}
          placeholder="Ej: Gracias por su trabajo 🧑‍🚒"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-full transition duration-300 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Redirigiendo..." : "Donar con MercadoPago"}
      </button>

      {error && (
        <p className="text-red-600 text-sm text-center font-medium">{error}</p>
      )}
    </form>
  );
};

export default DonationForm;
