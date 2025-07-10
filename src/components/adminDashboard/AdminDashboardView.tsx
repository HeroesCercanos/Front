"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/adminDashboard/Sidebar";
import AdminStatsView from "./AdminStatsView";
import DonationHistory from "./DonationHistory";


const AdminDashboardView = () => {
  const { userData } = useAuth();
  const router = useRouter();

  // CUANDO TENGAMOS RESUELTA LA AUTH DEL ADMIN
/*   if (!userData || userData.user?.role !== "admin") {
    router.push("/");
    return null;
  } */

  return (
    <div className="flex h-screen">
        <Sidebar/>

      <div className="flex-1 flex flex-col bg-white">
        
        <main className="p-8">
          <h2 className="text-3xl font-semibold mb-1">
           ¡Hola, admin! {/* {userData.user.name} */}
          </h2>
          <p className="text-gray-600 mb-6">GRACIAS POR TU SERVICIO</p>

          <AdminStatsView/>
          <DonationHistory />
          
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardView;
