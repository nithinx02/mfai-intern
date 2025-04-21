import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import AnalyseReportPopup from "../components/AnalysisReportPop";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const ReportAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: apiData, score } = location.state || {};

  const [data, setData] = useState({
    overallScore: 0,
    breakdown: [
      { label: "Content", value: 0 },
      { label: "Style", value: 0 },
      { label: "Format", value: 0 },
      { label: "Section", value: 0 },
      { label: "Skills", value: 0 },
    ],
  });

  const [issues, setIssues] = useState({
    content: {
      needsImprovement: [],
      recommendations: [],
    },
    format: {
      needsImprovement: [],
      recommendations: [],
    },
    sections: {
      needsImprovement: [],
      recommendations: [],
    },
    skills: {
      needsImprovement: [],
      recommendations: [],
    },
    style: {
      needsImprovement: [],
      recommendations: [],
    },
  });

  const [error, setError] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (apiData) {
      // Set overall score and breakdown from API data
      setData({
        overallScore: apiData.overallScore || 0,
        breakdown: [
          { label: "Content", value: apiData.content?.score || 0 },
          { label: "Style", value: apiData.style?.score || 0 },
          { label: "Format", value: apiData.format?.score || 0 },
          { label: "Section", value: apiData.sections?.score || 0 },
          { label: "Skills", value: apiData.skills?.score || 0 },
        ],
      });

      // Parse issues and recommendations from API data
      setIssues({
        content: {
          needsImprovement: apiData.content?.issues
            ? apiData.content.issues.split(/[•-]/).filter((item) => item.trim())
            : [],
          recommendations: apiData.content?.suggestions
            ? apiData.content.suggestions
                .split(/[•-]/)
                .filter((item) => item.trim())
            : [],
        },
        format: {
          needsImprovement: apiData.format?.issues
            ? apiData.format.issues.split(/[•-]/).filter((item) => item.trim())
            : [],
          recommendations: apiData.format?.suggestions
            ? apiData.format.suggestions
                .split(/[•-]/)
                .filter((item) => item.trim())
            : [],
        },
        sections: {
          needsImprovement: apiData.sections?.issues
            ? apiData.sections.issues
                .split(/[•-]/)
                .filter((item) => item.trim())
            : [],
          recommendations: apiData.sections?.suggestions
            ? apiData.sections.suggestions
                .split(/[•-]/)
                .filter((item) => item.trim())
            : [],
        },
        skills: {
          needsImprovement: apiData.skills?.issues
            ? apiData.skills.issues.split(/[•-]/).filter((item) => item.trim())
            : [],
          recommendations: apiData.skills?.suggestions
            ? apiData.skills.suggestions
                .split(/[•-]/)
                .filter((item) => item.trim())
            : [],
        },
        style: {
          needsImprovement: apiData.style?.issues
            ? apiData.style.issues.split(/[•-]/).filter((item) => item.trim())
            : [],
          recommendations: apiData.style?.suggestions
            ? apiData.style.suggestions
                .split(/[•-]/)
                .filter((item) => item.trim())
            : [],
        },
      });
    } else {
      navigate("/resume-analyzer");
    }
  }, [apiData, navigate]);
//  suggestions of jobs
  const fetchJobSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/job-suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resumeText: apiData }),
        }
      );

      const result = await response.json();
      if (result.success && result.suggestions) {
        setJobSuggestions(result.suggestions);
      } else {
        throw new Error(result.error || "Failed to get job suggestions");
      }
    } catch (error) {
      console.error("Error fetching job suggestions:", error);
      setError(error.message);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const getOverallScoreColor = (score) => {
    if (score >= 80) return "text-green-400 border-green-400";
    if (score >= 50) return "text-yellow-400 border-yellow-400";
    return "text-red-400 border-red-400";
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="h-screen ">
      <NavBar />
      <div
        className={`p-6 max-w-6xl m-auto max-sm:p-4 mt-0 h-[calc(100vh-75px)] ${
          openSection ? "mt-20" : ""
        }`}
      >
        <div className="bg-white shadow-[0px_5px_20px_-3px_rgba(0,0,0,0.2)] rounded-xl p-6 max-sm:shadow-none max-sm:p-4 mb-8">
          <div className="flex gap-16 items-center max-sm:flex-col">
            <div>
              <div
                className={`w-48 h-48 flex items-center justify-center border-8 rounded-full ${getOverallScoreColor(
                  data.overallScore
                )}`}
              >
                <div className="text-center">
                  <p
                    className={`text-4xl font-bold ${getOverallScoreColor(
                      data.overallScore
                    )}`}
                  >
                    {data.overallScore}
                  </p>
                  <p className="text-sm text-gray-500">Overall Score</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between flex-grow gap-2 w-full">
                <p className="text-2xl font-bold max-sm:hidden">
                  Score Breakdown
                </p>
                <div className="max-sm:flex max-sm:justify-center">
                  <Button
                    className="bg-[#1170CD] text-white rounded-xl !p-3 text-lg font-medium hover:bg-[#0E5BAA] transition-colors max-sm:w-80"
                    onClick={() => {
                      setPopUp(true);
                      fetchJobSuggestions();
                    }}
                  >
                    Want to Mock
                  </Button>
                  {popUp && (
                    <AnalyseReportPopup
                      setPopUp={setPopUp}
                      jobSuggestions={jobSuggestions}
                      loading={loadingSuggestions}
                      resumeData={apiData}
                      score={score}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 w-full max-sm:justify-between max-sm:grid-cols-2">
                {data.breakdown.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-md p-4 ${
                      item.value >= 14
                        ? "bg-[#A9FFD6]"
                        : item.value >= 10
                        ? "bg-[#FFEC9F]"
                        : "bg-red-100"
                    } text-gray-500`}
                  >
                    <p
                      className={`font-semibold ${
                        item.value >= 14
                          ? "text-[#22925c]"
                          : item.value >= 10
                          ? "text-[#af9734]"
                          : "text-red-500"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`font-semibold ${
                        item.value >= 14
                          ? "text-[#22925c]"
                          : item.value >= 10
                          ? "text-[#af9734]"
                          : "text-red-500"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
                <Button
                  className="flex items-center gap-2 justify-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </span>
                  <p className="text-xl max-sm:text-sm">Fix All The Issues</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            {isOpen &&
              Object.entries(issues).map(([issueKey, issueData], index) => (
                <motion.div
                  // data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={issueKey}
                  className={`mb-4 rounded-xl shadow-md border border-gray-200 p-6 ${
                    openSection === issueKey ? "" : ""
                  }`}
                  onClick={() => toggleSection(issueKey)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold mb-2 capitalize cursor-pointer">
                      {issueKey}
                    </h3>
                    <div>
                      <span>
                        <ion-icon
                          name={
                            openSection === issueKey
                              ? "chevron-up-outline"
                              : "chevron-down-outline"
                          }
                          className="text-2xl"
                        ></ion-icon>
                      </span>
                    </div>
                  </div>
                  <div>
                    {openSection === issueKey && (
                      <>
                        <div className="mb-2">
                          <h4 className="font-bold">Needs Improvement:</h4>
                          <ul className="list-disc list-inside">
                            {issueData.needsImprovement.map((item, idx) => (
                              <li key={idx} className="text-gray-700">
                                {item.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold">Recommendations:</h4>
                          <ul className="list-disc list-inside">
                            {issueData.recommendations.map((item, idx) => (
                              <li key={idx} className="text-gray-700">
                                {item.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
