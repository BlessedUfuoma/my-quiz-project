import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Answer() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get quiz data passed from the quiz page
  const {
    score = 0,
    total = 10,
    subjectName = "General Knowledge",
  } = location.state || {};

  // ✅ Calculate quiz percentage
  const percentage = Math.round((score / total) * 100);

  // ✅ Save progress safely into localStorage
  useEffect(() => {
    let savedProgress;

    try {
      // Try to get saved progress
      savedProgress = JSON.parse(localStorage.getItem("quizProgress")) || [];

      // If not an array, reset it
      if (!Array.isArray(savedProgress)) savedProgress = [];
    } catch (err) {
      savedProgress = [];
    }

    // Check if subject already exists in progress
    const existingIndex = savedProgress.findIndex(
      (entry) => entry.subject === subjectName
    );

    // New record for this quiz
    const newRecord = {
      subject: subjectName,
      score,
      total,
      percentage,
      date: new Date().toISOString(),
    };

    // If subject exists, update it — else add new
    if (existingIndex !== -1) {
      savedProgress[existingIndex] = newRecord;
    } else {
      savedProgress.push(newRecord);
    }

    // Save updated progress
    localStorage.setItem("quizProgress", JSON.stringify(savedProgress));
  }, [score, total, subjectName, percentage]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Quiz Completed
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-center mb-10">
        You have completed the {subjectName} quiz — here’s how you did!
      </p>

      {/* Score Details */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16">
        {/* Score */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Your Score</h2>
          <p className="text-4xl font-bold">{score}</p>
        </div>

        {/* Percentage */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Percentage</h2>
          <p className="text-4xl font-bold">{percentage}%</p>
        </div>

        {/* Correct Answers */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Correct Answers</h2>
          <p className="text-4xl font-bold">
            {score}/{total}
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Try Again + Review Answers */}
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Try Again
          </button>

          <button
            onClick={() => alert("Review Answers coming soon!")}
            className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-2 rounded-full font-bold hover:bg-white/30 transition"
          >
            Review Answers
          </button>
        </div>

        {/* Check Progress */}
        <button
          onClick={() => navigate("/progress")}
          className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-8 py-2 rounded-full font-bold hover:scale-105 transition-transform"
        >
          Check Progress
        </button>
      </div>
    </div>
  );
}

export default Answer;
