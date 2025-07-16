// Teacher List Page Script
const teacherTable = document.getElementById('teacherTable');
const searchInput = document.getElementById('searchInput');

function getTeachers() {
  const data = localStorage.getItem('teachers');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function setTeachers(teachers) {
  localStorage.setItem('teachers', JSON.stringify(teachers));
}

function renderTeachers(data) {
  teacherTable.innerHTML = '';
  data.forEach((teacher, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${teacher.name}</td>
      <td>${teacher.subject}</td>
      <td>${teacher.email}</td>
      <td>${teacher.phone}</td>
      <td>
        <button onclick="editTeacher(${idx})">Edit</button>
        <button onclick="deleteTeacher(${idx})">Delete</button>
      </td>
    `;
    teacherTable.appendChild(row);
  });
}

function deleteTeacher(idx) {
  let teachers = getTeachers();
  if (confirm('Are you sure you want to delete this teacher?')) {
    teachers.splice(idx, 1);
    setTeachers(teachers);
    renderTeachers(teachers);
  }
}

function editTeacher(idx) {
  let teachers = getTeachers();
  const teacher = teachers[idx];
  const newName = prompt('Edit name:', teacher.name);
  if (newName !== null) {
    teacher.name = newName;
    setTeachers(teachers);
    renderTeachers(teachers);
  }
}

let teachers = getTeachers();
renderTeachers(teachers);

searchInput.addEventListener('input', function() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(keyword) ||
    t.subject.toLowerCase().includes(keyword)
  );
  renderTeachers(filtered);
});
