import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ApplyModal({ course, student, onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from("applications").insert([
        {
          student_id: student.id,
          course_id: course.id,
        },
      ]);

      if (error) {
        setMessage(" Error applying");
      } else {
        setMessage(" Applied successfully!");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Saylani_logo.png"
            alt="logo"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-xl font-bold text-center mb-2">
          Apply for Course
        </h2>

        <p className="text-center text-gray-600 mb-4">
          {course.name}
        </p>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-3 text-sm">{message}</p>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-3 border py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}