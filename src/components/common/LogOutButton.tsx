import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUserData(null);
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative"
    >
      <LogOut size={20} />
    </button>
  );
};

export default LogOutButton;
