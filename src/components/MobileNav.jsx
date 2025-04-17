import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Account, dashboard, Analyse, avatar, nonProfile } from "../data";
import axios from "axios";
import Loading from "./Loading";

function MobileNav({
  isopen,
  setIsopen,
  setActiveButton,
  activeButton,
  hover,
}) {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("My Account");
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(avatar);
  //  fetch profile picture
  const fetchProfilePicture = async () => {
    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/get-profile-picture",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);
        setUserAvatar(imageUrl);
      } else {
        setUserAvatar(nonProfile);
      }
    } catch (err) {
      console.error("Error fetching profile picture:", err);
      setUserAvatar(nonProfile);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const tempEmail = decoded.email || null;
        const tempName = decoded.name || null;
        setUserEmail(tempEmail);
        if (tempName) {
          setDisplayName(tempName);
        }
        const response = await axios.get(
          "https://airesumeproapi.onrender.com/api/basic-info",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.user?.username) {
          setDisplayName(response.data.user.username);
        }

        if (response.data.user?.email) {
          setUserEmail(response.data.user.email);
        }

        localStorage.setItem(
          "userName",
          response.data.user?.username || tempName || "My Account"
        );
      } catch (error) {
        console.error("Error fetching user info:", error);
        const localStorageName = localStorage.getItem("userName");
        if (localStorageName) {
          setDisplayName(localStorageName);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchProfilePicture();
  }, [isopen]);

  if (loading) {
    <Loading />;
  }

  return (
    <div>
      {isopen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="top-0 right-0 w-full h-full bg-white shadow-2xl z-50 rounded-bl-2xl rounded-br-2xl"
        >
          <div className=" h-full flex flex-col border-t-2 border-gray-800 ">
            <div className=" p-4">
              <motion.ul className="flex flex-col gap-2 flex-1  border-gray-800 ">
                <Link to="/create-resume">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left text-[#1170CD] text-lg transition-all duration-300 hover:bg-[#D7E8FF] hover:text-[#2563EB] p-2 rounded-xl ${
                      activeButton === "/create-resume"
                        ? "bg-[#1170CD] text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveButton("/create-resume");
                      setIsopen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg">
                        <img src={Analyse} alt="" className="w-6 h-6" />
                      </span>
                      Resume Analyse
                    </div>
                  </motion.button>
                </Link>

                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left text-[#1170CD] text-lg hover:bg-[#D7E8FF] hover:text-[#2563EB] p-2 transition-all duration-300 rounded-xl ${
                      activeButton === "/dashboard"
                        ? "bg-[#1170CD] text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveButton("/dashboard");
                      setIsopen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg">
                        <img src={dashboard} alt="" className="w-6 h-6" />
                      </span>
                      Dashboard
                    </div>
                  </motion.button>
                </Link>

                <Link to="/userinfo">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left text-[#1170CD] text-lg hover:bg-[#D7E8FF] hover:text-[#2563EB] p-2 transition-all duration-300 rounded-xl ${
                      activeButton === "/userinfo"
                        ? "bg-[#1170CD] text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveButton("/userinfo");
                      setIsopen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg">
                        <img src={Account} alt="" className="w-6 h-6" />
                      </span>
                      {displayName}
                    </div>
                  </motion.button>
                </Link>
              </motion.ul>
            </div>

            {/* Footer */}
            <div className=" border-[#9CA3AF]  border-t-2">
              <div className="  flex justify-center">
                {userEmail ? (
                  <div className="text-gray-400 px-4  cursor-pointer  w-full">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="w-16 h-16 object-cover rounded-full mx-auto my-4 ">
                          {userAvatar ? (
                            <img
                              src={userAvatar}
                              alt="avatar"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <img
                                src={nonProfile}
                                alt="avatar"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className=" text-black text-2xl font-bold">
                          {displayName}
                        </p>
                        <p className="text-black text-lg">{userEmail}</p>
                      </div>
                    </div>
                    {hover && (
                      <div className="absolute top-12 mt-2 left-0 transform -translate-x-[60%] bg-[#1170CD] text-white rounded-lg shadow-lg w-32 text-center border-white">
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
                      className={`bg-[#1170CD] text-white text-2xl p-4 rounded-md hover:bg-[#0E5BAA] hover:text-white duration-300 ${
                        activeButton === "/login"
                          ? "bg-[#1170CD] text-white p-2 rounded-md"
                          : "text-[#1170CD]"
                      }`}
                      onClick={() => setActiveButton("/login")}
                    >
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MobileNav;
