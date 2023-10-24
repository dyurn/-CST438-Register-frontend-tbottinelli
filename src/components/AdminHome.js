import React, { useState, useEffect } from 'react';

function AdminHome() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  const addStudent = () => {
    fetch('http://localhost:8080/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
    .then(response => response.json())
    .then(data => {
      setStudents([...students, data]);
      setNewStudent({ name: '', email: '' });
    })
    .catch(err => console.error(err));
  };

  const updateStudent = (studentId) => {
    if (students.some(student => student.email === editingStudent.email && student.id !== studentId)) {
      alert('Email must be unique.');
      return;
    }
  
    fetch(`http://localhost:8080/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingStudent),
    })
    .then(() => {
      setStudents(students.map(student => student.student_id === studentId ? editingStudent : student));
      setEditingStudent(null);
    })
    .catch(err => console.error(err));
  };

  const deleteStudent = (studentId) => {
    fetch(`http://localhost:8080/students/${studentId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setStudents(students.filter(student => student.student_id !== studentId));
      setEditingStudent(null);
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h3>Student List</h3>
      <table border="1" style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.student_id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.status}</td>
            <td>
              <button onClick={() => setEditingStudent({ ...student })}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      <h3>Add New Student</h3>
      <input 
        type="text" 
        placeholder="Name" 
        id = "newname"
        value={newStudent.name} 
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input 
        type="email" 
        placeholder="Email" 
        id = "newemail"
        value={newStudent.email} 
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
      />
      <div>
        <button onClick={addStudent}>Add</button>
      </div>

      {editingStudent && (
        <div>
          <h3>Edit Student</h3>
          <h5>ID : {editingStudent.student_id}</h5>
          <input 
            type="text" 
            placeholder="Name" 
            id = "editname"
            value={editingStudent.name} 
            onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
          />
          <input 
            type="email" 
            placeholder="Email" 
            id = "editmail"
            value={editingStudent.email} 
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
          />
          <input 
            type="status" 
            placeholder="Status" 
            id = "editstatus"
            value={editingStudent.status} 
            onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
          />
          <div>
            <button onClick={() => updateStudent(editingStudent.student_id)}>Update</button>
            <button onClick={() => deleteStudent(editingStudent.student_id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHome;
