import React from "react";

interface IMonthlyDonations {
  month: string;
  total: number;
}

// TODO: Conectar con el getDonationsByMonth del back
const mockData: IMonthlyDonations[] = [
  { month: "Abril 2025", total: 12000 },
  { month: "Mayo 2025", total: 8000 },
  { month: "Junio 2025", total: 9000 },
  { month: "Julio 2025", total: 50000 },
];

const DonationHistory = () => {
  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 shadow-md mt-8">
      <h3 className="text-lg font-bold mb-4 text-center uppercase">
        Historial de Donaciones
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm sm:text-base font-medium">
        {mockData.map((item, index) => (
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
