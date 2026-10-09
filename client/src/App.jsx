import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    })
  }, []);

  const handleSubmit = async () => {
    const studata = { name: name, course: course, age: age };
    await axios.post("http://localhost:5000/students", studata);

    setName("");
    setCourse("");
    setAge("");
    setEdit(false);
  };

  const handleEdit = async (student) => {
    setStudentId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEdit(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-800">
      <div className="flex flex-col bg-white border-2 mt-4 mb-4 p-4">
        <h1 className="text-7xl bold">Student Management System</h1>
      </div>
      <form onSubmit={edit ? handleEdit : handleSubmit} className="flex flex-col gap-4">
        <input 
          placeholder="Student Name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
          className="w-full bg-white px-2 py-2"
        />
        <input 
          placeholder="Student Course"
          type="text"
          value={course}
          onChange={(e) => { setCourse(e.target.value) }}
          className="w-full bg-white px-2 py-2"
        />
        <input 
          placeholder="Student Age"
          type="number"
          value={age}
          onChange={(e) => { setAge(e.target.value) }}
          className="w-full bg-white px-2 py-2"
        />
        <button type="submit" className="text-xl font-bold w-full bg-white px-2 py-2 cursor-pointer transition hover:brightness-50">
          {edit ? "UPDATE" : "SUBMIT"}
        </button>
      </form>

      <h2 className="text-white text-2xl mt-8 mb-4">STUDENTS</h2>
      <div className="flex flex-row gap-1">
        {students.map((student) => (
          <div className="flex flex-col bg-white border-2 p-4" key={student.id}>
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
            <button onClick={() => handleEdit(student)} className="text-xl font-bold w-full bg-white px-2 py-2 cursor-pointer transition hover:brightness-50">EDIT</button>
            <button onClick={() => handleDelete(student._id)} className="text-xl font-bold w-full bg-white px-2 py-2 cursor-pointer transition hover:brightness-50">DELETE</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App