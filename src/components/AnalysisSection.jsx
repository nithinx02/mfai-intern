import React from "react";
import { analysis } from "../data";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function AnalysisSection() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col gap-10 py-16 max-sm:py-5 max-sm:my-5 bg-[#F5F7FA]">
      <h2
        className="text-center text-4xl max-sm:text-2xl font-bold my-10 max-sm:m-4 tracking-tight"
        data-aos="fade-down"
      >
        Get Ready for Your Next Job Interview with AI!
      </h2>
      <div className="flex  gap-10 justify-center items-center max-sm:flex-col w-[90%] mx-auto max-sm:gap-5 ">
        {analysis.map((card, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="flex flex-col gap-2 p-8  items-center text-center flex-1  max-sm:p-4 "
          >
            <p className="text-5xl font-bold text-[#1170CD]">{card.icon}</p>
            <p className="text-xl font-bold">{card.title}</p>
            <p className="text-center text-gray-600 text-lg">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      <Button
        className="bg-[#1170CD] text-white  rounded-md  flex justify-center items-center mx-auto "
        onClick={() => navigate("/create-resume")}
      >
        Analyze your resume
      </Button>
    </div>
  );
}

export default AnalysisSection;
