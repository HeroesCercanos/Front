"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginGoogle = () => {
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("jwtToken", token);
            window.history.replaceState({}, document.title, window.location.pathname);
            router.push("/");
        }
    }, []);

    return null;
};

export default LoginGoogle;