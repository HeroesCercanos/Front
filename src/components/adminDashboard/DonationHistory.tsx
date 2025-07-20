'use client';

import React, { useEffect, useState } from 'react';
import { getDonationHistory } from '@/helpers/getDonationHistory';

interface IMonthlyDonations {
  month: string;
  total: number;
}

const DonationHistory = () => {
  const [history, setHistory] = useState<IMonthlyDonations[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonationHistory();
        const formatted = data.map((item: IMonthlyDonations) => ({
          ...item,
          month: formatMonth(item.month),
        }));
        setHistory(formatted);
      } catch (err) {
        console.error('Error al cargar historial:', err);
      }
    };
    fetchData();
  }, []);

  const formatMonth = (isoMonth: string) => {
    const [year, month] = isoMonth.split('-');
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return `${meses[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 shadow-md mt-8">
      <h3 className="text-lg font-bold mb-4 text-center uppercase">
        Historial de Donaciones
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm sm:text-base font-medium">
        {history.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2 border-gray-300"
          >
            <span>{item.month}</span>
            <span className="font-semibold text-green-700">
              ${item.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
