import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Progress() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("quizProgress")) || [];

    if (savedProgress.length > 0) {
      
      const grouped = savedProgress.reduce((acc, quiz) => {
        if (!acc[quiz.subject]) acc[quiz.subject] = [];
        acc[quiz.subject].push(quiz.percentage);
        return acc;
      }, {});

      const subjectScores = Object.entries(grouped).map(([subject, scores]) => ({
        name: subject,
        score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }));

      setSubjects(subjectScores);

      
      const avg =
        subjectScores.reduce((a, b) => a + b.score, 0) / subjectScores.length;
      setOverallPercentage(Math.round(avg));
      setAverageScore(Math.round(avg));
    }
  }, []);

  const totalQuizTaken = subjects.length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white flex flex-col items-center justify-between px-6 py-8 overflow-hidden">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Your Learning Progress</h1>

      {/* Circle Container */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-br from-[#434799] to-[#747AF5] relative w-40 h-40 rounded-full flex items-center justify-center">
          {/* Divider line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/60 transform -translate-x-1/2"></div>

          {/* Left side - Total quizzes */}
          <div className="absolute left-[10%] flex flex-col items-center text-center w-[40%]">
            <p className="text-sm font-medium">Total Quizzes</p>
            <p className="text-2xl font-medium">{totalQuizTaken}</p>
            <p className="text-sm opacity-80">{overallPercentage}%</p>
          </div>

          {/* Right side - Average */}
          <div className="absolute right-[10%] flex flex-col items-center text-center w-[40%]">
            <p className="text-sm font-medium">Average</p>
            <p className="text-2xl font-medium">{averageScore}%</p>
          </div>
        </div>
      </div>

      {/* Subject Performance Box */}
      <div className="bg-gradient-to-br from-[#434799] to-[#747AF5] backdrop-blur-md rounded-2xl p-4 w-full max-w-md shadow-lg flex flex-col items-center mb-6">
        <h2 className="text-lg font-semibold mb-3">Subject Performance</h2>

        {subjects.length === 0 ? (
          <p className="text-sm text-white/80 text-center">
            No progress yet. Take a quiz to see your stats!
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map((subj, i) => (
              <div
                key={i}
                className="w-24 h-20 bg-gradient-to-br from-[#434799] to-[#747AF5] rounded-xl flex flex-col items-center justify-center text-center shadow-md"
              >
                <p className="font-semibold">{subj.name}</p>
                <p className="text-lg font-bold">{subj.score}%</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Take New Quiz Button */}
      <button
        onClick={() => navigate("/quiz")}
        className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-3 rounded-full font-semibold text-white hover:scale-105 transition-transform"
      >
        Take New Quiz
      </button>
    </div>
  );
}

export default Progress;
