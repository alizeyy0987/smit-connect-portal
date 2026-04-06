import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">
        SMIT Portal
      </h1>

      {/* Links */}
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="hover:text-gray-200">Home</Link>
        </li>

        <li>
          <Link to="/courses" className="hover:text-gray-200">Courses</Link>
        </li>

        <li>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
        </li>

        <li>
          <Link to="/signup" className="hover:text-gray-200">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}