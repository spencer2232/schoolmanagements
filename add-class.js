// Add Class Page Script
const classForm = document.getElementById('classForm');

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

if (classForm) {
  classForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const className = document.getElementById('name').value;
    const teacher = document.getElementById('teacher').value;
    const studentsText = document.getElementById('students').value;
    // Split by line, trim, and filter out empty lines
    const studentNames = studentsText.split('\n').map(s => s.trim()).filter(Boolean);
    const newClass = {
      name: className,
      teacher: teacher,
      students: studentNames
    };
    // Add class
    let classes = getClasses();
    classes.push(newClass);
    setClasses(classes);

    // Add students to main students list if not already present
    let allStudents = getStudents();
    studentNames.forEach(name => {
      if (!allStudents.some(s => s.name === name && s.class === className)) {
        allStudents.push({
          name: name,
          class: className,
          math: 0,
          science: 0,
          english: 0,
          attendance: 0
        });
      }
    });
    setStudents(allStudents);

    classForm.reset();
    window.location.href = 'class-list.html';
  });
}
