import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Monitor, TrendingUp, DollarSign, Rocket, Award, Handshake, Play, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Admissions Open');
  const tabs = ['Admissions Open', 'Development', 'Designing', 'Networking', 'Vocational Training Courses'];

  const allCourses = [
    { id: 1, title: 'Skill Accelerator Bootcamp', description: 'Master high-demand technical skills in this intensive program.', duration: '4 months', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', category: 'Development', isOpen: true },
    { id: 2, title: 'Video Animation', description: 'Learn professional video editing and animation techniques.', duration: '3 months', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', category: 'Designing', isOpen: true },
    { id: 3, title: 'R/O Plant Operator', description: 'Technical training for industrial plant operations.', duration: '3 months', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', category: 'Vocational Training Courses', isOpen: true },
    { id: 4, title: 'Flutter App Development', description: 'Build cross-platform mobile apps with Flutter & Dart.', duration: '6 months', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', category: 'Development', isOpen: true },
    { id: 5, title: 'Cyber Security', description: 'Network security, ethical hacking and defense strategies.', duration: '4 months', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', category: 'Networking', isOpen: false },
    { id: 6, title: 'Graphic Designing', description: 'Visual communication using Adobe Suite.', duration: '3 months', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', category: 'Designing', isOpen: true },
  ];

  const filteredCourses = allCourses.filter(c => activeTab === 'Admissions Open' ? c.isOpen : c.category === activeTab);

  const features = [
    { icon: Monitor, title: 'Hands-On Training', sub: 'Real World Projects' },
    { icon: TrendingUp, title: '70% Success Rate', sub: 'Freelancing & Employment' },
    { icon: DollarSign, title: 'Affordable Education', sub: 'For Every Student' },
    { icon: Rocket, title: '100+ Startups', sub: 'Launched Globally' },
    { icon: Award, title: 'Global Recognition', sub: 'Certified by Tech Giants' },
    { icon: Handshake, title: "Largest Platform", sub: 'Pakistan\'s IT Growth' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-white pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-smit-blue/5 -skew-x-12 translate-x-1/4 -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-smit-green/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-smit-blue/10 text-smit-blue px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles size={14} /> New Admissions are Open for 2026
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-gray-900 leading-[1.05] tracking-tighter mb-8 shadow-sm">
              Building Pakistan's<br />
              <span className="text-smit-blue smit-blue-glow">Tech Future</span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Changing Lives. Building Careers. Shaping the Future. Join the largest free IT training program in Pakistan and master high-demand tech skills.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link to="/login" className="btn-smit w-full sm:w-auto px-10 py-5 text-sm sm:text-base flex items-center justify-center gap-3 text-white font-bold tracking-widest uppercase shadow-2xl hover:shadow-smit-blue/40 hover:-translate-y-1 transition-all">
                PORTAL LOGIN / SIGNUP <ArrowRight size={20} />
              </Link>
              <Link to="/courses" className="btn-smit-outline w-full sm:w-auto px-10 py-5 text-sm sm:text-base flex items-center justify-center gap-3 font-bold tracking-widest uppercase bg-white/80 backdrop-blur-sm hover:bg-white active:scale-95 transition-all">
                BROWSE COURSES
              </Link>
            </div>

            {/* Visual Social Proof / Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 lg:px-0">
              {[
                'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              ].map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white hover:scale-105 transition-all duration-500 cursor-pointer group relative">
                  <img src={src} alt="Student" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                  <div className="absolute inset-0 bg-smit-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="relative -mt-16 sm:-mt-24 z-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-xl bg-white/95">
            {[
              { label: 'Students Trained', value: '1,000,000+' },
              { label: 'Success Rate', value: '98%' },
              { label: 'IT Courses', value: '40+' },
              { label: 'Campuses', value: '25+' },
            ].map((stat, i) => (
              <div key={i} className="text-center group flex-1 w-full">
                <div className="text-4xl md:text-5xl font-display font-black text-smit-blue mb-2 transition-transform group-hover:scale-110 tracking-tighter">{stat.value}</div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="bg-gray-50 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="section-label mb-5">Core Features</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 leading-tight">
              Why Students Love <span className="text-smit-blue">SMIT Portal</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                  <div className="w-16 h-16 mb-6 bg-smit-blue-light rounded-2xl flex items-center justify-center text-smit-blue group-hover:bg-smit-blue group-hover:text-white transition-all shadow-inner">
                    <Icon size={30} />
                  </div>
                  <h4 className="font-display font-black text-xl text-gray-900 mb-2">{f.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{f.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== COURSES SECTION ========== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="section-label mb-5">Courses</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900">
                Browse Our <span className="text-smit-blue">Most Popular</span> Programs
              </h2>
            </div>
            <Link to="/courses" className="text-smit-blue font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
              View All Courses <ArrowRight size={20} />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mb-12 scroll-hide overflow-x-auto pb-4">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all tracking-wider ${
                  activeTab === tab
                    ? 'bg-smit-blue text-white shadow-xl shadow-smit-blue/30 scale-105'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab === 'Admissions Open' && <span className="mr-2">🔥</span>}
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredCourses.map(course => (
              <div key={course.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  {course.isOpen && (
                    <div className="absolute top-5 right-5 bg-smit-red text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg z-10 backdrop-blur-sm animate-pulse">
                      Admission Open
                    </div>
                  )}
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button className="bg-white text-smit-blue px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2">
                       <Play size={16} fill="currentColor" /> Preview Syllabus
                    </button>
                  </div>
                </div>
                <div className="p-8 sm:p-10">
                  <div className="text-[10px] font-black text-smit-blue uppercase tracking-[0.2em] mb-3">{course.category}</div>
                  <h3 className="font-display font-black text-2xl text-gray-900 mb-4 leading-snug group-hover:text-smit-blue transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm mb-8 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <Link to="/courses" className="btn-smit px-8 py-3.5 text-xs text-white font-bold tracking-widest uppercase rounded-2xl">
                      Enroll Now
                    </Link>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Duration</div>
                      <div className="text-gray-900 font-black text-sm">{course.duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LATEST SOCIALS ========== */}
      <section className="bg-[#F7F8FC] py-24 md:py-32">
        <div className="container mx-auto px-6 text-center mb-16">
          <span className="section-label mb-5 mx-auto">Latest Updates</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900">
             Follow Our <span className="text-smit-blue">Social Feed</span>
          </h2>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map(id => (
            <div key={id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group">
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-smit-blue flex items-center justify-center text-white font-black text-sm">S</div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Saylani Mass IT Training</h5>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Posted on Facebook</span>
                  </div>
                </div>
                <button className="text-smit-blue hover:scale-110 transition-transform">
                  <ExternalLink size={20} />
                </button>
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img src={`https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80&sig=${id}`} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-black tracking-widest border-2 border-white px-6 py-3 rounded-xl uppercase">Like & Share</span>
                </div>
              </div>
              <div className="p-8 text-left">
                <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6 line-clamp-3">
                  Alhamdulillah! SMIT has successfully completed the registration for the new Batch of Web & Mobile App Development. Congratulations to all selected candidates!
                </p>
                <div className="flex items-center gap-6 text-xs font-black text-gray-300">
                  <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-smit-blue" /> 2.4K Likes</span>
                  <span>142 Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="bg-smit-navy py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-smit-blue/10 -skew-y-6 translate-y-1/2" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter shadow-sm">
            Ready to Start Your <br className="hidden sm:block" />
            <span className="text-smit-green">IT Journey?</span>
          </h2>
          <p className="text-blue-200/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join 1 million+ students already learning and earning with SMIT. The best part? It's completely free for the youth of Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/courses" className="btn-smit-green w-full sm:w-auto px-12 py-5 text-base font-black tracking-widest uppercase hover:shadow-smit-green/40 shadow-2xl transition-all">
              Apply Now
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto px-12 py-5 rounded-2xl text-base font-black tracking-widest uppercase border border-white/20 transition-all">
              Our Vision
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}