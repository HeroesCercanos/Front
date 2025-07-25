/* 'use client';

import { API_BASE_URL } from '@/config/api';
import React, { useState } from 'react';
import { notifyOnDonation } from '@/helpers/sendEmailNotification';
import { useAuth } from '@/context/AuthContext';

const DonationForm = () => {
	const { userData } = useAuth();

	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const res = await fetch(`${API_BASE_URL}/donations/create_preference`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					amount: Number(amount),
					description,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data.id) {
				throw new Error(data.message || 'Error al crear preferencia de pago');
			}
			// ✅ Enviar email de donación
			if (userData?.user) {
			await notifyOnDonation(
			userData.user.name,
			userData.user.email,
			Number(amount)
			);
			}

			// Redirigimos a MercadoPago Checkout Pro
			window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${data.id}`;
		} catch (err: any) {
			setError(err.message || 'Ocurrió un error al iniciar el pago');
		} finally {
			setLoading(false);
		}
	}; */

"use client";

import { API_BASE_URL } from "@/config/api";
import React, { useState } from "react";
/* import { useAuth } from "@/context/AuthContext"; */

const DonationForm = () => {
  /*   const { userData } = useAuth(); */

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
        credentials: "include", // ← para enviar la cookie JWT
        body: JSON.stringify({
          amount: Number(amount),
          description,
        }),
      });

      const data = await res.json();

      // Ahora comprobamos checkoutUrl en lugar de data.id
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.message || "Error al crear preferencia de pago");
      }

      // Redirigimos al checkout de MercadoPago
      // Y redirigimos con checkoutUrl
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full max-w-md">
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
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
