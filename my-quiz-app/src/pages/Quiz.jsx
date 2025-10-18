import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(30);

  const navigate = useNavigate();

  // ✅ Fetch 10 Art questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple"
            )
        );

        const data = await response.json();
        const trivia = JSON.parse(data.contents);

        console.log("API response:", trivia);

        if (trivia.response_code === 0 && trivia.results.length > 0) {
          setQuestions(trivia.results);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ⏱ Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setTimer(30);
      }
    }
  }, [timer, currentQuestion, questions.length]);

  if (loading)
    return <p className="text-white text-center mt-10">Loading questions...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  const current = questions[currentQuestion];
  const allOptions = [...current.incorrect_answers, current.correct_answer].sort();

  // ✅ Handle option select
  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: option,
    });
  };

  // ✅ Navigation buttons
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimer(30);
    }
  };

  // ✅ Submit quiz
  const handleSubmit = () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_answer) {
        score++;
      }
    });

    navigate("/answer", {
      state: {
        score,
        total: questions.length,
        selectedAnswers,
        questions,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Timer in top-right */}
      <div className="absolute top-4 right-4">
        <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/30 transition">
          <Clock size={20} />
          <span>{timer}s</span>
        </button>
      </div>

      {/* Question Label */}
      <h2 className="text-3xl font-bold mb-4">
        Question {currentQuestion + 1}
      </h2>

      {/* Question Text */}
      <h3 className="text-xl font-semibold text-center mb-6 px-4">
        {decodeURIComponent(current.question)}
      </h3>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {allOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`px-4 py-2 rounded-lg border text-left ${
              selectedAnswers[currentQuestion] === option
                ? "bg-[#434799]"
                : "bg-white/20 hover:bg-white/30"
            } transition`}
          >
            {decodeURIComponent(option)}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-md mt-8">
        <button
          onClick={handlePrevious}
          className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-2 rounded-lg hover:opacity-90"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-br from-[#434799] to-[#747AF5] px-6 py-2 rounded-lg hover:opacity-90"
        >
          Next
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-8 bg-gradient-to-br from-[#434799] to-[#747AF5] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        Submit
      </button>
    </div>
  );
}

export default Quiz;
