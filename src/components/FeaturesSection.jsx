import React from "react";
import { cards } from "../data";
function FeaturesSection() {
  return (
    <div className="my-10 flex flex-col gap-10 py-16 max-sm:py-5 max-sm:my-5">
      <h2
        className="text-center text-4xl max-sm:text-2xl font-bold my-10 max-sm:my-5"
        data-aos="fade-down"
      >
        Instant AI-Powered Resume Feedback
      </h2>
      <div className="flex justify-center items-center gap-10 max-sm:flex-col  mx-5 ">
        {cards.map((card, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={card.delay || index * 100}
            data-aos-duration={2000}
            key={index}
            className="flex flex-col gap-2    p-8 rounded-lg items-center max-sm:px-4"
            style={{
              boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <p className="text-4xl font-bold text-green-500">
              {card.percentage}
            </p>
            <p className="text-2xl font-bold">{card.title}</p>
            <p className="text-center">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
