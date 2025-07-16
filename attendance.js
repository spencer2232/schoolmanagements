// Attendance Page Script
const attendanceForm = document.getElementById('attendanceForm');
const markAttendanceForm = document.getElementById('markAttendanceForm');
const studentsList = document.getElementById('studentsList');
const attendanceTable = document.getElementById('attendanceTable');

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

function getAttendanceRecords() {
  const data = localStorage.getItem('attendance');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function setAttendanceRecords(records) {
  localStorage.setItem('attendance', JSON.stringify(records));
}

attendanceForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const className = document.getElementById('class').value;
  const students = getStudents().filter(s => s.class === className);
  studentsList.innerHTML = '';
  if (students.length === 0) {
    studentsList.innerHTML = '<p>No students found for this class.</p>';
    markAttendanceForm.style.display = 'none';
    return;
  }
  students.forEach((student, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>
        <input type="checkbox" name="attendance" value="${student.name}" checked>
        ${student.name}
      </label>
    `;
    studentsList.appendChild(div);
  });
  markAttendanceForm.style.display = 'block';
});

markAttendanceForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const className = document.getElementById('class').value;
  const students = getStudents().filter(s => s.class === className);
  const checked = Array.from(document.querySelectorAll('input[name="attendance"]:checked')).map(cb => cb.value);
  let records = getAttendanceRecords();
  students.forEach(student => {
    records.push({
      date: date,
      class: className,
      student: student.name,
      status: checked.includes(student.name) ? 'Present' : 'Absent'
    });
  });
  setAttendanceRecords(records);
  markAttendanceForm.style.display = 'none';
  renderAttendance();
});

function renderAttendance() {
  let records = getAttendanceRecords();
  attendanceTable.innerHTML = '';
  records.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.date}</td>
      <td>${record.class}</td>
      <td>${record.student}</td>
      <td>${record.status}</td>
    `;
    attendanceTable.appendChild(row);
  });
}

renderAttendance();
