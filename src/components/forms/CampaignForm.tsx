"use client";

import { useState } from "react";
import { createCampaign } from "@/helpers/createCampaign";

import toast from "react-hot-toast";

const CreateCampaignForm = ({
  onClose,
  refreshCampaigns,
}: {
  onClose: () => void;
  refreshCampaigns: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCampaign(formData);
      refreshCampaigns(); // ✅ actualiza la lista
      toast.success("¡Campaña creada!");
      onClose(); // ✅ cierra el modal
    } catch (err: any) {
      toast.error(err.message || "Error al crear campaña");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-7xl mx-auto bg-gray-100 p-4 md:p-8 rounded-xl shadow-md space-y-6"
      aria-labelledby="form-title"
      role="form"
    >
      <h2
        id="form-title"
        className="text-2xl md:text-3xl font-bold text-center text-black uppercase"
      >
        Crear nueva campaña
      </h2>

      <div className="flex flex-col gap-4">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          aria-required="true"
          aria-label="Título de la campaña"
          aria-describedby="title-desc"
        />
        <small id="title-desc" className="sr-only">
          Ingresá el título de la campaña
        </small>

        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          className="w-full border bg-white border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-required="true"
          aria-label="Descripción de la campaña"
          aria-describedby="description-desc"
        />
        <small id="description-desc" className="sr-only">
          Ingresá una descripción detallada de la campaña
        </small>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="text-sm font-medium text-gray-700"
            >
              Fecha de inicio
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-required="true"
              aria-label="Fecha de inicio"
              aria-describedby="start-desc"
            />
            <small id="start-desc" className="sr-only">
              Seleccioná la fecha en la que comenzará la campaña
            </small>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-700"
            >
              Fecha de finalización
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-required="true"
              aria-label="Fecha de finalización"
              aria-describedby="end-desc"
            />
            <small id="end-desc" className="sr-only">
              Seleccioná la fecha en la que finalizará la campaña
            </small>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
        aria-label="Crear campaña"
      >
        Crear campaña
      </button>
    </form>
  );
};

export default CreateCampaignForm;
