import { useState } from 'react';
import { Eye, CheckCircle, XCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LeaveManagementAdmin() {
  const [leaves, setLeaves] = useState([
    { id: 1, studentId: 'WAM-393100', name: 'Wania', dateRange: '8-jan-2025 to 12-jan-2025', reason: 'Sick leave due to high fever and doctor advised bed rest.', status: 'Pending', image_url: null },
    { id: 2, studentId: 'WAM-393108', name: 'Armish', dateRange: '5-feb-2025 to 19-feb-2025', reason: ' travel urgently.', status: 'Approved', },
    { id: 3, studentId: 'WAM-393107', name: 'lisha', dateRange: '20-march-2025 to 22-march-2025', reason: 'DAE exams overlap with class schedule.', status: 'Rejected', image_url: null },
  ]);

  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleAction = (id, newStatus) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
    toast.success(`Leave ${newStatus.toLowerCase()}`);
    if (selectedLeave?.id === id) setSelectedLeave(null);
  };

  const statusStyles = {
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    Pending: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900">Leave Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Review and manage student leave applications</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">#</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">Date Range</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaves.map((leave, idx) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 font-medium">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{leave.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{leave.studentId}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{leave.dateRange}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyles[leave.status]}`}>
                      ● {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedLeave(leave)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold transition-colors"
                      >
                        <Eye size={14} /> View
                      </button>
                      {leave.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAction(leave.id, 'Approved')}
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleAction(leave.id, 'Rejected')}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Popup */}
      {selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedLeave(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="font-display font-bold text-lg text-gray-900">Leave Details</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedLeave.name} ({selectedLeave.studentId})</p>
              </div>
              <button onClick={() => setSelectedLeave(null)} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyles[selectedLeave.status]}`}>
                  ● {selectedLeave.status}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Date Range</span>
                <p className="text-gray-900 font-medium">{selectedLeave.dateRange}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Reason</span>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-sm leading-relaxed">
                  {selectedLeave.reason}
                </div>
              </div>

              {selectedLeave.image_url && (
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Attachment</span>
                  <img src={selectedLeave.image_url} alt="Attachment" className="max-h-40 rounded-lg border border-gray-200 object-cover" />
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200">
              {selectedLeave.status === 'Pending' ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(selectedLeave.id, 'Rejected')}
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-3 rounded-lg transition-colors text-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedLeave.id, 'Approved')}
                    className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 font-bold py-3 rounded-lg transition-colors text-sm"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedLeave(null)}
                  className="w-full bg-gray-100 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}