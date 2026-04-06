import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { Loader2, Eye, EyeOff, ShieldCheck, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    cnic: '', 
    name: '',
    rollNumber: '', 
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
        // --- STUDENT SIGNUP ONLY ---
        // Validate if student is authorized by admin
        const { data: validStudent, error: checkError } = await supabase
          .from('students').select('*')
          .eq('cnic', formData.cnic).eq('rollNumber', formData.rollNumber).maybeSingle();

        if (checkError || !validStudent) {
          toast.error('CNIC or Roll Number not found. Contact Admin for authorization.');
          setIsLoading(false);
          return;
        }

        const dummyEmail = `${formData.rollNumber.toLowerCase()}@smit.edu.pk`;
        const { data: authData, error: signupError } = await supabase.auth.signUp({
          email: dummyEmail, 
          password: formData.password,
          options: { 
            data: { 
              role: 'STUDENT', // Default role is always student
              name: validStudent.name, 
              cnic: validStudent.cnic, 
              rollNumber: validStudent.rollNumber 
            } 
          }
        });

        if (signupError) {
          if (signupError.message.includes('fetch')) throw new Error('mock');
          toast.error(signupError.message);
        } else {
          dispatch(setUser({ 
            user: { id: authData.user?.id || Date.now(), role: 'STUDENT', name: validStudent.name }, 
            session: authData.session 
          }));
          toast.success('Account created successfully!');
          navigate('/student/dashboard');
        }
      } else {
        

        let loginIdentifier = isAdminLogin ? formData.username : `${formData.rollNumber.toLowerCase()}@smit.edu.pk`;

        const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({ 
          email: loginIdentifier, 
          password: formData.password 
        });

        if (loginError) {
          if (loginError.message.includes('fetch')) throw new Error('mock');
          toast.error('Invalid Credentials');
        } else {
          // Check role from metadata after successful login
          const role = authData.user?.user_metadata?.role || 'STUDENT';
          const name = authData.user?.user_metadata?.name || (role === 'ADMIN' ? 'Administrator' : 'Student');

          dispatch(setUser({ 
            user: { id: authData.user?.id, role: role, name: name }, 
            session: authData.session 
          }));

          toast.success(`Welcome ${name}!`);
          if (role === 'ADMIN') {
            navigate('/admin/dashboard');
          } else {
            navigate('/student/dashboard');
          }
        }
      }
    } catch {
      // Local Mock Fallback
      if (isAdminLogin) {
        if (formData.username && formData.password) {
          dispatch(setUser({ user: { id: 'admin-id', role: 'ADMIN', name: 'Administrator' }, session: 'mock' }));
          toast.success('Admin Logged in (Local Mode)');
          navigate('/admin/dashboard');
        } else toast.error('Please enter Admin credentials');
      } else if (formData.cnic.length > 5 && formData.rollNumber.length > 2) {
        dispatch(setUser({ user: { id: 1, role: 'STUDENT', name: 'Student (Mock)' }, session: 'mock' }));
        toast.success('Logged in as Student (Local Mode)');
        navigate('/student/dashboard');
      } else {
        toast.error('Invalid credentials.');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 bg-[#F7F8FC]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-display font-black text-4xl text-smit-blue tracking-tight mb-2">
            SM<span className="text-smit-green">i</span>T
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">Connect Portal</p>
        </div>

        {/* Unified Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          {/* Admin Switcher (Only if Not Sign-up) */}
          {activeTab === 'login' && (
            <div className="flex border-b border-gray-100 p-1 bg-gray-50/50">
              <button
                onClick={() => setIsAdminLogin(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                  !isAdminLogin ? 'bg-white text-smit-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                 <User size={14} /> Student Login
              </button>
              <button
                onClick={() => setIsAdminLogin(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                  isAdminLogin ? 'bg-smit-navy text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <ShieldCheck size={14} /> Login as Admin
              </button>
            </div>
          )}

          {/* Student Tabs (Show Only if Not Admin Login) */}
          {!isAdminLogin && (
            <div className="flex bg-white/100 border-b border-gray-100 shadow-sm">
              <button
                onClick={() => { setActiveTab('login'); setIsAdminLogin(false); }}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                  activeTab === 'login' ? 'border-smit-blue text-smit-blue bg-white' : 'border-transparent text-gray-400 bg-gray-50/30'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setActiveTab('signup'); setIsAdminLogin(false); }}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                  activeTab === 'signup' ? 'border-smit-blue text-smit-blue bg-white' : 'border-transparent text-gray-400 bg-gray-50/30'
                }`}
              >
                Create Password
              </button>
            </div>
          )}

          {/* Login/Signup Body */}
          <div className="p-8">
            <div className="mb-8">
              <h3 className="font-display font-bold text-xl text-gray-900">
                {isAdminLogin ? 'Welcome Back, Admin' : (activeTab === 'login' ? 'Welcome Back' : 'Get Started')}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isAdminLogin ? 'Sign in to access student management tools.' : (activeTab === 'login' ? 'Sign in to your student account.' : 'Enroll by creating your account password.')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isAdminLogin ? (
                // --- ADMIN LOGIN FIELDS ---
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Username / Email</label>
                  <input
                    required type="text" placeholder="admin@smit.edu.pk"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="input-field"
                  />
                </div>
              ) : (
                // --- STUDENT LOGIN/SIGNUP FIELDS ---
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">CNIC Number</label>
                    <input
                      required type="text" placeholder="No dashes (-)"
                      value={formData.cnic}
                      onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Roll Number</label>
                    <input
                      required type="text" placeholder="e.g., WM-12345"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Password</label>
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

              <button 
                disabled={isLoading} 
                className={`w-full py-4 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isAdminLogin ? 'bg-smit-navy text-white hover:opacity-90' : 'btn-smit hover:translate-y-[-1px]'
                }`}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  isAdminLogin ? 'ENTER ADMIN PORTAL' : (activeTab === 'login' ? 'LOGIN TO DASHBOARD' : 'CREATE MY ACCOUNT')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}