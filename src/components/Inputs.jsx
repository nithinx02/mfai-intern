import React from "react";
function Inputs({
  children,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
}) {
  const label = children;
  const inputType =
    label === "Password" ? "password" : label === "Email" ? "email" : "text";

  const inputValue =
    label === "Email" ? email : label === "Password" ? password : name;

  const handleChange = (e) => {
    const value = e.target.value;
    if (label === "Email") setEmail(value);
    else if (label === "Password") setPassword(value);
    else if (label === "Username") setName(value);
  };

  const autoComplete =
    label === "Email"
      ? "email"
      : label === "Password"
      ? "current-password"
      : "username";

  return (
    <div className="relative w-80 m-auto mb-6 max-sm:w-[90%]">
      <input
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        type={inputType}
        autoComplete={autoComplete}
        required
        value={inputValue}
        onChange={handleChange}
        className="peer border-b border-gray-300 outline-none w-full text-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
      />
      <label
        htmlFor={label.toLowerCase()}
        className={`absolute left-0 top-2 -translate-y-1/2 text-sm -mt-3 transition-all ${
          inputValue
            ? "top-2 text-xs text-blue-500"
            : "top-6 text-base text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default Inputs;
