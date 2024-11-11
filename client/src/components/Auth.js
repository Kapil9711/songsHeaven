"use client";
import React, { useMemo, useState } from "react";
import SignUp from "./Signup";
import SignIn from "./Signin";

export const actives = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

const AuthComponent = () => {
  const [active, setActive] = useState(actives.SIGNIN);
  const ComponentObj = useMemo(() => {
    return {
      SIGNUP: <SignUp setActive={setActive} />,
      SIGNIN: <SignIn setActive={setActive} />,
    };
  }, [active]);
  return (
    <div className="md:container pt-[36px] md:mx-auto">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80")',
          }}
        />
        {ComponentObj[active]}
      </div>
    </div>
  );
};

export default AuthComponent;
