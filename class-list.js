// Class List Page Script
const classTable = document.getElementById('classTable');
const searchInput = document.getElementById('searchInput');

function getClasses() {
  const data = localStorage.getItem('classes');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function setClasses(classes) {
  localStorage.setItem('classes', JSON.stringify(classes));
}

function renderClasses(data) {
  classTable.innerHTML = '';
  data.forEach((cls, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cls.name}</td>
      <td>${cls.teacher}</td>
      <td>${cls.students ? cls.students.length : 0}</td>
      <td>
        <button onclick="editClass(${idx})">Edit</button>
        <button onclick="deleteClass(${idx})">Delete</button>
      </td>
    `;
    classTable.appendChild(row);
  });
}

function deleteClass(idx) {
  let classes = getClasses();
  if (confirm('Are you sure you want to delete this class?')) {
    classes.splice(idx, 1);
    setClasses(classes);
    renderClasses(classes);
  }
}

function editClass(idx) {
  let classes = getClasses();
  const cls = classes[idx];
  const newName = prompt('Edit class name:', cls.name);
  if (newName !== null) {
    cls.name = newName;
    setClasses(classes);
    renderClasses(classes);
  }
}

let classes = getClasses();
renderClasses(classes);

searchInput.addEventListener('input', function() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = classes.filter(c =>
    c.name.toLowerCase().includes(keyword) ||
    c.teacher.toLowerCase().includes(keyword)
  );
  renderClasses(filtered);
});
