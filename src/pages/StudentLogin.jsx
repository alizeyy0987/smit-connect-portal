import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function StudentLogin() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    cnic: '',
    rollNumber: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
        const { data: validStudent, error: checkError } = await supabase
          .from('students').select('*')
          .eq('cnic', formData.cnic).eq('rollNumber', formData.rollNumber).single();

        if (checkError || !validStudent) {
          toast.error('You are not authorized by Admin. CNIC or Roll Number not found.');
          setIsLoading(false);
          return;
        }

        const dummyEmail = `${formData.rollNumber.toLowerCase()}@smit.edu.pk`;
        const { data: authData, error: signupError } = await supabase.auth.signUp({
          email: dummyEmail, password: formData.password,
          options: { data: { role: 'STUDENT', name: validStudent.name, cnic: validStudent.cnic, rollNumber: validStudent.rollNumber } }
        });

        if (signupError) {
          if (signupError.message.includes('fetch')) throw new Error('mock');
          toast.error(signupError.message);
        } else {
          dispatch(setUser({ user: { id: authData.user?.id || Date.now(), role: 'STUDENT', name: validStudent.name }, session: authData.session }));
          toast.success('Successfully Registered!');
          navigate('/student/dashboard');
        }
      } else {
        const dummyEmail = `${formData.rollNumber.toLowerCase()}@smit.edu.pk`;
        const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({ email: dummyEmail, password: formData.password });

        if (loginError) {
          if (loginError.message.includes('fetch')) throw new Error('mock');
          toast.error('Invalid Credentials');
        } else {
          dispatch(setUser({ user: { id: authData.user?.id, role: 'STUDENT', name: authData.user?.user_metadata?.name || 'Student' }, session: authData.session }));
          toast.success('Welcome back!');
          navigate('/student/dashboard');
        }
      }
    } catch {
      if (formData.cnic.length > 5 && formData.rollNumber.length > 2) {
        dispatch(setUser({ user: { id: 1, role: 'STUDENT', name: 'Student (Mock)' }, session: 'dummy' }));
        toast.success(`${activeTab === 'login' ? 'Logged in' : 'Registered'} (Local Mock)`);
        navigate('/student/dashboard');
      } else {
        toast.error('Invalid credentials.');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        {/* SMIT Logo Header */}
        <div className="text-center mb-8">
          <div className="font-display font-black text-4xl text-smit-blue tracking-tight mb-2">
            SM<span className="text-smit-green">i</span>T
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">Saylani Mass IT Training</p>
          <h2 className="font-display font-bold text-xl text-gray-800 mt-3">Student Portal</h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3.5 text-sm font-bold transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-gray-900 border-b-2 border-smit-blue'
                : 'bg-gray-50 text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3.5 text-sm font-bold transition-colors ${
              activeTab === 'signup'
                ? 'bg-white text-gray-900 border-b-2 border-smit-blue'
                : 'bg-gray-50 text-gray-500 hover:text-gray-700'
            }`}
          >
            Create Password
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="font-display font-bold text-lg text-gray-900">
              {activeTab === 'login' ? 'Login' : 'Create Password'}
            </h3>
            <p className="text-sm text-smit-blue mt-1">
              {activeTab === 'login'
                ? 'Kindly provide the CNIC number and password used during SMIT course registration.'
                : 'Register using your CNIC and Roll Number assigned by Admin.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">CNIC *</label>
              <input
                required type="text" placeholder="4210159944290"
                value={formData.cnic}
                onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                className="input-field"
              />
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Roll Number *</label>
                <input
                  required type="text" placeholder="WM-12345"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="input-field"
                />
              </div>
            )}

            {activeTab === 'login' && (
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Roll Number</label>
                <input
                  required type="text" placeholder="WM-12345"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="input-field"
                />
              </div>
            )}

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

            <button disabled={isLoading} className="w-full btn-smit py-3.5 text-base mt-4 flex items-center justify-center">
              {isLoading ? <Loader2 className="animate-spin" /> : activeTab === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}