import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, Plus, UploadCloud, Loader2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export default function StudentDashboard() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ dateRange: '', reason: '', file: null });

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase.from('leaves').select('*').eq('student_id', user.id);
        if (!error && data) setLeaves(data);
        else throw new Error();
      } catch {
        setLeaves([
          { id: 1, dateRange: '10-Oct to 12-Oct', reason: 'Sick leave due to fever', status: 'Pending' },
          { id: 2, dateRange: '5-Nov to 5-Nov', reason: 'Family function', status: 'Approved' },
        ]);
      }
    };
    fetchLeaves();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = null;
    try {
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user?.id || 'mock'}/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('leave-attachments').upload(filePath, formData.file);
        if (!uploadError) {
          const { data } = supabase.storage.from('leave-attachments').getPublicUrl(filePath);
          imageUrl = data.publicUrl;
        }
      }

      const leaveData = { student_id: user?.id, dateRange: formData.dateRange, reason: formData.reason, status: 'Pending', image_url: imageUrl };
      const { data, error } = await supabase.from('leaves').insert([leaveData]).select();

      if (!error && data) {
        setLeaves([data[0], ...leaves]);
        toast.success('Leave requested successfully!');
      } else throw new Error();
    } catch {
      setLeaves([{ id: Date.now(), dateRange: formData.dateRange, reason: formData.reason, status: 'Pending', image_url: imageUrl }, ...leaves]);
      toast.success('Leave requested (local mode)');
    }

    setIsSubmitting(false);
    setIsApplying(false);
    setFormData({ dateRange: '', reason: '', file: null });
  };

  const statusStyles = {
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    Pending: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl">
      {/* Header Card */}
      <div className="smit-gradient-header rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white mb-10 shadow-lg">
        <div>
          <h1 className="text-3xl font-display font-bold">Welcome, {user?.name || 'Student'}</h1>
          <p className="text-white/70 mt-1">Manage your courses and leave requests</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-colors border border-white/20">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Leave Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">Your Leave Requests</h2>
            <button onClick={() => setIsApplying(true)} className="btn-smit px-4 py-2 text-sm flex items-center gap-2">
              <Plus size={16} /> Apply Leave
            </button>
          </div>

          {/* Leave List */}
          <div className="space-y-3">
            {leaves.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                No leave requests found.
              </div>
            )}
            {leaves.map(leave => (
              <div key={leave.id || Math.random()} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{leave.dateRange}</div>
                  <div className="text-gray-500 text-xs mt-1 line-clamp-1">{leave.reason}</div>
                  {leave.image_url && <a href={leave.image_url} target="_blank" rel="noreferrer" className="text-xs text-smit-blue mt-1 inline-block font-semibold">View Attachment →</a>}
                </div>
                <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${statusStyles[leave.status] || statusStyles.Pending}`}>
                  ● {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h2 className="text-xl font-display font-bold text-gray-900 border-b border-gray-200 pb-4">Quick Links</h2>
          <div
            className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-smit-blue hover:shadow-md transition-all"
            onClick={() => navigate('/courses')}
          >
            <div className="w-14 h-14 bg-smit-blue/10 rounded-xl flex items-center justify-center text-smit-blue mx-auto mb-4">
              <BookOpen size={28} />
            </div>
            <div className="font-display font-bold text-gray-900">Browse Courses</div>
            <div className="text-sm text-gray-500 mt-1">Apply for new skills</div>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsApplying(false)} />
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-display font-bold text-lg text-gray-900">Leave Application</h2>
              <p className="text-sm text-gray-500 mt-1">Submit your leave request with details</p>
            </div>

            <form onSubmit={handleLeaveSubmit} className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Date Range * <span className="text-gray-400 font-normal">(e.g. 10-Oct to 12-Oct)</span>
                </label>
                <input required type="text" value={formData.dateRange} onChange={e => setFormData({ ...formData, dateRange: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Reason *</label>
                <textarea required rows={3} value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} className="input-field resize-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Image Attachment <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-smit-blue transition-colors cursor-pointer bg-gray-50 group">
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  <UploadCloud className="mx-auto text-gray-400 group-hover:text-smit-blue transition-colors" size={28} />
                  <div className="mt-2 text-sm font-medium text-gray-600 group-hover:text-smit-blue">
                    {formData.file ? formData.file.name : 'Click to upload image'}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsApplying(false)} className="px-5 py-2.5 rounded-lg font-semibold text-gray-500 hover:bg-gray-100 transition-colors text-sm">Cancel</button>
                <button disabled={isSubmitting} type="submit" className="btn-smit px-8 py-2.5 text-sm flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}