import React from 'react';

interface Props {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const AdminStatsCard = ({ icon, label, value }: Props) => {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl flex flex-col items-center text-center gap-3 shadow-inner w-full max-w-[280px] sm:max-w-[240px] md:max-w-xs flex-shrink">
      <div className="text-black text-4xl md:text-5xl">{icon}</div>
      <h3 className="text-base md:text-lg font-semibold text-black uppercase tracking-wide">
        {label}
      </h3>
      <p className="text-xl md:text-2xl font-bold text-black">{value}</p>
    </div>
  );
};

export default AdminStatsCard;
