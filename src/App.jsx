import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/admin/CourseManagement';
import StudentManagement from './pages/admin/StudentManagement';
import LeaveManagementAdmin from './pages/admin/LeaveManagementAdmin';
import StudentDashboard from './pages/student/StudentDashboard';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        {/* Unified Auth Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/student/login" element={<Navigate to="/login" replace />} />
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />

        {/* Student Panel */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="leaves" element={<LeaveManagementAdmin />} />
      </Route>

      {/* Redirect everything else to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;