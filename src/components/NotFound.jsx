import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";
import { homeIcon, resumeIcon } from "../data";

function NotFound() {
  return (
    <div className="bg-[#F1F4FF] w-full h-screen">
      <div className="flex flex-col items-center justify-center h-screen w-3/4 mx-auto gap-6 max-sm:gap-4 max-sm:w-full max-sm:p-4 ">
        <motion.h1
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 1,
            bounce: 0.25,
          }}
          className="text-9xl font-bold max-sm:text-7xl"
        >
          Oops!
        </motion.h1>

        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 1,
            bounce: 0.25,
          }}
          className="text-8xl font-bold max-sm:text-5xl"
        >
          404
        </motion.h2>
        <p className="text-xl font-semibold text-center max-sm:text-lg max-sm:tracking-tight">
          The page you're looking for might have been moved, deleted, or just
          never got past the ATS screening. But don't worry, let's get you back
          on track!
        </p>
        <div className="flex gap-2  max-sm:gap-6 ">
          <Link
            data-aos="fade-right"
            data-aos-delay="100"
            to="/"
            className="text-blue-500 hover:text-blue-600"
          >
            <Button className="flex items-center gap-2 !p-4 !w-40 max-sm:gap-1 max-sm:text-sm max-sm:!p-3 justify-center">
              <span>
                <img src={homeIcon} alt="home" className="w-6 h-6" />
              </span>
              Home Page
            </Button>
          </Link>
          <Link
            data-aos="fade-left"
            data-aos-delay="110"
            to="/create-resume"
            className="text-blue-500 hover:text-blue-600"
          >
            <Button className="flex items-center gap-2 max-sm:gap-1 max-sm:text-sm !p-4 max-sm:!p-3 justify-center">
              <span>
                <img src={resumeIcon} alt="resume" className="w-6 h-6" />
              </span>
              Resume analyzer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
