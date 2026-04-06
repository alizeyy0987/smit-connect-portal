import CourseCard from "../components/CourseCard";

const courses = [
  { id: 1, name: "Web Development", status: "Open" },
  { id: 2, name: "Cloud Data Engineering", status: "Open" },
  { id: 3, name: "Data Science", status: "Close" },
  { id: 4, name: "AI & Machine Learning", status: "Open" },
  { id: 5, name: "Digital Marketing", status: "Open" },
  { id: 6, name: "Graphic Designing", status: "Open" },
  { id: 7, name: "UI/UX Designing With AI", status: "Open" },
  { id: 8, name: "Video Editing", status: "Open" },
  { id: 9, name: "Mobile App Development", status: "Open" },
  { id: 10, name: "Shopify and Ecommerce", status: "Open" },
];

export default function Courses() {
  const handleApply = (course) => {
    alert(`Applying for ${course.name}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onApply={handleApply}
        />
      ))}
    </div>
  );
}