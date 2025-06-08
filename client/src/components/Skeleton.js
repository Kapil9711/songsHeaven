import React from "react";

const Skeleton = () => {
  return (
    <div className=" inline-block  animate-pulse">
      <div className="w-full">
        <div className="h-28 w-28  md:h-28 md:w-32 lg:h-32 lg:w-36 xl:h-40 xl:w-44 bg-gray-200 rounded-lg  dark:bg-gray-900" />
      </div>
    </div>
  );
};

export default Skeleton;
