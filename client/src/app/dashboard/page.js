"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/songs");
  }, []);
  return <div>This is a dashboard page</div>;
};

export default page;
