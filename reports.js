// Reports Page Script
const topStudentsBtn = document.getElementById('topStudentsBtn');
const topStudentsReport = document.getElementById('topStudentsReport');
const attendanceSummaryBtn = document.getElementById('attendanceSummaryBtn');
const attendanceSummaryReport = document.getElementById('attendanceSummaryReport');

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

topStudentsBtn.addEventListener('click', function() {
  const students = getStudents();
  if (students.length === 0) {
    topStudentsReport.innerHTML = '<p>No student data available.</p>';
    return;
  }
  // Calculate average score for each student
  const scored = students.map(s => ({
    ...s,
    avg: ((s.math + s.science + s.english) / 3).toFixed(2)
  }));
  // Sort by average descending
  scored.sort((a, b) => b.avg - a.avg);
  // Show top 5
  const top = scored.slice(0, 5);
  let html = '<table><tr><th>Name</th><th>Class</th><th>Average</th></tr>';
  top.forEach(s => {
    html += `<tr><td>${s.name}</td><td>${s.class}</td><td>${s.avg}</td></tr>`;
  });
  html += '</table>';
  topStudentsReport.innerHTML = html;
});

attendanceSummaryBtn.addEventListener('click', function() {
  const records = getAttendanceRecords();
  if (records.length === 0) {
    attendanceSummaryReport.innerHTML = '<p>No attendance data available.</p>';
    return;
  }
  // Group by student
  const summary = {};
  records.forEach(r => {
    if (!summary[r.student]) summary[r.student] = { present: 0, total: 0 };
    summary[r.student].total++;
    if (r.status === 'Present') summary[r.student].present++;
  });
  let html = '<table><tr><th>Student</th><th>Present</th><th>Total</th><th>Attendance (%)</th></tr>';
  Object.entries(summary).forEach(([name, stat]) => {
    const percent = ((stat.present / stat.total) * 100).toFixed(1);
    html += `<tr><td>${name}</td><td>${stat.present}</td><td>${stat.total}</td><td>${percent}</td></tr>`;
  });
  html += '</table>';
  attendanceSummaryReport.innerHTML = html;
});
