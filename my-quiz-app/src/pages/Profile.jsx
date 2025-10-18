import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Trophy, Star } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
  });
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  useEffect(() => {
    // ✅ Get user profile
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser && storedUser.name && storedUser.email) {
      setUser(storedUser);
    }

    // ✅ Get quiz progress
    const storedProgress = JSON.parse(localStorage.getItem("quizProgress")) || [];
    setCompletedQuizzes(storedProgress);
  }, []);

  // ✅ Get the two most recent completed quizzes
  const recentQuizzes = completedQuizzes.slice(-2).reverse();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white flex flex-col items-center px-6 py-10 overflow-hidden">
      {/* Profile Icon */}
      <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-white/20 mb-4">
        <User size={48} />
      </div>

      {/* Name & Email */}
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-white/90 mb-10 text-sm">{user.email}</p>

      {/* Completed Quiz Section */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-start mb-3">
          <h3 className="text-lg font-semibold">Completed Quizzes</h3>
        </div>

        {recentQuizzes.length > 0 ? (
          <div className="flex flex-col gap-3">
            {recentQuizzes.map((quiz, index) => (
              <button
                key={index}
                onClick={() => navigate("/quiz")}
                className="w-full bg-gradient-to-r from-[#434799] to-[#747AF5] py-3 rounded-xl text-left px-5 font-medium hover:scale-105 transition-transform"
              >
                {quiz.subject} Quiz — {quiz.score}%
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/80 italic">
            No completed quizzes yet.
          </p>
        )}
      </div>

      {/* Achievements Section */}
      <div className="w-full max-w-md">
        <div className="flex justify-start mb-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
        </div>

        {/* Trophy + Star Buttons */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform">
            <Trophy size={24} />
            Champion
          </button>

          <button className="flex items-center gap-2 bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform">
            <Star size={24} />
            Top 10%
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
