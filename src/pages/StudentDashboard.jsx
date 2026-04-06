import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const student = JSON.parse(localStorage.getItem("student"));

  // Fetch Courses
  const fetchCourses = async () => {
    let { data, error } = await supabase.from("course").select("*");

    if (!error) {
      setCourses(data);
    }
  };

  // Apply Course
  const applyCourse = async (courseId) => {
    setLoading(true);

    const { error } = await supabase.from("applications").insert([
      {
        student_id: student-uuid-id,
        course_id: course-uuid-id,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Already Applied or Error!");
    } else {
      alert("Applied Successfully!");
    }
  };

  // Fetch Leaves
  const fetchLeaves = async () => {
    let { data, error } = await supabase
      .from("leaves")
      .select("*")
      .eq("student_id", student.id);

    if (!error) {
      setLeaves(data);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchLeaves();
  }, []);

  // Submit Leave
  const submitLeave = async (e) => {
    e.preventDefault();

    const form = e.target;
    const reason = form.reason.value;
    const from_date = form.from_date.value;
    const to_date = form.to_date.value;

    const { error } = await supabase.from("leaves").insert([
      {
        student_id: student.id,
        reason,
        from_date,
        to_date,
        status: "pending",
      },
    ]);

    if (error) {
      alert("Error submitting leave");
    } else {
      alert("Leave Submitted!");
      form.reset();
      fetchLeaves();
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("student");
    window.location.href = "/login";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
      >
        Logout
      </button>

      {/* Courses Section */}
      <h2 className="text-2xl font-semibold mb-4">Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{course.name}</h3>

            <button
              disabled={course.status === "closed"}
              onClick={() => applyCourse(course.id)}
              className={`mt-3 px-4 py-2 rounded text-white ${
                course.status === "closed"
                  ? "bg-gray-400"
                  : "bg-blue-500"
              }`}
            >
              {course.status === "closed" ? "Closed" : "Apply"}
            </button>
          </div>
        ))}
      </div>

      {/* Leave Form */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Submit Leave
      </h2>

      <form onSubmit={submitLeave} className="space-y-3">
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          name="from_date"
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          name="to_date"
          required
          className="border p-2 w-full rounded"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Submit Leave
        </button>
      </form>

      {/* Leaves List */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        My Leaves
      </h2>

      <div className="space-y-3">
        {leaves.map((leave) => (
          <div key={leave.id} className="border p-3 rounded">
            <p><b>Reason:</b> {leave.reason}</p>
            <p>
              <b>Date:</b> {leave.from_date} → {leave.to_date}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`${
                  leave.status === "approved"
                    ? "text-green-600"
                    : leave.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {leave.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}