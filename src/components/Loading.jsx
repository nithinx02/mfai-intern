import React from "react";
import { ThreeDot } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <div className="flex flex-col items-center justify-center">
        <ThreeDot
          variant="bounce"
          color="#3275b7"
          size={25}
          textSize="2xl"
          textColor="#fff"
        />
        <p className="text-[#3275b7] text-3xl mt-4  ">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
