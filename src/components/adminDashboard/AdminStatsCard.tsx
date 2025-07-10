import React from 'react';

interface Props {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const AdminStatsCard = ({ icon, label, value }: Props) => {
  return (
    <div className="bg-gray-100 min-w p-6 rounded-2xl flex flex-col items-center text-center gap-2 shadow-inner w-full max-w-xs">
      <div className="text-5xl text-black">{icon}</div>
      <h3 className="text-lg font-semibold text-black uppercase tracking-wide">{label}</h3>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  );
};

export default AdminStatsCard;
