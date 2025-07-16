// Add Teacher Page Script
const teacherForm = document.getElementById('teacherForm');

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

if (teacherForm) {
  teacherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newTeacher = {
      name: document.getElementById('name').value,
      subject: document.getElementById('subject').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value
    };
    let teachers = getTeachers();
    teachers.push(newTeacher);
    setTeachers(teachers);
    teacherForm.reset();
    window.location.href = 'teacher-list.html';
  });
}
