"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientComponent() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return null;
}
