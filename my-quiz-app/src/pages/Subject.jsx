import React from "react";
import { useNavigate } from "react-router-dom";

function Subject() {
  const navigate = useNavigate();

  const subjects = [
    { name: "Science", id: 17 },
    { name: "Maths", id: 19 },
    { name: "Sport", id: 21 },
    { name: "Art", id: 25 },
    { name: "English", id: 9 },
    { name: "History", id: 23 },
  ];

  const handleMoreSubjects = () => {
    alert("More subjects coming soon!");
  };

  const handleSubjectClick = (subject) => {
    navigate("/quiz", { state: { categoryId: subject.id, subjectName: subject.name } });
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] text-white overflow-hidden px-6 py-6 flex flex-col">
      {/* Top-left greeting */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Hello Star,</h2>
        <p className="text-lg md:text-xl">Choose your interest</p>
      </div>

      {/* Subject Boxes */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 flex-grow">
        {subjects.map((subject, index) => (
          <div
            key={index}
            onClick={() => handleSubjectClick(subject)}
            className="bg-gradient-to-br from-[#434799] to-[#747AF5] backdrop-blur-md rounded-2xl p-6 w-25 h-25 md:w-40 md:h-36 flex items-center justify-center text-center shadow-md text-sm md:text-lg font-bold uppercase cursor-pointer hover:bg-white/30 hover:scale-105 transition-transform duration-300"
          >
            {subject.name}
          </div>
        ))}
      </div>

      {/* More Subjects Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleMoreSubjects}
          className="bg-gradient-to-br from-[#434799] to-[#747AF5] text-white px-6 py-2 rounded-full font-semibold text-sm md:text-base shadow-lg hover:scale-105 transition-transform duration-200"
        >
          More Subjects
        </button>
      </div>
    </div>
  );
}

export default Subject;
