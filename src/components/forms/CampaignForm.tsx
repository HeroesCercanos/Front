"use client";

import { useState, useEffect } from "react";
import { createCampaign } from "@/helpers/createCampaign";
import { ICampaign } from "@/interfaces/campaign.interface";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/api";

interface Props {
  onClose: () => void;
  refreshCampaigns: () => void;
  campaignToEdit?: ICampaign | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

const CreateCampaignForm = ({ onClose, refreshCampaigns, campaignToEdit }: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Fecha mínima (hoy) para el campo startDate
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (campaignToEdit) {
      setFormData({
        title: campaignToEdit.title,
        description: campaignToEdit.description || "",
        startDate: campaignToEdit.startDate,
        endDate: campaignToEdit.endDate,
      });
    }
  }, [campaignToEdit]);

  const validateField = (name: string, value: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let error = "";
    switch (name) {
      case "title":
        if (!value.trim()) error = "El título no puede estar vacío.";
        break;
      case "description":
        if (!value.trim()) error = "La descripción no puede estar vacía.";
        break;
      case "startDate":
        if (!value) error = "Seleccioná una fecha de inicio.";
        else if (new Date(value) < today)
          error = "La fecha de inicio no puede ser anterior a hoy.";
        break;
      case "endDate":
        if (!value) error = "Seleccioná una fecha de finalización.";
        else if (
          formData.startDate &&
          new Date(value) < new Date(formData.startDate)
        )
          error = "La fecha de finalización no puede ser anterior a la de inicio.";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validar todos los campos
    const validTitle = validateField("title", formData.title);
    const validDesc = validateField("description", formData.description);
    const validStart = validateField("startDate", formData.startDate);
    const validEnd = validateField("endDate", formData.endDate);
    if (!validTitle || !validDesc || !validStart || !validEnd) return;

    try {
      if (campaignToEdit) {
        const res = await fetch(
          `${API_BASE_URL}/campaigns/${campaignToEdit.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );
        if (!res.ok) throw new Error("No se pudo actualizar la campaña");
        toast.success("¡Campaña actualizada!");
      } else {
        await createCampaign(formData);
        toast.success("¡Campaña creada!");
      }
      refreshCampaigns();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar la campaña");
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
        {campaignToEdit ? "Editar campaña" : "Crear nueva campaña"}
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
          onBlur={handleBlur}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          aria-label="Título de la campaña"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title}</p>
        )}

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
          onBlur={handleBlur}
          rows={4}
          className="w-full h-32 border bg-white border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Descripción de la campaña"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}

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
              min={todayStr}
              value={formData.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Fecha de inicio"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
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
              min={formData.startDate || todayStr}
              value={formData.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Fecha de finalización"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
        aria-label={
          campaignToEdit ? "Guardar cambios" : "Crear campaña"
        }
      >
        {campaignToEdit ? "Guardar cambios" : "Crear campaña"}
      </button>
    </form>
  );
};

export default CreateCampaignForm;
