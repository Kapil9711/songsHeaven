"use client";
import AuthComponent from "@/components/Auth";
import SimpleNavbar from "@/components/SimpleNavbar";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const user = searchParams.get("user");
    const token = searchParams.get("token");
    if (token && user) {
      Cookies.set("token", token);
      Cookies.set("user", user);
      router.push("/dashboard/songs");
    }
  }, []);
  return (
    <div>
      <SimpleNavbar />
      <AuthComponent />
    </div>
  );
};
export default Home;
