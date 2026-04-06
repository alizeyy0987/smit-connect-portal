import { useState } from "react";

export default function LeaveModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    reason: "",
    from_date: "",
    to_date: "",
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Apply for Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason */}
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />

          {/* From Date */}
          <input
            type="date"
            name="from_date"
            value={formData.from_date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />

          {/* To Date */}
          <input
            type="date"
            name="to_date"
            value={formData.to_date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full"
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}