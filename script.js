
// Shared: Render students in the table
const studentTable = document.getElementById('studentTable');
const searchInput = document.getElementById('searchInput');

function getStudents() {
  // Try to get from localStorage, else use default
  const data = localStorage.getItem('students');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  // Default students if none in storage
  return [
    { name: "John Doe", class: "8A", math: 85, science: 78, english: 90, attendance: 95 },
    { name: "Jane Smith", class: "9B", math: 92, science: 88, english: 84, attendance: 98 }
  ];
}

function setStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}

function renderStudents(data) {
  studentTable.innerHTML = '';
  data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.class}</td>
      <td>${student.math}</td>
      <td>${student.science}</td>
      <td>${student.english}</td>
      <td>${student.attendance}</td>
    `;
    studentTable.appendChild(row);
  });
}

// Only run on dashboard (no form)
if (studentTable && searchInput) {
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
}

// If on add-student.html, handle form submission
const studentForm = document.getElementById('studentForm');
if (studentForm) {
  studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newStudent = {
      name: document.getElementById('name').value,
      class: document.getElementById('class').value,
      math: parseInt(document.getElementById('math').value),
      science: parseInt(document.getElementById('science').value),
      english: parseInt(document.getElementById('english').value),
      attendance: parseInt(document.getElementById('attendance').value)
    };
    let students = getStudents();
    students.push(newStudent);
    setStudents(students);
    studentForm.reset();
    // Optionally redirect to dashboard
    window.location.href = 'index.html';
  });
}
