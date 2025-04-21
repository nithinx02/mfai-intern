import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faUser,
  faPhone,
  faEnvelope,
  faCircleNotch,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import { avatar } from "../data";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(avatar);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Fetch all data in parallel
        const [dashboardRes, basicInfoRes, profileImageRes] = await Promise.all(
          [
            fetch("https://airesumeproapi.onrender.com/api/dashboard", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch("https://airesumeproapi.onrender.com/api/basic-info", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch(
              "https://airesumeproapi.onrender.com/api/get-profile-picture",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]
        );

        // Handle dashboard data
        if (!dashboardRes.ok) throw new Error("Failed to fetch dashboard data");
        const dashboardData = await dashboardRes.json();
        setDashboardData(dashboardData.data || []);

        // Handle basic info
        if (!basicInfoRes.ok) throw new Error("Failed to fetch user info");
        const basicInfoData = await basicInfoRes.json();
        setUserInfo(basicInfoData.user || {});

        // Handle profile image
        if (profileImageRes.ok) {
          const imageBlob = await profileImageRes.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfileImage(imageUrl);
        } else {
          console.log("Using default avatar");
          setProfileImage(avatar);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (profileImage && profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="text-center p-8  bg-white  transition-all duration-300 max-w-md ">
          <div className="flex justify-center items-center mb-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-5xl text-red-500 animate-bounce"
            />
          </div>
          <p className="text-gray-800 font-semibold text-lg mb-2">
            An error occurred
          </p>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <Button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
           login again
          </Button>
        </div>
      </div>
    );
  if (!userInfo)
    return (
      <div className="flex items-center gap-4 justify-center h-screen">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="text-4xl text-red-500 animate-pulse"
        />{" "}
        {/* Font Awesome icon */}
        <p className="text-lg font-medium text-gray-700">
          We are unable to retrieve your user information at this time. Please
          try again later.
        </p>
      </div>
    );

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-[400px_auto] mx-10 max-sm:mx-2 max-sm:grid-cols-1 gap-10 max-sm:gap-5">
        {/* Profile Card */}
        <div className="h-auto w-auto bg-white rounded-xl mt-10 flex flex-col shadow-[0px_0px_10px_0px_#bad5ee] max-sm:m-4">
          <div className="relative border-b-4 border-[#1170CD]">
            <div className="w-24 h-24 object-cover rounded-xl mx-auto my-4 overflow-hidden max-sm:shadow-[]">
              <img
                src={profileImage}
                alt="avatar"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatar;
                }}
              />
            </div>
          </div>
          <div className="border-b-2 border-blue-700 p-4 my-2">
            <h1 className="text-2xl font-semibold text-center">
              {userInfo.username || "User Name"}
            </h1>
            <p className="text-gray-500 text-center flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-[#1170CD] w-4 h-4"
              />
              {userInfo.email}
            </p>
            <p className="text-gray-800 font-semibold text-justify">
              {userInfo.summary || "No summary available."}
            </p>
          </div>
          <div className="border-b-2 border-blue-700 p-4 flex flex-col gap-2 my-2">
            {userInfo.location && (
              <p className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
                <span className="text-gray-800 font-semibold">
                  {userInfo.location}
                </span>
              </p>
            )}
            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faUser}
                className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
              />
              <span className="text-gray-800 font-semibold">
                {userInfo.gender || "Gender not specified"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
              />
              {userInfo.linkedinLink ? (
                <a
                  href={userInfo.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-semibold"
                >
                  {userInfo.linkedinLink.slice(0, 30)}
                </a>
              ) : (
                <span className="text-gray-800 font-semibold">
                  Add LinkedIn Link
                </span>
              )}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
              />
              {userInfo.githubLink ? (
                <a
                  href={userInfo.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-semibold"
                >
                  {userInfo.githubLink.slice(0, 30)}
                </a>
              ) : (
                <span className="text-gray-800 font-semibold">
                  Add LinkedIn Link
                </span>
              )}
            </p>

            {/* {userInfo.githubLink && (
              <p className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
                <a
                  href={userInfo.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-semibold"
                >
                  {userInfo.githubLink
                    ? userInfo.githubLink.slice(0, 30)
                    : "GitHub Profile"}
                </a>
              </p>
            )} */}
          </div>
          <div className="p-4 flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
              />
              <span className="text-gray-800 font-semibold">
                {userInfo.phoneNumber || "Phone not specified"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
              />
              <span className="text-gray-800 font-semibold">
                {userInfo.email || "Phone not specified"}
              </span>
            </p>
          </div>
          <div className="flex justify-center p-4">
            <Button
              className="rounded-md"
              onClick={() => navigate("/userinfo")}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Resumes Section */}
        <div className="max-sm:m-2">
          <h1 className="text-4xl my-10 max-sm:my-5">My Resumes</h1>
          {dashboardData.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
              {dashboardData.map((item, index) => (
                <div
                  key={index}
                  className="p-4 w-auto transition-all duration-300 bg-white rounded-xl shadow-md hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold">
                    {item.jobRole || "Untitled Resume"}
                  </h3>
                  <p className="mt-2 font-medium">ATS Score:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${item.resumeAnalysisScore || 0}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.resumeAnalysisScore || 0}%
                  </p>
                  <p className="mt-3 font-medium">
                    Interview Score: {item.correctAnswers || 0}/15
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mb-4">
                No resume data available. Create your first resume!
              </p>
              <Button
                className="mt-4 px-6 py-2"
                onClick={() => navigate("/create-resume")}
              >
                Create Resume
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
