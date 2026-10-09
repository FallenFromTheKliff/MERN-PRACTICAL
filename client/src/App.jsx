import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
  }, []);

  const handleSubmit = async () => {
    const student = { name: name, course: course, age: age };
    if (edit) {
      await axios.put(`http://localhost:5000/students/${edit}`, student);
    } else {
      await axios.post("http://localhost:5000/students", student);
    }

    setName("");
    setCourse("");
    setAge("");
    setEdit(null);
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
  }

  const handleEdit = (student) => {
    setEdit(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
  }

  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-800">
      <div className="flex flex-col bg-white border-4 rounded-2xl mt-4 mb-4 p-4">
        <h1 className="text-7xl bold">Student Management System</h1>
      </div>
      <h2 className="text-white text-2xl mb-4">Students</h2>

      {students.map((student) => (
        <div className="flex flex-col bg-white border-4 rounded-2xl p-4" key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
        </div>
      ))}
    </div>
  )
}

export default App