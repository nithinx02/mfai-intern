import React from "react";
import { aboutUs } from "../data";
import Button from "./Button";
import CopyRigth from "./CopyRigth";
function Footer() {
  return (
    <>
      <footer className="bg-[#111827] p-8 text-white flex  justify-center items-center gap-10  flex-wrap-reverse py-16 max-sm:py-6 ">
        <div className="flex flex-col gap-4 max-sm:items-center max-sm:text-center ">
          <h2 className="text-3xl font-semibold max-sm:text-xl">About US</h2>
          <p className="max-w-xl text-base">
            Our AI-powered platform helps job seekers analyze resumes, receive
            feedback, and improve interview skills. Our mission is to empower
            every individual with cutting-edge technology for professional
            success.
          </p>
        </div>
        <div className="flex flex-col gap-4 flex-1 justify-items-center items-center">
          <h2 className="text-3xl font-semibold max-md:text-xl">
            Connect Us <br />
          </h2>
          <div className="flex flex-col gap-2">
            {aboutUs.map((item, index) => (
              <div key={index} className="flex gap-2">
                <p>{item.icon}</p>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 max-sm:bg-[#1F2937] max-sm:p-4 max-sm:rounded-md ">
          <ul className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold">Stay Updated!</h2>
            <p>
              Stay updated with AI-powered resume insights! Subscribe to our
              newsletter.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md bg-[#1F2937] border border-gray-100 border-opacity-50"
            />
            <Button className="p-2 rounded-md w-full">Subscribe</Button>
          </ul>
        </div>
      </footer>
      <CopyRigth />
    </>
  );
}

export default Footer;
