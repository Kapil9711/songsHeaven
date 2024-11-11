"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    if (!Cookies.get("token") && !Cookies.get("user")) {
      router.push("/");
    }
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return <>{children}</>;
};

export default PrivateRoute;
