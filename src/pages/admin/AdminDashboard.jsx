import { useState } from 'react';
import { UserPlus, KeyRound, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [resetData, setResetData] = useState({ oldPassword: '', newPassword: '' });
  const [adminData, setAdminData] = useState({ name: '', username: '', password: '' });
  const [isResetting, setIsResetting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setIsResetting(true);
    setTimeout(() => {
      setIsResetting(false);
      toast.success('Password updated successfully');
      setResetData({ oldPassword: '', newPassword: '' });
    }, 1000);
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      toast.success('New admin added successfully');
      setAdminData({ name: '', username: '', password: '' });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and add new administrators</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Reset Password Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-smit-blue/10 rounded-lg flex items-center justify-center text-smit-blue">
              <KeyRound size={20} />
            </div>
            <h2 className="font-display font-bold text-lg text-gray-900">Password Reset</h2>
          </div>

          <form onSubmit={handlePasswordReset} className="p-6 space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Old Password</label>
              <input
                required type="password"
                value={resetData.oldPassword}
                onChange={e => setResetData({ ...resetData, oldPassword: e.target.value })}
                className="input-field"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">New Password</label>
              <input
                required type="password"
                value={resetData.newPassword}
                onChange={e => setResetData({ ...resetData, newPassword: e.target.value })}
                className="input-field"
                placeholder="Enter new password"
              />
            </div>
            <button
              disabled={isResetting}
              type="submit"
              className="w-full bg-smit-navy hover:bg-smit-blue text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {isResetting ? <Loader2 className="animate-spin" size={20} /> : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Add New Admin Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-smit-green/10 rounded-lg flex items-center justify-center text-smit-green">
              <UserPlus size={20} />
            </div>
            <h2 className="font-display font-bold text-lg text-gray-900">Add New Admin</h2>
          </div>

          <form onSubmit={handleAddAdmin} className="p-6 space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Name</label>
              <input
                required type="text"
                value={adminData.name}
                onChange={e => setAdminData({ ...adminData, name: e.target.value })}
                className="input-field"
                placeholder="Enter admin name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Username</label>
              <input
                required type="text"
                value={adminData.username}
                onChange={e => setAdminData({ ...adminData, username: e.target.value })}
                className="input-field"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Password</label>
              <input
                required type="password"
                value={adminData.password}
                onChange={e => setAdminData({ ...adminData, password: e.target.value })}
                className="input-field"
                placeholder="Create a strong password"
              />
            </div>
            <button
              disabled={isAdding}
              type="submit"
              className="w-full btn-smit py-3 flex items-center justify-center"
            >
              {isAdding ? <Loader2 className="animate-spin" size={20} /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}