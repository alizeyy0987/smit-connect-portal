import { useState } from 'react';
import { X, Search, Loader2, Filter, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Courses() {
  const categories = ['All Categories', 'Blockchain', 'Designing', 'Development', 'Entrepreneurship', 'Language', 'Networking', 'Vocational Training Courses'];
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const [courses] = useState([
    { id: 1, title: 'Flutter App Development with AI', description: 'Flutter, Dart, Firebase, Riverpod, State Builders, Operators, Animation...', duration: '6 months', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Development', location: 'Karachi' },
    { id: 2, title: 'IT Professional', description: 'A comprehensive program for computer and IT professionals.', duration: '6 months', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Networking', location: 'Islamabad' },
    { id: 3, title: 'AI & Chatbot Development', description: 'Build cutting edge applications using AI, automation, Amazon...', duration: '4 months', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Development', location: 'Lahore' },
    { id: 4, title: 'Python Programming', description: 'An introduction to programming and the Python language is provided in...', duration: '4 months', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Development', location: 'Karachi' },
    { id: 5, title: 'CCTV Camera Installation', description: 'CCTV Installation training covering wiring, configuration, and monitoring.', duration: '3 months', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Closed', category: 'Vocational Training Courses', location: 'Karachi' },
    { id: 6, title: 'Generative AI & Chatbot', description: 'Learn to create, run, and build ChatGPT-like Chatbots using AI, Data Flow, Meta, Slack, Alexa, Apps, Google DR.', duration: '4 months', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Development', location: 'Islamabad' },
    { id: 7, title: 'Graphic Designing', description: 'Master Adobe Photoshop, Illustrator, Figma and visual communication.', duration: '3 months', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Designing', location: 'Karachi' },
    { id: 8, title: 'Cyber Security', description: 'Enterprise network security concepts for implementing security protocols.', duration: '4 months', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Networking', location: 'Lahore' },
    { id: 9, title: 'Video Animation', description: 'The video editor is responsible for adding effects, transitions, formats...', duration: '3 months', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'Open', category: 'Designing', location: 'Karachi' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All Categories' || course.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedCourse(null);
      toast.success('Application submitted successfully!');
    }, 1500);
  };

  return (
    <div>
      {/* Teal Gradient Header */}
      <div className="smit-gradient-header py-12 px-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Link to="/" className="hover:text-white transition-colors">🏠</Link>
            <span>/</span>
            <span className="text-white font-medium">Courses</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Explore Our Courses</h1>
          <p className="text-white/70 mt-2">Discover world-class IT training programs designed to transform your career</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-smit-blue font-display font-bold text-lg mb-4">
                <Filter size={18} />
                Filters
              </div>

              <div className="text-sm text-gray-500 mb-4">{filteredCourses.length} Courses Found</div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Search Courses</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by course name..."
                    className="input-field pl-10 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* Category List */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">Course Categories</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategory('All Categories')}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                      activeCategory === 'All Categories'
                        ? 'bg-smit-blue text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {activeCategory === 'All Categories' && <span>✦</span>}
                    Admissions Open
                  </button>
                  {categories.filter(c => c !== 'All Categories').map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === cat
                          ? 'bg-smit-blue text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-display font-bold text-sm text-blue-900 mb-2">💡 Quick Tip</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Enable "Admissions Open" filter to see all available courses where applications are currently accepted.
              </p>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-gray-900">All Courses</h2>
              <span className="text-sm text-gray-500">Showing {filteredCourses.length} of {courses.length} courses</span>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <div key={course.id} className="card overflow-hidden group flex flex-col h-full">
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      {course.status === 'Open' ? (
                        <div className="absolute top-3 right-3 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded shadow z-10">
                          Admissions Open
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 bg-gray-600 text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded shadow z-10">
                          Closed
                        </div>
                      )}
                      <img
                        src={course.image}
                        alt={course.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${course.status === 'Closed' ? 'grayscale opacity-70' : ''}`}
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-display font-bold text-base text-gray-900 mb-1.5 leading-snug">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {course.location}</span>
                      </div>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-5 leading-relaxed">
                        {course.description}
                      </p>
                      <div className="mt-auto">
                        {course.status === 'Open' ? (
                          <button onClick={() => setSelectedCourse(course)} className="btn-smit w-full py-2.5 text-sm">
                            Enroll Now
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-100 text-gray-400 font-semibold py-2.5 rounded-lg text-sm cursor-not-allowed">
                            Admissions Closed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <p className="font-bold text-gray-600 mb-1">No Courses Found</p>
                  <p className="text-gray-400 text-sm">Try a different search or category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====== ADMISSION FORM POPUP ====== */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCourse(null)} />

          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 my-10">
            {/* Teal Header */}
            <div className="smit-gradient-header rounded-t-2xl p-8 relative">
              <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition bg-white/10 p-2 rounded-full">
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <span>🏠</span> / <span className="text-white">Enroll Now</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Registration Form</h2>
              <p className="text-white/70 mt-2 text-sm">
                Start your journey towards excellence. Fill out the form to apply for <strong className="text-white">{selectedCourse.title}</strong>.
              </p>
            </div>

            <form onSubmit={handleApply} className="p-8 space-y-8">
              {/* Section: Location & Course Details */}
              <div>
                <h3 className="font-display font-bold text-lg text-smit-blue flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 bg-smit-blue text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Location & Course Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Select Country *</label>
                    <select className="input-field">
                      <option>Pakistan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Select City *</label>
                    <select className="input-field">
                      <option>Karachi</option>
                      <option>Lahore</option>
                      <option>Islamabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Select Course *</label>
                    <input type="text" className="input-field bg-gray-50" value={selectedCourse.title} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Select Campus</label>
                    <select className="input-field">
                      <option>Gulshan Campus</option>
                      <option>Bahadurabad Campus</option>
                      <option>Numaish Campus</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Personal Information */}
              <div>
                <h3 className="font-display font-bold text-lg text-smit-blue flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 bg-smit-blue text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Full Name *</label>
                    <input required type="text" className="input-field" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Father Name *</label>
                    <input required type="text" className="input-field" placeholder="Enter father's name" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email *</label>
                    <input required type="email" className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Phone *</label>
                    <input required type="text" className="input-field" placeholder="0300-0000000" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">CNIC / B-Form Number *</label>
                    <input required type="text" className="input-field" placeholder="00000-0000000-0" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Date of Birth</label>
                    <input type="date" className="input-field" />
                  </div>
                </div>
              </div>

              {/* Section: Education */}
              <div>
                <h3 className="font-display font-bold text-lg text-smit-blue flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 bg-smit-blue text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Education & Technical Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Highest Qualification *</label>
                    <select className="input-field">
                      <option>Matric</option>
                      <option>Intermediate</option>
                      <option>Undergraduate</option>
                      <option>Postgraduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Computer Proficiency *</label>
                    <select className="input-field">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                <h4 className="font-display font-bold text-sm text-gray-800">Terms and Conditions</h4>
                <label className="flex items-start gap-3 text-sm text-gray-600">
                  <input type="checkbox" required className="mt-1 accent-smit-blue" />
                  I hereby solemnly declare that all information provided is true and accurate to the best of my knowledge.
                </label>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                <button type="button" onClick={() => setSelectedCourse(null)} className="px-6 py-3 rounded-lg font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-smit px-10 py-3 text-base flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}