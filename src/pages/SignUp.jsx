import React, { useState } from "react";
import logo from "../assets/Google__G__logo 1.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Inputs from "../components/Inputs";
import { signup } from "../data";
import { useDispatch } from "react-redux";
import { updateEmail } from "../feature/UserSlice";
import Loadind from "../components/Loading";

function SignUp() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // signup function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(username, email, password);
    try {
      const response = await fetch(
        "https://airesumeproapi.onrender.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Signup failed. Please try again.");
      }

      localStorage.setItem("token", data.token);
      dispatch(updateEmail({ email }));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loadind />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-500 text-white p-4 rounded-md"
          onClick={() => navigate(-1)}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        stiffness: 600,
        ease: "easeInOut",
      }}
      className="flex items-center justify-between h-screen p-4 "
    >
      <div
        className="flex  items-center justify-evenly gap-2 rounded-2xl  mx-auto max-w-5xl w-full max-md:p-3   "
        style={{ boxShadow: "0px 0px 10px 10px rgb(186, 213, 238,0.5)" }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-1/2 max-md:w-full  max-md:p-8  "
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Signup</h1>
          <div className="flex flex-col items-center justify-start gap-3 w-full p-4">
            <Inputs name={username} setName={setName}>
              Username
            </Inputs>
            <Inputs email={email} setEmail={setEmail}>
              Email
            </Inputs>
            <Inputs password={password} setPassword={setPassword}>
              Password
            </Inputs>

            <button className="bg-[#1170CD] text-white p-2 max-md:w-44 w-80 m-auto rounded-md cursor-pointer hover:bg-[#0E5BAA] transition-all duration-300">
              Create an account
            </button>
            <div className="flex items-center justify-center gap-2 w-[70%] max-w-sm ">
              <p className="text-gray-800 text-2xl font-bold">or</p>
            </div>

            <button className="bg-[#1170CD] text-white p-2 w-full max-w-xs rounded-md shadow-md hover:bg-[#0E5BAA] transition-all duration-300">
              <div className="flex items-center justify-center gap-2">
                <img src={logo} alt="Google_logo" className="w-6" />
                <span>Sign in with Google</span>
              </div>
            </button>

            <p className="text-center max-sm:text-xs text-gray-500">
              Already have an account?
              <span
                className="text-[#1170CD] ml-1 cursor-pointer hover:text-[#0E5BAA] transition-all duration-300"
                onClick={() => navigate("/login")}
              >
                log in
              </span>
            </p>
          </div>
        </form>

        <div className="max-md:hidden overflow-hidden rounded-r-xl w-1/2 ">
          <motion.img
            src={signup}
            className="w-full h-full  "
            alt="Login Illustration"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SignUp;
