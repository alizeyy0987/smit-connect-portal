import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (formData.username === 'admin' && formData.password === 'admin') {
        dispatch(setUser({ user: { id: 1, role: 'ADMIN', name: 'Super Admin' }, session: 'admin-session' }));
        toast.success('Admin authenticated successfully!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid admin credentials.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-smit-blue/10 rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck size={40} className="text-smit-blue" />
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">Admin Portal</h2>
          <p className="text-sm text-gray-500 mt-1">Authorized personnel only</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Username *</label>
              <input
                required type="text" placeholder="admin"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Password *</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button disabled={isLoading} className="w-full bg-smit-navy hover:bg-smit-blue text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center mt-6">
              {isLoading ? <Loader2 className="animate-spin" /> : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}