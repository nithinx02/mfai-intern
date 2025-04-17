import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function SideBar({ activeButton, setActiveButton }) {
  return (
    <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 max-sm:hidden">
      <Link to={"/userinfo"}>
        <Button
          className={`py-2 mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
            activeButton === "/userinfo" ? "!bg-[#1170CD] !text-white" : ""
          }`}
          onClick={() => setActiveButton("/userinfo")}
        >
          <ion-icon name="person-outline" className="w-5 h-5" />
          <p> Basic Info</p>
        </Button>
      </Link>
      <Link to={"/accountinfo"}>
        <Button
          className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
            activeButton === "/accountinfo" ? "!bg-[#1170CD] !text-white" : ""
          }`}
          onClick={() => setActiveButton("/accountinfo")}
        >
          <ion-icon name="settings-outline" className="w-5 h-5 " />
          <p> Account</p>
        </Button>
      </Link>
    </div>
  );
}

export default SideBar;
