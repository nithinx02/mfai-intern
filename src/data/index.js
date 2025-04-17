import loginImage from "../assets/login.png";
import signupImage from "../assets/signUp.png";
import resumeImage from "../assets/resumeAnalyzer.png";
import avatarImage from "../assets/Ellipse 14.png";
import homeImage from "../assets/resume 1.png";
import nonProfileImage from "../assets/nonProfile.jpg";
import homeIconImage from "../assets/icons/homeIcon.png";
import resumeIconImage from "../assets/icons/resumeIcon.png";
import AccountImage from "../assets/icons/Group.png";
import dashboardImage from "../assets/icons/dashboard v2.0 1.png";
import AnalyseIconImage from "../assets/icons/Analyse.png";
import FixAllIconImage from "../assets/icons/fix 1.png";
import upload from "../assets/icons/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

export const login = loginImage;
export const signup = signupImage;
export const ResumeAnalyzer = resumeImage;
export const avatar = avatarImage;
export const home = homeImage;
export const nonProfile = nonProfileImage;
export const homeIcon = homeIconImage;
export const resumeIcon = resumeIconImage;
export const Account = AccountImage;
export const dashboard = dashboardImage;
export const Analyse = AnalyseIconImage;
export const Fix = FixAllIconImage;
export const uploadIcon = upload;

export const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];
export const cards = [
  {
    percentage: "85%",
    title: "Resume Scored",
    description: "Your resume ranks in the top percentile",
  },
  {
    percentage: <span style={{ color: "#1076DA" }}>85%</span>,
    title: "Resume Scored",
    description: "Your resume ranks in the top percentile",
  },
  {
    percentage: <span style={{ color: "#1076DA" }}>1000+</span>,
    title: "Resumes Reviewed",
    description: " candidates improve their job prospects",
  },
];

export const analysis = [
  {
    icon: <FontAwesomeIcon icon={faNoteSticky} />,
    title: "Real-time AI Mock Interviews",
    description:
      "Practice with our AI interviewer, get instant feedback and improve your skills",
  },
  {
    icon: <FontAwesomeIcon icon={faChartLine} />,
    title: "AI-Powered Performance Feedback",
    description: "Detailed analysis of your interview performance",
  },
  {
    icon: <FontAwesomeIcon icon={faBullseye} />,
    title: "Custom Question Bank",
    description: "Tailored questions based on your resume",
  },
];

export const copyRightIcon = [
  {
    icon: <FontAwesomeIcon icon={faInstagram} />,
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedin} />,
  },
  {
    icon: <FontAwesomeIcon icon={faFacebook} />,
  },
  { icon: <FontAwesomeIcon icon={faSquareTwitter} /> },
];
export const howItWorks = [
  {
    icon: <FontAwesomeIcon icon={faUpload} bounce />,
    title: "Upload Resume",
    description: "Drag & drop your resume file",
  },
  {
    icon: <FontAwesomeIcon icon={faRobot} flip />,
    title: "AI Analysis",
    description: "Get detailed score & suggestions",
  },
  {
    icon: <FontAwesomeIcon icon={faMessage} shake />,
    title: "Start Interview",
    description: "Practice with AI interviewer",
  },
];

export const aboutUs = [
  {
    icon: <ion-icon name="call-outline"></ion-icon>,
    title: "+91 789-456-1230",
  },
  {
    icon: <FontAwesomeIcon icon={faMessage} />,
    title: "nithin@gmail.com",
  },
  {
    icon: <ion-icon name="location-outline"></ion-icon>,
    title: "India, Tamil Nadu",
  },
];

// export const questions = [
//   {
//     text: "What is the capital of France?",
//     userAnswer: "Paris",
//     correctAnswer: "Paris",
//     correct: true,
//     correct: true,
//   },
//   {
//     text: "What is the square root of 16?",
//     userAnswer: "5",
//     correctAnswer: "4",
//     correct: false,
//   },
//   {
//     text: "What is the chemical symbol for water?",
//     userAnswer: "H2O",
//     correctAnswer: "H2O",
//     correct: true,
//   },
//   {
//     text: "Who wrote 'Romeo and Juliet'?",
//     userAnswer: "Shakespeare",
//     correctAnswer: "William Shakespeare",
//     correct: true,
//   },
//   {
//     text: "What is the largest planet in our solar system?",
//     userAnswer: "Saturn",
//     correctAnswer: "Jupiter",
//     correct: false,
//   },
//   {
//     text: "What is the boiling point of water in Celsius?",
//     userAnswer: "100",
//     correctAnswer: "100",
//     correct: true,
//   },
//   {
//     text: "Who painted the Mona Lisa?",
//     userAnswer: "Da Vinci",
//     correctAnswer: "Leonardo da Vinci",
//     correct: true,
//   },
//   {
//     text: "What is the primary language spoken in Brazil?",
//     userAnswer: "Spanish",
//     correctAnswer: "Portuguese",
//     correct: false,
//   },
//   {
//     text: "What is the fastest land animal?",
//     userAnswer: "Cheetah",
//     correctAnswer: "Cheetah",
//     correct: true,
//   },
//   {
//     text: "What is the currency of Japan?",
//     userAnswer: "Yen",
//     correctAnswer: "Yen",
//     correct: true,
//   },
//   {
//     text: "What is the currency of Japan?",
//     userAnswer: "Yen",
//     correctAnswer: "Yen",
//     correct: true,
//   },
//   {
//     text: "What is the currency of Japan?",
//     userAnswer: "Yen",
//     correctAnswer: "Yen",
//     correct: true,
//   },
//   {
//     text: "What is the currency of Japan?",
//     userAnswer: "Yen",
//     correctAnswer: "Yen",
//     correct: true,
//   },
//   {
//     text: "What is the currency of Japan?",
//     userAnswer: "Yen",
//     correctAnswer: "Yen",
//     correct: true,
//   },
// ];

