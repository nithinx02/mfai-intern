import React, { useState } from "react";
import logo from "../assets/Google__G__logo 1.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Inputs from "../components/Inputs";
import { login } from "../data";
import { useDispatch } from "react-redux";
import { updateEmail, updateName } from "../feature/UserSlice";
//  import {login} from '../feature/UserSlice'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Sending login request with:", { email, password });

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(updateEmail(data.email)); // ✅ Only update Redux after login success
        // If backend sends name: dispatch(updateName(data.name));
        navigate("/");
      } else {
        console.error(data.error);
        alert(data.error); // ✅ Notify user
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        stiffness: 600,
        ease: "easeInOut",
      }}
      className="flex items-center justify-center h-screen  p-4 "
    >
      <div
        className="flex  items-center justify-evenly gap-2 rounded-2xl  mx-auto max-w-5xl w-full max-md:p-3 "
        style={{ boxShadow: "0px 0px 10px 10px rgb(186, 213, 238,0.5)" }}
      >
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-1/2 max-md:w-full  max-md:p-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Login </h1>
          <div className="flex flex-col items-center justify-start gap-4 w-full p-4">
            <Inputs email={email} setEmail={setEmail}>
              Email
            </Inputs>
            <Inputs password={password} setPassword={setPassword}>
              Password
            </Inputs>
            <button className="bg-[#1170CD] text-white p-2 max-md:w-40 w-80 text-xl rounded-md cursor-pointer hover:bg-[#0E5BAA] transition-all duration-300">
              login
            </button>

            <div className="flex items-center justify-center gap-2 w-[70%] max-w-sm ">
              <p className="text-gray-800 text-2xl font-bold">or</p>
            </div>

            <a href="http://localhost:5000/auth/google">Sign in with Google</a>


            <p className="text-center max-sm:text-xs text-gray-500">
              New to builder?
              <span
                className="text-[#1170CD] ml-1 cursor-pointer hover:text-[#0E5BAA] transition-all duration-300 text-sm"
                onClick={() => navigate("/signup")}
              >
                Create an account
              </span>
            </p>
          </div>
        </form>

        <div className="max-md:hidden overflow-hidden rounded-r-xl w-1/2 py-5">
          <motion.img
            src={login}
            className="w-full h-full"
            alt="Login Illustration"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
