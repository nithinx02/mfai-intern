import React, { useState, useEffect } from "react";
import logo from "../assets/M logo .png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ onExit }) => {
  const [isopen, setIsopen] = useState(false);
  const [hover, setHover] = useState(false);
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setActiveButton(location.pathname);
  }, [location.pathname, isopen]);

  const email = useSelector((state) => state.user.email);
  console.log(email);
  const token = localStorage.getItem("token");
  const userEmail =
    email || (token ? JSON.parse(atob(token.split(".")[1])).email : null);

  return (
    <>
      {isopen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsopen(false)}
        />
      )}

      {/* DESKTOP MENU */}
      <div className="relative z-50">
        <nav className="sticky top-0 left-0 right-0">
          <ul
            className="flex justify-between items-center bg-white z-10 p-4  max-sm:px-4 max-sm:py-2 "
            style={{
              boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Link to="/">
              <img src={logo} alt="logo" className="w-10" />
            </Link>
            <li className="flex space-x-2 items-center max-sm:hidden">
              <Link to="/create-resume">
                <button
                  className={`text-[#1170CD] text-[18px] tracking-tight transition- p-2 rounded-md   max-lg:text-base  hover:bg-[#0E5BAA] hover:text-white duration-300 ${
                    activeButton === "/create-resume"
                      ? "bg-[#1170CD]  p-2 rounded-md text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("/create-resume")}
                >
                  Resume Analyse
                </button>
              </Link>

              {userEmail ? (
                <div
                  className="bg-blue-500 px-4 py-2 rounded-full cursor-pointer relative max-sm:hidden"
                  onClick={() => setHover(!hover)}
                >
                  <p className="text-white text-lg font-bold">
                    {userEmail.charAt(0).toUpperCase()}
                  </p>

                  {hover && (
                    <div className="absolute top-12 mt-2 left-0 transform -translate-x-[60%] bg-[#1170CD] text-white rounded-lg shadow-lg w-32 text-center border-white ">
                      <div className="absolute left-2/3 transform -translate-x-0 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#1170CD]"></div>
                      <p
                        className="py-2 border-b border-white cursor-pointer"
                        onClick={() => navigate("/accountinfo")}
                      >
                        My Account
                      </p>
                      <p
                        className="py-2 cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button
                    className={`text-[#1170CD]  text-[18px]   p-2 rounded-md   hover:bg-[#0E5BAA] hover:text-white max-lg:text-base duration-300 ${
                      activeButton === "/login"
                        ? "bg-[#1170CD] text-white p-2 rounded-md "
                        : "text-[#1170CD]"
                    }`}
                    onClick={() => setActiveButton("/login")}
                  >
                    Login
                  </button>
                </Link>
              )}
            </li>
            <li className="hidden max-sm:block">
              {!isopen ? (
                <FontAwesomeIcon
                  icon={faBars}
                  className="w-10 h-10 block max-sm:w-8 max-sm:h-8 text-[#1170CD]"
                  onClick={() => setIsopen(true)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-10 h-10 block max-sm:w-8 max-sm:h-8 text-[#1170CD]"
                  onClick={() => setIsopen(false)}
                />
              )}
            </li>
          </ul>

          {/* MOBILE MENU */}
          <MobileNav
            isopen={isopen}
            setIsopen={setIsopen}
            setActiveButton={setActiveButton}
            activeButton={activeButton}
            hover={hover}
            setHover={setHover}
          />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
