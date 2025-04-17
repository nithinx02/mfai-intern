import React from "react";

function Button({ children, className, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${className}  bg-[#1170CD] text-white p-4  rounded-md cursor-pointer hover:!bg-[#0E5BAA] transition-all duration-300 outline-none  `}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
