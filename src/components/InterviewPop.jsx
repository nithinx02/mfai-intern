import Button from "./Button";
import React, { useState } from "react";

const MockupInterviewPopup = ({ setIsopen }) => {
  const [roleByResume, setRoleByResume] = useState("UI/UX");
  const [preferredRole, setPreferredRole] = useState("");
  const [interviewType, setInterviewType] = useState("General");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative mx-2">
        <span className="absolute top-0 right-0">
          {" "}
          <ion-icon
            name="close-outline"
            className="w-8 h-8 block max-sm:w-8 max-sm:h-8 cursor-pointer"
            onClick={() => setIsopen(false)}
          ></ion-icon>
        </span>
        <h2 className="text-xl font-bold text-center mb-4">
          Start your Mockup Interview
        </h2>
        <Button className="w-60 mx-auto my-4 block">Upload thr Resume</Button>
        <label className="block text-sm font-semibold">Role By Resume</label>
        <input
          type="text"
          value={roleByResume}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-100 mb-3"
        />
        <label className="block text-sm font-semibold">Role you prefer</label>
        <input
          type="text"
          placeholder="Ex: Full Stack, UI/UX, Frontend"
          value={preferredRole}
          onChange={(e) => setPreferredRole(e.target.value)}
          className="w-full p-2 border rounded-md mb-3"
        />
        <label className="block text-sm font-semibold">Interview type</label>
        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          className="w-full p-2 border rounded-md mb-3"
        >
          <option value="General">General</option>
          <option value="Technical">Technical</option>
          <option value="Behavioral">Behavioral</option>
        </select>
        <div className="flex justify-between mt-4">
          <Button
            className="px-4 py-2  rounded-md max-md:w-24 "
            onClick={() => setIsopen(false)}
          >
            Cancel
          </Button>
          <Button className="px-4 py-2 rounded-md max-md:w-24">Start</Button>
        </div>
      </div>
    </div>
  );
};

export default MockupInterviewPopup;
