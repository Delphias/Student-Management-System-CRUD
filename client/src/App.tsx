import { useState, useEffect } from 'react';
import { StudentForm } from './components/StudentForm';
import { StudentList } from './components/StudentList';
import { GraduationCap } from 'lucide-react';
import { Student } from "./types/types.ts";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

const fetchStudents = async () => {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/students");
    if (!res.ok) throw new Error("Failed to fetch students");
    const data = await res.json();
    setStudents(data.studentData || []);
  } catch (err) {
    setError("Failed to fetch students");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


const handleCreateStudent = async (student: Omit<Student, "_id">) => {
  try {
    setError(null);
    const res = await fetch("/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!res.ok) throw new Error("Failed to create student");

    const newStudent = await res.json();
    // update local state so UI refreshes
    setStudents((prev) => [...prev, newStudent]);
  } catch (err) {
    setError("Failed to create student");
    console.error(err);
  }
};

const handleUpdateStudent = async (student: Omit<Student, "_id">) => {
  if (!editingStudent) return;

  try {
    setError(null);
    const res = await fetch(`/api/student/${editingStudent._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!res.ok) throw new Error("Failed to update student");
    const updated = await res.json();
    setStudents((prev) =>
      prev.map((s) => (s._id === updated._id ? updated : s))
    );
    setEditingStudent(null);
  } catch (err) {
    setError("Failed to update student");
    console.error(err);
  }
};

const handleDeleteStudent = async (id: string) => {
  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    setError(null);
    const res = await fetch(`/api/student/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete student");
    setStudents((prev) => prev.filter((s) => s._id !== id));
  } catch (err) {
    setError("Failed to delete student");
    console.error(err);
  }
};

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap size={40} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Student Management System</h1>
          </div>
          <p className="text-gray-600 ml-13">Manage student records with ease</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <StudentForm
          onSubmit={editingStudent ? handleUpdateStudent : handleCreateStudent}
          editingStudent={editingStudent}
          onCancel={handleCancel}
        />

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading students...</p>
          </div>
        ) : (
          <StudentList students={students} onEdit={handleEdit} onDelete={handleDeleteStudent} />
        )}
      </div>
    </div>
  );
}

export default App;
