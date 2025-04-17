import React from "react";
import { copyRightIcon } from "../data";

function CopyRigth() {
  return (
    <div className="flex justify-between items-center bg-[#111827] p-4 text-white border-t-2 border-gray-100 border-opacity-70 max-sm:flex-col-reverse max-sm:gap-4  max-sm:p-0 max-sm:border-hidden">
      <div className="text-xl max-sm:border-t-2 max-sm:border-gray-100 max-sm:border-opacity-50 max-sm:p-4 max-sm:text-center max-sm:text-sm w-full">
        <p>&copy; {new Date().getFullYear()}MindFulAI. All Rights Reserved.</p>
      </div>
      <div className="flex flex-col gap-2 items-start justify-start max-sm:gap-2 P-8 max-sm:p-4">
        <p className="text-2xl hidden max-sm:block max-sm:pl-5">Follow us</p>
        <ul className="flex gap-4 max-sm:gap-2 ">
          {copyRightIcon.map((icons, index) => (
            <li
              key={index}
              className="p-2 text-[#000]   rounded-full  max-sm:text-xl text-2xl flex items-center justify-center bg-[#9CA3AF]"
            >
              {icons.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CopyRigth;
