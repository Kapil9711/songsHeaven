"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NotFoundMsg = ({ error }) => {
  const router = useRouter();
  const [counter, setCounter] = useState(3);
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    const notFoundTimeOut = setTimeout(() => {
      router.push("/dashboard/songs");
    }, 3000);
    return () => {
      clearInterval(counterInterval);
      clearTimeout(notFoundTimeOut);
    };
  }, []);

  return (
    <>
      <div role="alert" className="alert alert-error mt-8 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
        <div className="flex gap-4 items-center">
          <p>Going Back In </p>
          <span className="countdown font-mono text-6xl">
            <span style={{ "--value": counter }}></span>
          </span>
        </div>
      </div>
    </>
  );
};

export default NotFoundMsg;
