"use client";

import React from "react";

const DonationForm = () => {
  return (
    <form
      className="space-y-4 p-4 w-full max-w-md"
      aria-label="Formulario de donación"
    >

       <div> {/* // TODO: Acá estará MP */}
        <label htmlFor="amount" className="block font-semibold text-sm">
          Monto
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          placeholder="Ej: 5000"
          aria-label="Monto de la donación"
          aria-required="false"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold text-sm">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          rows={3}
          placeholder="Describe brevemente la donación"
          aria-label="Descripción de la donación"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        aria-label="Enviar donación"
      >
        Enviar donación
      </button>
    </form>
  );
};

export default DonationForm;
