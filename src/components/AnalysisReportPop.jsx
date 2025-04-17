import { useNavigate } from "react-router-dom";
import Button from "./Button";
import React, { useState } from "react";

const AnalyseReportPopup = ({
  setPopUp,
  jobSuggestions,
  loading,
  resumeData,
  score
}) => {
  const [jobRole, setJobRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const startMockInterview = () => {
    if (!jobRole.trim()) {
      alert("Please select or enter a job role");
      return;
    }
    if (!difficulty) {
      alert("Please select a difficulty level");
      return;
    }

    navigate("/mockinterview", {
      state: {
        resumeText: resumeData,
        jobRole: jobRole,
        difficulty: difficulty,
        score
      },
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative mx-2">
        <span className="absolute top-0 right-0">
          <ion-icon
            name="close-outline"
            className="w-8 h-8 block max-sm:w-8 max-sm:h-8 cursor-pointer"
            onClick={() => setPopUp(false)}
          ></ion-icon>
        </span>
        <h2 className="text-xl font-bold text-center mb-4">
          Start your Mock Interview
        </h2>

        {loading ? (
          <p className="text-center py-4">Loading job suggestions...</p>
        ) : jobSuggestions?.length > 0 ? (
          <div className="job-suggestions mb-4 flex flex-wrap gap-2">
            {jobSuggestions.map((role, index) => (
              <button
                key={index}
                className={`job-btn px-3 py-1 rounded-md text-sm ${
                  jobRole === role
                    ? "bg-[#1170CD] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setJobRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">No suggestions found.</p>
        )}

        <input
          type="text"
          placeholder={
            jobSuggestions?.length > 0
              ? "Or enter job role manually"
              : "Please provide the resume text so I can suggest job titles."
          }
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block text-sm font-semibold mb-1">
          Select Difficulty:
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border rounded-md mb-6"
        >
          <option value="">Select Difficulty</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="pro">Pro</option>
        </select>

        <div className="popup-buttons flex justify-between mt-4">
          <Button
            className="px-4 py-2 bg-[#1170CD] text-white rounded-md hover:bg-[#0E5BAA] transition-colors max-md:w-24"
            onClick={() => setPopUp(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 bg-[#1170CD] text-white rounded-md hover:bg-[#0E5BAA] transition-colors max-md:w-24"
            onClick={startMockInterview}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyseReportPopup;
