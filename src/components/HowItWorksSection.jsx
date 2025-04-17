import React from "react";
import { howItWorks } from "../data";

function HowItWorksSection() {
  return (
    <div className=" flex flex-col gap-10 py-16 max-sm:py-5 max-sm:gap-5 ">
      <h2
        className="text-center text-4xl max-sm:text-2xl font-bold  "
        data-aos="fade-up"
      >
        How It Works
      </h2>
      <div className="flex  gap-10 justify-center items-center max-sm:flex-col w-[90%] mx-auto max-sm:gap-5  py-10 max-sm:py-5 ">
        {howItWorks.map((card, index) => (
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
    </div>
  );
}

export default HowItWorksSection;
