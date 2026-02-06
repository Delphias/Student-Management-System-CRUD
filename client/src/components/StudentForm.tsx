import { useState, useEffect } from "react";
import { Student } from "../types/types.ts";

interface StudentFormProps {
  onSubmit: (student: Omit<Student, "_id">) => void;
  editingStudent: Student | null;
  onCancel: () => void;
}

export function StudentForm({ onSubmit, editingStudent, onCancel }: StudentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setShowForm(true);
    } else {
      setName("");
      setEmail("");
      setCourse("");
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-z\s]{4,}$/.test(name)) newErrors.name = "Full name must be at least 4 characters long (letters and spaces only).";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+$/.test(email)) {
      newErrors.email = "Email must include an @ followed by a domain name (e.g., user@example)";
    } else if (!/^[^\s@]+@[^\s@]+(\.[a-zA-Z]{2,})+$/.test(email)) {
      newErrors.email = "Email must include a valid domain ending (e.g., .com, .co.za).";
    }

    if (!course.trim()) newErrors.course = "Course is required";
    else if (!/^[A-Za-z\s]{2,}$/.test(course))
      newErrors.course = "Course must be at least 2 characters long (letters and spaces only).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, email, course });
    setName("");
    setEmail("");
    setCourse("");
    if (!editingStudent) setShowForm(false);
  };

  return (
    <div className="max-w-md mx-auto w-full mb-10">
      {!showForm && !editingStudent && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition flex justify-center items-center gap-2"
        >
          + Add Student
        </button>
      )}

      {(showForm || editingStudent) && (
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 mt-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {editingStudent ? "Edit Student" : "Add New Student"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-extrabold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-extrabold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-extrabold text-gray-700 mb-1">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Computer Science, Engineering..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
              {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md"
              >
                {editingStudent ? "Update Student" : "Add Student"}
              </button>
              {(editingStudent || showForm) && (
                <button
                  type="button"
                  onClick={() => {
                    onCancel();
                    setShowForm(false);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition shadow-md"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
