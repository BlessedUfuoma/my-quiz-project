import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Answer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get quiz data
  const { questions = [], answers = {} } = location.state || {};

  // Calculate score and percentage
  const totalQuestions = questions.length;
  const correctAnswers = questions.reduce((acc, q, index) => {
    const correct = q.correct_answer;
    const userAnswer = answers[index];
    return acc + (userAnswer === correct ? 1 : 0);
  }, 0);

  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white flex flex-col items-center justify-center px-6 py-10">
      
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">Quiz Completed</h1>
      <p className="text-lg md:text-xl text-center mb-10">
        You have completed the quiz, here's how you did
      </p>

      {/* Score Container */}
      <div className="px-10 py-8 flex flex-col md:flex-row items-center justify-between w-full max-w-lg mb-10">
        
        {/* Left Section */}
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-2">Your Score</h2>
          <p className="text-4xl font-bold mb-2">{percentage}%</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Correct Answers</h3>
          <p className="text-3xl font-bold">{correctAnswers} / {totalQuestions}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Try Again */}
        <button
          onClick={() => navigate("/quiz")}
          className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-10 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform"
        >
          Try Again
        </button>

        {/* Review Answers */}
        <button
          onClick={() => navigate("/review")}
          className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-8 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform"
        >
          Review Answers
        </button>
      </div>

      {/* Check Progress Button */}
      <button
        onClick={() => navigate("/progress")}
        className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-10 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform mt-8"
      >
        Check Progress
      </button>
    </div>
  );
}

export default Answer;
