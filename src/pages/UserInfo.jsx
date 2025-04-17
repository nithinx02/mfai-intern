import React, { useState, useEffect } from "react";
import { avatar, nonProfile } from "../data";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BasicInfo = () => {
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const location = useLocation();
  const [isopen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(location.pathname);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    location: "",
    birthday: "",
    summary: "",
    githubLink: "",
    linkedinLink: "",
    profilePicture: "",
  });
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBasicInfo();
    fetchProfilePicture();
    setActiveButton(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isopen]);
// user info...
  const fetchBasicInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://airesumeproapi.onrender.com/api/basic-info",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data.user);

      if (response.data.user.profilePicture) {
        setUserAvatar(response.data.user.profilePicture);
      } else {
        setUserAvatar(avatar);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching basic info:", error);
      setLoading(false);
    }
  };
// profile picture...
  const fetchProfilePicture = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://airesumeproapi.onrender.com/api/profile-picture",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.profilePicture) {
        setUserAvatar(response.data.profilePicture);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };
// uploading profile picture...
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", file);

        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://airesumeproapi.onrender.com/api/upload-profile-picture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUserAvatar(response.data.profilePicture);
        setMessage("Profile picture updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setMessage(
          error.response?.data?.error || "Failed to update profile picture."
        );
      }
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(user[field] || "");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedField = { [editingField]: tempValue };
      const response = await axios.put(
        "https://airesumeproapi.onrender.com/api/basic-info",
        updatedField,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...user, [editingField]: response.data.user[editingField] });
      setEditingField(null);
      setMessage("Changes saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving changes:", error);
      setMessage(error.response?.data?.error || "Failed to save changes.");
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  if (loading) return <Loading />;

  return (
    <div className="h-screen">
      <NavBar />
      <div className="max-sm:p-4  h-screen ">
        <div
          className="max-w-6xl mx-auto  p-6 rounded-xl  grid grid-cols-[200px_auto] gap-10 my-14  max-sm:grid-cols-1"
          style={{ boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" }}
        >
          {/* Sidebar */}
          <div className="p-4 border-r-2 border-[#1170CD] flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-24">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="avatar-upload" className="cursor-pointer block">
                <div className="w-32 h-32 object-cover rounded-full mx-auto my-4 bg-slate-50 shadow-2xl">
                  <img
                    src={userAvatar || nonProfile}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full "
                    onError={(e) => {
                      e.target.src = nonProfile;
                    }}
                  />
                </div>
              </label>
            </div>
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 max-sm:hidden">
              <Link to={"/userinfo"}>
                <Button
                  className={`py-2 mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "/userinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("/userinfo")}
                >
                  <ion-icon name="person-outline" className="w-5 h-5 mt-1" />
                  Basic Info
                </Button>
              </Link>
              <Link to={"/accountinfo"}>
                <Button
                  className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "/accountinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("/accountinfo")}
                >
                  <ion-icon name="settings-outline" className="w-5 h-5 mt-1" />
                  Account
                </Button>
              </Link>
            </div>
          </div>
          {/* Main Content */}
          <div>
            <div className="max-sm:flex gap-4 items-center  my  -4">
              <div className="hidden max-sm:block">
                {!isopen && (
                  <FontAwesomeIcon
                    icon={faBars}
                    className="w-10 h-10 block max-sm:w-6 max-sm:h-6 text-[#1170CD]"
                    onClick={() => setIsOpen(true)}
                  />
                )}
              </div>
              <h2 className="text-4xl font-bold max-sm:text-2xl">Basic Info</h2>
            </div>

            {message && (
              <div
                className={`mb-4 p-2 rounded-md ${
                  message.includes("success")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSave}>
              {Object.keys(user)
                .filter((key) => !["profilePicture"].includes(key))
                .map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-6 text-start py-5 max-sm:py-4 border-b max-sm:flex-col max-sm:gap-4 max-sm:px-4"
                  >
                    <div className="flex justify-between max-sm:w-full w-[20%]">
                      <p className="capitalize font-medium text-xl">{key}:</p>
                      <div className="mt-2 hidden max-sm:block">
                        <button
                          type="button"
                          onClick={() =>
                            editingField === key
                              ? handleSave()
                              : handleEdit(key)
                          }
                          className="text-blue-500 hover:underline"
                        >
                          {editingField === key ? "" : "Edit"}
                        </button>
                      </div>
                    </div>

                    {editingField === key ? (
                      <div>
                        {key === "birthday" ? (
                          <input
                            type="date"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="px-2 py-1 flex-1 border-b"
                          />
                        ) : key === "summary" ? (
                          <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="px-2 py-1 border border-gray-300 focus:outline-none rounded-md h-40  w-[600px] text-gray-500 placeholder:text-gray-400  placeholder:text-sm max-sm:w-[350px] "
                            rows={4}
                            placeholder="'The only way to do great work is to love what you do...'"
                          />
                        ) : key === "gender" ? (
                          <select
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="px-2 py-1 flex-1 border-b"
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="px-2 py-1 flex-1 border-b"
                          />
                        )}
                        <div className="flex justify-start mt-2 gap-2">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="p-2 bg-gray-300 rounded-md"
                          >
                            Cancel
                          </button>
                          <Button
                            type="submit"
                            className="!p-2"
                            disabled={!tempValue || editingField === null}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-950 font-semibold flex-grow max-sm:w-full">
                        {key === "birthday"
                          ? new Date(user[key]).toLocaleDateString()
                          : user[key] || "-"}
                      </p>
                    )}

                    {key !== "username" &&
                      key !== "email" &&
                      key !== "phoneNumber" && (
                        <div className="max-sm:hidden">
                          <button
                            type="button"
                            onClick={() =>
                              editingField === key
                                ? handleSave()
                                : handleEdit(key)
                            }
                            className="text-blue-500 hover:underline"
                          >
                            {editingField === key ? "" : "Edit"}
                          </button>
                        </div>
                      )}
                  </div>
                ))}
            </form>
          </div>

          {/* Mobile Menu */}
          {isopen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-52 left-5 h-[400px] bg-white shadow-2xl p-4 w-[350px] rounded-md"
            >
              <div className="flex justify-between">
                <div className="p-2 flex flex-col gap-6 w-[250px] absolute top-12 left-5">
                  <Link to={"/userinfo"}>
                    <Button
                      className={`py-2 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "/userinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/userinfo");
                        setIsOpen(false);
                      }}
                    >
                      <span className="block mt-1">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      Basic Info
                    </Button>
                  </Link>
                  <Link to={"/accountinfo"}>
                    <Button
                      className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "/accountinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/accountinfo");
                        setIsOpen(false);
                      }}
                    >
                      <span className="block mt-1">
                        <FontAwesomeIcon icon={faGear} />
                      </span>
                      Account
                    </Button>
                  </Link>
                </div>
                <div>
                  <span onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
