import React, { useState } from "react";
import Button from "./Button";
import MockupInterviewPopup from "./InterviewPop";
import { home } from "../data";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isopen, setIsopen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-[#F5F7FA] h-screen   ">
      <div className="flex  items-center justify-evenly   px-16  gap-10  max-sm:gap-5  max-sm:flex-col-reverse  max-sm:py-5 max-sm:px-2 h-[calc(100vh-75px)]">
        <div className="  flex flex-col gap-4  w-[50%] mx-auto max-sm:w-full max-sm:text-center">
          <h2 className="text-6xl font-bold max-sm:text-2xl ">
            Your AI-Powered Resume Expert
          </h2>
          <p className=" text-2xl font-normal max-sm:text-sm max-sm:text-center max-sm:m-4 ">
            Scan your resume, get instant feedback, and prepare for mock
            interviews with AI-driven insights.
          </p>
          <Button onClick={() => navigate("/create-resume")}>
            Analyze your resume
          </Button>
        </div>

        <div className="max-sm:w-[100%]   mx-auto  w-[35%]   ">
          <img src={home} alt="hero" className="w-full h-full animate-wiggle" />
        </div>
      </div>

      {isopen && <MockupInterviewPopup setIsopen={setIsopen} />}
    </div>
  );
}

export default Header;
