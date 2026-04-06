import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses', hasDropdown: true },
    { name: 'Campuses', path: '/campuses' },
    { name: 'Check Result', path: '/result' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* SMIT Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0" onClick={() => setIsMenuOpen(false)}>
          <span className="font-display font-black text-2xl md:text-3xl tracking-tighter text-smit-blue">
            SM<span className="text-smit-green">i</span>T
          </span>
          <span className="hidden sm:inline-block text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none border-l border-gray-200 pl-2">
            Saylani Mass<br />IT Training
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive ? 'text-smit-blue bg-smit-blue/5' : 'text-gray-600 hover:text-smit-blue hover:bg-gray-50'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="opacity-50" />}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 mr-2">
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="text-sm font-bold text-gray-700 hover:text-smit-blue transition-colors"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {isAuthenticated ? (
            <Link
              to={user?.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'}
              className="bg-smit-blue hover:bg-smit-blue-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95"
            >
              Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              to="/courses"
              className="bg-smit-blue hover:bg-smit-blue-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95"
            >
              Enroll Now <ArrowRight size={16} />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-smit-blue transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-4 duration-300 z-50 overflow-hidden">
          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-4 rounded-xl text-base font-bold ${
                  location.pathname === link.path ? 'bg-smit-blue/5 text-smit-blue' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
                <ChevronDown size={14} className="opacity-30 rotate-[-90deg]" />
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-1 gap-3">
              {!isAuthenticated && (
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center p-4 rounded-xl text-base font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}