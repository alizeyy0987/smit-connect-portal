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
    username: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
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
              role: 'STUDENT', 
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

        // 🔥 ADMIN LOGIN FIX
        if (isAdminLogin) {
          if (formData.username === "admin" && formData.password === "123456") {
            dispatch(setUser({
              user: { id: Date.now(), role: "ADMIN", name: "Administrator" },
              session: null
            }));
            toast.success("Welcome Admin!");
            navigate("/admin/dashboard");
          } else {
            toast.error("Invalid Admin Credentials");
          }
          setIsLoading(false);
          return;
        }

        // ✅ STUDENT LOGIN (SUPABASE)
        let loginIdentifier = `${formData.rollNumber.toLowerCase()}@smit.edu.pk`;

        const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({ 
          email: loginIdentifier, 
          password: formData.password 
        });

        if (loginError) {
          if (loginError.message.includes('fetch')) throw new Error('mock');
          toast.error('Invalid Credentials');
        } else {
          const role = authData.user?.user_metadata?.role || 'STUDENT';
          const name = authData.user?.user_metadata?.name || 'Student';

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
        <div className="text-center mb-10">
          <div className="font-display font-black text-4xl text-smit-blue tracking-tight mb-2">
            SM<span className="text-smit-green">i</span>T
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">Connect Portal</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          
          {activeTab === 'login' && (
            <div className="flex border-b border-gray-100 p-1 bg-gray-50/50">
              <button onClick={() => setIsAdminLogin(false)}>Student Login</button>
              <button onClick={() => setIsAdminLogin(true)}>Admin Login</button>
            </div>
          )}

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {isAdminLogin ? (
                <input
                  required
                  type="text"
                  placeholder="admin"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              ) : (
                <>
                  <input
                    required
                    type="text"
                    placeholder="CNIC"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Roll Number"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  />
                </>
              )}

              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <button type="submit">
                {isLoading ? 'Loading...' : 'Login'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}