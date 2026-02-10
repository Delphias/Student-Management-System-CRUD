import { useState, useEffect } from "react";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";
import { GraduationCap } from "lucide-react";
import { Student } from "./types/types";
import { useError } from "./hooks/useError";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const { error, setError: handleError, clearError } = useError();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      clearError();

      const res = await fetch("/api/students");

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to fetch students. Please try again.",
        );
      }

      setStudents(data.students || []);
    } catch (err) {
      handleError(err, "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (student: Omit<Student, "_id">) => {
    try {
      clearError();

      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create student. Please try again.",
        );
      }

      setStudents((prev) => [...prev, data.student]);
    } catch (err) {
      handleError(err, "Failed to create student");
    }
  };

  const handleUpdateStudent = async (student: Omit<Student, "_id">) => {
    if (!editingStudent) return;

    try {
      clearError();

      const res = await fetch(`/api/student/${editingStudent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update student. Please try again.",
        );
      }

      setStudents((prev) =>
        prev.map((s) => (s._id === data.student._id ? data.student : s)),
      );
      setEditingStudent(null);
    } catch (err) {
      handleError(err, "Failed to update student.");
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      clearError();

      const res = await fetch(`/api/student/${id}`, { method: "DELETE" });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to delete student. Please try again.",
        );
      }

      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      handleError(err, "Failed to delete student.");
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:gap-6">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <GraduationCap size={50} className="text-blue-600" />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
              Student Management System
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              Manage student records with ease
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
            <button
              className="ml-4 text-sm text-blue-600 underline"
              onClick={clearError}
            >
              Dismiss
            </button>
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
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDeleteStudent}
          />
        )}
      </div>
    </div>
  );
}

export default App;
