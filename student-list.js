// Student List Page Script
const studentTable = document.getElementById('studentTable');
const searchInput = document.getElementById('searchInput');

function getStudents() {
  const data = localStorage.getItem('students');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function setStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}

function renderStudents(data) {
  studentTable.innerHTML = '';
  data.forEach((student, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.class}</td>
      <td>${student.math}</td>
      <td>${student.science}</td>
      <td>${student.english}</td>
      <td>${student.attendance}</td>
      <td>
        <button onclick="editStudent(${idx})">Edit</button>
        <button onclick="deleteStudent(${idx})">Delete</button>
      </td>
    `;
    studentTable.appendChild(row);
  });
}

function deleteStudent(idx) {
  let students = getStudents();
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(idx, 1);
    setStudents(students);
    renderStudents(students);
  }
}

function editStudent(idx) {
  // For simplicity, just alert info. You can expand this to a modal or edit page.
  let students = getStudents();
  const student = students[idx];
  const newName = prompt('Edit name:', student.name);
  if (newName !== null) {
    student.name = newName;
    setStudents(students);
    renderStudents(students);
  }
}

let students = getStudents();
renderStudents(students);

searchInput.addEventListener('input', function() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(keyword) ||
    s.class.toLowerCase().includes(keyword)
  );
  renderStudents(filtered);
});
