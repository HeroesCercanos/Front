"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthProtected from "@/components/authProtected/authProtected";


const success = () => {
    const router = useRouter();
    return (
      <AuthProtected>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-80 p-6 text-center text-black">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        <p>¡Gracias por tu donación! 💛 </p>
      </h1>
      <p className="text-lg mb-6">Tu pago fue aprobado exitosamente.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer"
      >
        Volver al inicio
      </button>
    </div>
    </AuthProtected>
  );
};

export default success;
