import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, BookOpen, Users, FileText, LayoutDashboard, Menu, X, ArrowLeft, Bell, Search } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Leave Requests', path: '/admin/leaves', icon: FileText },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  // Dummy stats for the top bar
  const quickStats = [
    { label: 'Total Students', value: '1,240', color: 'text-smit-blue' },
    { label: 'Pending Leaves', value: '12', color: 'text-orange-500' },
    { label: 'Open Admissions', value: '8', color: 'text-smit-green' },
  ];

  return (
    <div className="min-h-screen flex bg-[#F7F8FC] relative">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Overlay (Mobile) / Side Bar (Desktop) */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col shadow-2xl lg:shadow-none z-50 transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="flex flex-col" onClick={closeSidebar}>
            <span className="font-display font-black text-3xl text-smit-blue tracking-tighter leading-none">
              SM<span className="text-smit-green">i</span>T
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mt-2 uppercase">Official Admin</span>
          </Link>
          <button className="lg:hidden p-2 text-gray-400 hover:text-gray-900" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  isActive 
                    ? 'bg-smit-blue text-white shadow-lg shadow-smit-blue/20' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} />
                <span>{item.name}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 space-y-3">
          <Link to="/" className="flex items-center gap-3 px-5 py-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-bold text-[10px] uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Back to Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-4 w-full rounded-xl hover:bg-red-50 text-red-600 font-bold text-sm transition-all shadow-sm hover:shadow-md">
            <LogOut size={20} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Desktop Top Header with Stats */}
        <header className="hidden lg:flex h-20 bg-white border-b border-gray-100 items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-10">
             {quickStats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                   <span className={`text-lg font-black ${stat.color}`}>{stat.value}</span>
                </div>
             ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Quick search..." className="bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 text-xs font-medium w-64 focus:ring-2 focus:ring-smit-blue/20" />
            </div>
            <button className="text-gray-400 hover:text-smit-blue p-2 rounded-lg bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{user?.name || 'Admin'}</div>
                  <div className="text-[10px] font-bold text-smit-green uppercase tracking-widest">Super Admin</div>
               </div>
               <div className="w-10 h-10 rounded-xl bg-smit-blue flex items-center justify-center text-white font-black text-sm shadow-lg shadow-smit-blue/20">A</div>
            </div>
          </div>
        </header>

        {/* Mobile Top Header */}
        <header className="lg:hidden h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600 hover:text-smit-blue transition-colors">
            <Menu size={28} />
          </button>
          <span className="font-display font-black text-2xl text-smit-blue">SM<span className="text-smit-green">i</span>T</span>
          <div className="w-10 h-10 rounded-xl bg-smit-blue/10 flex items-center justify-center text-smit-blue font-bold text-xs uppercase border border-smit-blue/20">Admin</div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}