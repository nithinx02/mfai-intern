import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import ShowPasswordPopup from "../components/ShowPasswordPopup";
import { avatar, nonProfile } from "../data";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";

function AccountInfoPage() {
  const [info, setInfo] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [activeButton, setActiveButton] = useState("basicinfo");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user data
  const fetchAccountInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/account-info",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      const userData = data.user;
      if (userData && userData._id) {
        delete userData._id;
      }
      setInfo({ ...userData, password: "*****" });

      // Fetch profile picture separately
      fetchProfilePicture();
    } catch (err) {
      console.error("Error fetching account info:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile picture
  const fetchProfilePicture = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(info[field] || "");
    if (field === "password") {
      setShowPasswordPopup(true);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };
  // save the btn
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedInfo = { ...info, [editingField]: tempValue };

    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/update-account-info",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ [editingField]: tempValue }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setInfo(updatedInfo);
        setEditingField(null);
        setTempValue("");
      } else {
        console.error("Update failed:", data);
      }
    } catch (err) {
      console.error("Error updating info:", err);
    } finally {
      setLoading(false);
    }
  };
  // save the password
  const confirmPasswordSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/update-account-info",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: tempValue,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setInfo((prev) => ({ ...prev, password: "********" }));
        setEditingField(null);
        setShowPasswordPopup(false);
        setTempValue("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert("Password updated successfully!");
      } else {
        console.error("Password update failed:", data);
        alert(data.error || "Failed to update password");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      alert("An error occurred while updating your password");
    } finally {
      setLoading(false);
    }
  };
  // delete the account
  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/delete-account",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        const data = await res.json();
        console.error("Account deletion failed:", data.error);
        alert("Failed to delete account. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("An error occurred while deleting your account.");
    } finally {
      setLoading(false);
    }
  };
  // logout the account

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="h-screen ">
      <NavBar />
      <div className="h-[calc(100vh-75px)] p-6 max-sm:p-2">
        <div
          className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-14 max-sm:grid-cols-1 max-sm:p-2"
          style={{ boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" }}
        >
          {/* Sidebar */}
          <div className="p-4 border-r-2 border-[#1170CD] flex-1 flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-28">
              <div className="w-32 h-32 object-cover rounded-full mx-auto my-4 bg-slate-50 shadow-2xl">
                <img
                  src={userAvatar || nonProfile}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = nonProfile;
                  }}
                />
              </div>
            </div>
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 max-sm:hidden">
              <Link to={"/userinfo"}>
                <Button
                  className={`py-2 mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "basicinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("basicinfo")}
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
          <div className="space-y-2 mt-6">
            <div className="max-sm:flex gap-4 items-center  my-4">
              <div className="hidden max-sm:block">
                {
                  <FontAwesomeIcon
                    icon={faBars}
                    className="w-10 h-10 block max-sm:w-6 max-sm:h-6 text-[#1170CD]"
                    onClick={() => setIsOpen(true)}
                  />
                }
              </div>
              <h2 className="text-4xl font-bold max-sm:text-2xl">
                Account Info
              </h2>
            </div>

            <form onSubmit={handleSave}>
              {Object.keys(info).map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-6 text-start py-6 max-sm:py-4 border-b max-sm:flex-col max-sm:gap-4"
                >
                  <div className="flex justify-between max-sm:w-full">
                    <p className="capitalize font-medium text-xl">{key}:</p>
                    <div
                      className="mt-2 hidden max-sm:block
                    "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          editingField === key ? handleSave() : handleEdit(key)
                        }
                        className="text-blue-500 hover:underline"
                      >
                        {editingField === key ? "" : "Edit"}
                      </button>
                    </div>
                  </div>

                  {editingField === key && key !== "password" ? (
                    <div className="flex flex-col gap-2 max-sm:w-[80%]">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="px-2 py-1 flex-1 border-b"
                      />
                      <div className="flex justify-start mt-1 gap-2">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="p-2 bg-gray-300 rounded-md"
                        >
                          Cancel
                        </button>
                        <Button type="submit" className="!p-2">
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-950 font-semibold flex-grow max-sm:w-full">
                      {key === "password"
                        ? "*".repeat(tempValue.length || 8)
                        : info[key]}
                    </p>
                  )}

                  {key !== "password" && key !== "profilePicture" && (
                    <div className="max-sm:hidden">
                      <button
                        type="button"
                        onClick={() =>
                          editingField === key ? handleSave() : handleEdit(key)
                        }
                        className="text-blue-500 hover:underline"
                      >
                        {editingField === key ? "" : "Edit"}
                      </button>
                    </div>
                  )}
                  {key === "password" && (
                    <>
                      {editingField !== "password" ? (
                        <button
                          type="button"
                          onClick={() => {
                            handleEdit("password");
                            setShowPasswordPopup(true); // Show the password popup
                          }}
                          className="text-blue-500 hover:underline max-sm:hidden"
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex flex-col items-start gap-2">
                          <input
                            type="password"
                            placeholder="Enter new password"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded-md"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={confirmPasswordSave}
                              className="!p-2"
                            >
                              Save
                            </Button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingField(null);
                                setTempValue("");
                              }}
                              className="!p-2 bg-gray-300 !text-black  rounded-md"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </form>

            <div className="flex justify-between items-center gap-4 max-sm:flex-col max-sm:gap-4">
              <Button
                className="px-3 py-2 font-medium rounded-md bg-white !text-[#F01F1F] border-2 border-[#F01F1F] flex gap-2 justify-center items-center max-sm:w-full hover:!bg-[#F01F1F] hover:!text-white"
                onClick={handleDeleteAccount}
              >
                <ion-icon name="trash-outline" className="w-5 h-5" />
                Delete
              </Button>
              <Button
                className="px-3 py-2 font-medium rounded-md bg-[#1170CD] !text-white border-2 border-[#1170CD] flex gap-2 items-center justify-center max-sm:w-full"
                onClick={handleLogout}
              >
                <ion-icon name="log-out-outline" className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>

          {isOpen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-48 left-[20px] h-[400px] bg-white shadow-2xl p-4 w-[320px] rounded-md"
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
                <span onClick={() => setIsOpen(false)}>
                  <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Password popup */}
      <ShowPasswordPopup
        setTempValue={setTempValue}
        setShowPasswordPopup={setShowPasswordPopup}
        showPasswordPopup={showPasswordPopup}
        confirmPasswordSave={confirmPasswordSave}
        tempValue={tempValue}
        setEditingField={setEditingField}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </div>
  );
}

export default AccountInfoPage;
