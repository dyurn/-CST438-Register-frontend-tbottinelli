import React, { useState, useEffect } from 'react';

function AdminHome() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  // Récupérer le token JWT depuis le sessionStorage
  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:8080/students', {
      headers: {
        'Authorization': token,  // Ajout de l'en-tête d'autorisation
      },
    })
    .then(response => response.json())
    .then(data => setStudents(data))
    .catch(err => console.error(err));
  };

  const addStudent = () => {
    fetch('http://localhost:8080/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,  // Ajout de l'en-tête d'autorisation
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
    // La vérification de l'unicité de l'e-mail pourrait être effectuée ici ou côté serveur.

    fetch(`http://localhost:8080/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,  // Ajout de l'en-tête d'autorisation
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
      headers: {
        'Authorization': token,  // Ajout de l'en-tête d'autorisation
      },
    })
    .then(() => {
      setStudents(students.filter(student => student.student_id !== studentId));
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
                <button onClick={() => deleteStudent(student.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Student</h3>
      <input 
        type="text" 
        placeholder="Name" 
        value={newStudent.name} 
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newStudent.email} 
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
      />
      <button onClick={addStudent}>Add</button>

      {editingStudent && (
        <div>
          <h3>Edit Student</h3>
          <input 
            type="text" 
            placeholder="Name" 
            value={editingStudent.name} 
            onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={editingStudent.email} 
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Status" 
            value={editingStudent.status} 
            onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
          />
          <button onClick={() => updateStudent(editingStudent.student_id)}>Update</button>
        </div>
      )}
    </div>
  );
}

export default AdminHome;
