import React from "react";

export default function CourseCard({ course, onApply }) {
  const isClosed = course.status?.toLowerCase() === "close";

  return (
    <div className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300 bg-white">
      
      {/* Course Name */}
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {course.name}
      </h2>

      {/* Status */}
      <p
        className={`text-sm mb-4 font-medium ${
          isClosed ? "text-red-500" : "text-green-600"
        }`}
      >
        {isClosed ? "Admissions Closed" : "Admissions Open"}
      </p>

      {/* Apply Button */}
      <button
        disabled={isClosed}
        onClick={() => onApply(course)}
        className={`w-full py-2 rounded-xl text-white font-medium transition ${
          isClosed
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isClosed ? "Closed" : "Apply Now"}
      </button>
    </div>
  );
}