import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="smit-footer-gradient text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="mb-4">
                <span className="font-display font-black text-2xl text-white tracking-tight">
                  SM<span className="text-smit-green">i</span>T
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering Pakistan's youth with world-class IT education and training programs to build a brighter digital future.
              </p>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-smit-blue shrink-0" /><span>A-25, Bahadurabad Chowrangi, Karachi</span></div>
                <div className="flex items-center gap-2"><Phone size={16} className="text-smit-blue shrink-0" /><span>+92 111 729 526</span></div>
                <div className="flex items-center gap-2"><Mail size={16} className="text-smit-blue shrink-0" /><span>info@saylaniwelfare.com</span></div>
              </div>
              <div className="flex gap-3 mt-6">
                {['FB', 'X', 'IG', 'IN', 'YT'].map((label, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold hover:bg-smit-blue transition-colors">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['Home', 'Courses', 'Apply Now', 'Download ID Card', 'Check Results'].map(link => (
                  <li key={link}><Link to="/" className="hover:text-smit-blue transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Our Courses</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['Flutter App Development', 'AI & Chatbot', 'Python Programming', 'CCTV Camera Installation', 'Graphic Designing'].map(link => (
                  <li key={link}><Link to="/courses" className="hover:text-smit-blue transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/login" className="hover:text-smit-blue transition-colors font-semibold">Admin Portal</Link></li>
                {['FAQ', 'Privacy Policy', 'Contact Us', 'Terms of Service'].map(link => (
                  <li key={link}><a href="#" className="hover:text-smit-blue transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <span>&copy; 2003-{new Date().getFullYear()} <span className="text-smit-blue font-semibold">Saylani Mass IT Training</span>. All rights reserved.</span>
            <div className="flex gap-6 mt-3 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}