import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Trophy } from "lucide-react"; 


function Dashboard() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/subject");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white overflow-hidden px-4 py-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center leading-tight">Welcome To Quizbuddy</h1>

      {}
      <div className="bg-gradient-to-b from-[#434799]  to-[#747AF5] relative flex items-center justify-center w-40 h-40 rounded-full mb-10">
        {/* Left number */}
        <span className="absolute left-[15%] text-2xl font-bold">35</span>

        {/* Diagonal line */}
        <div className="w-[1px] h-38 bg-white rotate-17"></div>

        {/* Right number */}
        <span className="absolute right-[15%] text-2xl font-bold">100</span>
      </div>

      <h3 className="text-md font-bold mt-0 mb-8">Progress stats</h3>

      {/* Two boxes below the circle */}
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Left Box */}
        <div className="bg-gradient-to-b from-[#434799]  to-[#747AF5] backdrop-blur-md rounded-2xl p-6 w-64 flex flex-col items-center text-center shadow-md">
          <Clock size={24} />
          <h2 className="text-xl font-semibold mt-2">30 Questions</h2>
          <p className="text-sm mt-1">
            Answer all questions<br />at your own pace
          </p>
        </div>

        {/* Right Box */}
        <div className="bg-gradient-to-b from-[#434799]  to-[#747AF5] backdrop-blur-md rounded-2xl p-6 w-64 flex flex-col items-center text-center shadow-md">
          <Trophy size={24} />
          <h2 className="text-xl font-semibold mt-2">Challenge</h2>
          <p className="text-sm mt-1">
            Test your knowledge<br />across various topics
          </p>
        </div>
      </div>
      <button
      onClick={handleStartQuiz}
      className="mt-7 bg-gradient-to-br from-[#434799] to-[#747AF5] text-white px-10 py-2 rounded-full font-bold text-sm shadow-lg hover:opacity-90 transition">
      Start Quiz
      </button>
    </div>
  );
}

export default Dashboard;
