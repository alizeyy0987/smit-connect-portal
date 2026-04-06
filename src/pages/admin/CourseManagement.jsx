import { useState } from 'react';
import { Plus, Edit2, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CourseManagement() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Web and Mobile App Development', status: 'Open' },
    { id: 2, name: 'Graphic Designing', status: 'Closed' },
    { id: 3, name: 'Python Programming', status: 'Open' },
    { id: 4, name: 'AI & Chatbot Development', status: 'Open' },
    { id: 5, name: 'Flutter App Development', status: 'Open' },
    { id: 6, name: 'Cyber Security', status: 'Closed' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Open' });

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ name: course.name, status: course.status });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({ name: '', status: 'Open' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
      toast.success('Course updated successfully');
    } else {
      setCourses([...courses, { id: Date.now(), ...formData }]);
      toast.success('New course added');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit, and manage course statuses</p>
        </div>
        <button onClick={handleAdd} className="mt-4 sm:mt-0 btn-smit px-5 py-2.5 text-sm flex items-center gap-2">
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">#</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course, idx) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-400 font-medium">{idx + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{course.name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    course.status === 'Open'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {course.status === 'Open' ? '● Open' : '● Closed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(course)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-smit-blue/10 text-smit-blue hover:bg-smit-blue hover:text-white text-xs font-bold transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-display font-bold text-lg text-gray-900">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Course Name *</label>
                <input
                  required type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Course Status *</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="input-field"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg font-semibold text-gray-500 hover:bg-gray-100 transition-colors text-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-smit px-6 py-2.5 text-sm">
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}