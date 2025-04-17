import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function AboutUsSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("token");
    navigate(isLoggedIn ? "/create-resume" : "/login");
  };

  return (
    <div>
      <div className="flex flex-col gap-6 py-16 max-sm:py-8 bg-[#1170CD]">
        <h2 className="text-center text-5xl max-sm:text-2xl font-bold m-10 max-sm:m-4 tracking-tight text-white">
          Join 10,000+ professionals using AI to improve their resumes and
          interview skills!
        </h2>
        <div>
          <Button
            className="!text-black bg-white rounded-md block mx-auto !w-fit hover:!text-white relative transition-all duration-700 "
            onClick={handleGetStarted}
          >
            Let's get started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;
