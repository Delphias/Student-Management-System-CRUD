import { Pencil, Trash2 } from "lucide-react";
import { Student } from "../types/types.ts";

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export function StudentList({ students, onEdit, onDelete }: StudentListProps) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-gray-100">
        <p className="text-gray-500 text-lg">No students found. Add your first student above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr
              key={student._id}
              className={`transition-colors hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(student)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit student"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete student"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
