import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { ResumeAnalyzer as resumeImage } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle  submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a resume file.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to analyze a resume.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://airesumeproapi.onrender.com/api/analyze",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log("API Full Response:", result);

      if (response.ok && result?.success && result?.data) {
        navigate("/analysisReport", {
          state: { data: result.data, score: result.data.overallScore },
        });
      } else {
        setError(
          result?.message || "Failed to analyze resume. Please try again."
        );
      }
    } catch (err) {
      console.error("Resume analysis error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      const allowedExtensions = [
        "pdf",
        "doc",
        "docx",
        "jpg",
        "jpeg",
        "png",
        "gif",
      ];

      if (allowedExtensions.includes(fileExtension)) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Invalid file type. Please upload a PDF, DOC, or DOCX file.");
        setFile(null);
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <NavBar />
      <div className="flex items-center justify-center p-4 h-[calc(100vh-75px)] max-sm:p-2">
        <div
          className="flex items-center justify-between gap-2 rounded-3xl mx-auto max-w-5xl w-full max-md:p-3"
          style={{ boxShadow: "0px 0px 25px 10px rgb(186, 213, 238)" }}
          data-aos="fade-up"
        >
          <div className="flex flex-col justify-between px-16 gap-3 w-full max-md:px-4">
            <h2 className="text-[#1170CD] text-4xl font-semibold max-md:text-2xl max-md:text-center">
              Is Your Resume Good Enough
            </h2>
            <p className="text-gray-800 font-semibold max-md:font-bold max-md:text-center">
              Get AI-powered insights on your resume instantly!
              <p className="max-md:hidden">
                Optimize your career opportunities with professional feedback.
              </p>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#1170CD] py-8 rounded-3xl">
                <span>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="text-7xl text-[#1170cd]"
                  />
                </span>
                <p className="font-bold text-xl max-md:text-base">
                  Drop your Resume Here
                </p>
                <span className="text-gray-500 font-bold max-md:hidden">
                  or click to browse
                </span>

                {!file ? (
                  <label
                    htmlFor="resume-upload"
                    className="bg-[#1170CD] text-white p-3 mt-4 rounded-full cursor-pointer hover:bg-[#0E5BAA] transition-all duration-300 max-md:text-sm disabled:opacity-50"
                  >
                    {loading ? "Analyzing..." : "Upload your resume"}
                  </label>
                ) : (
                  <button
                    type="submit"
                    className="mt-4 bg-[#1170CD] text-white px-6 py-2 rounded-md hover:bg-[#0E5BAA] transition-all duration-300 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                  </button>
                )}

                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />

                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </form>
          </div>

          <div className="max-md:hidden overflow-hidden rounded-r-xl w-full">
            <img
              src={resumeImage}
              className="w-full h-full"
              alt="Resume Analysis Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