// export const resumes = [
//   {
//     title: "Software Engineer",
//     lastUpdate: "Jan 15, 2025",
//     atsScore: 85,
//     interviewScore: "55/60",
//   },
//   {
//     title: "UI/UX",
//     lastUpdate: "Jan 15, 2025",
//     atsScore: 75,
//     interviewScore: "55/60",
//   },
//   {
//     title: "Data Scientist",
//     lastUpdate: "Feb 10, 2025",
//     atsScore: 90,
//     interviewScore: "58/60",
//   },
//   {
//     title: "Product Manager",
//     lastUpdate: "Mar 5, 2025",
//     atsScore: 80,
//     interviewScore: "52/60",
//   },
//   {
//     title: "Cybersecurity Analyst",
//     lastUpdate: "Apr 20, 2025",
//     atsScore: 88,
//     interviewScore: "57/60",
//   },
// ];

// export const questionsAndAnswers = [
//   {
//     text: "What is the capital of France?",
//     userAnswer: "Paris",
//     correctAnswer: "Paris",
//     correct: true,
//   },
//   {
//     text: "What is the square root of 16?",
//     userAnswer: "5",
//     correctAnswer: "4",
//     correct: false,
//   },
//   {
//     text: "What is the chemical symbol for water?",
//     userAnswer: "H2O",
//     correctAnswer: "H2O",
//     correct: true,
//   },
//   {
//     text: "Who wrote 'Romeo and Juliet'?",
//     userAnswer: "Shakespeare",
//     correctAnswer: "William Shakespeare",
//     correct: true,
//   },
//   {
//     text: "What is the largest planet in our solar system?",
//     userAnswer: "Saturn",
//     correctAnswer: "Jupiter",
//     correct: false,
//   },
//   {
//     text: "What is the boiling point of water in Celsius?",
//     userAnswer: "100",
//     correctAnswer: "100",
//     correct: true,
//   },
//   {
//     text: "Who painted the Mona Lisa?",
//     userAnswer: "Da Vinci",
//     correctAnswer: "Leonardo da Vinci",
//     correct: true,
//   },
//   {
//     text: "What is the primary language spoken in Brazil?",
//     userAnswer: "Spanish",
//     correctAnswer: "Portuguese",
//     correct: false,
//   },
//   {
//     text: "What is the fastest land animal?",
//     userAnswer: "Cheetah",
//     correctAnswer: "Cheetah",
//     correct: true,
//   },
//   {
//     text: "What is the currency of Japan?",
//     userAnswer: "Yen",
//     correctAnswer: "Yen",
//     correct: true,
//   },
// ];

// export const userInfo = {
//   name: "Nithin",
//   gender: "Male",
//   location: "India, Tamil Nadu",
//   birthday: "January 25, 2005",
//   summary:
//     "I'm an enthusiastic web designer passionate about blending design and development. Currently, I'm broadening my expertise in web development while building upon my foundational knowledge of C++, Java, and Python.",
//   github: "https://github.com/nithin-kumar-05",
//   linkedin: "https://www.linkedin.com/in/nithin-kumar-05/",
// };
// export const AccountInfo = {
//   name: "Nithin",
//   email: "nithin@gmail.com",
//   phone: "+91 9876543210",
//   password: "nithin123",
// };

// export const Issues = {
//   contentDetails: {
//     needsImprovement: [
//       "Lacks quantifiable metrics (e.g., 'Reduced costs by 15%').",
//       "Some bullet points are too vague.",
//     ],
//     recommendations: [
//       "Add data-driven results.",
//       "Use strong action verbs to showcase impact.",
//     ],
//   },
//   formatDetails: {
//     needsImprovement: ["Inconsistent font sizes.", "Poor alignment of text."],
//     recommendations: ["Use consistent formatting.", "Ensure proper alignment."],
//   },
//   styleDetails: {
//     needsImprovement: ["Overuse of jargon.", "Sentences are too long."],
//     recommendations: ["Use simpler language.", "Break down long sentences."],
//   },
//   sectionDetails: {
//     needsImprovement: [
//       "Missing key points.",
//       "Sections are not clearly defined.",
//     ],
//     recommendations: ["Add missing information.", "Use headings for clarity."],
//   },
//   skillsDetails: {
//     needsImprovement: [
//       "Lack of technical terms.",
//       "Poor explanation of skills.",
//     ],
//     recommendations: [
//       "Include more technical language.",
//       "Provide detailed examples.",
//     ],
//   },
// };
