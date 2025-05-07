window.addEventListener('DOMContentLoaded', () => {
    const faculty = JSON.parse(localStorage.getItem('facultyData'));

    if (!faculty) {
        window.location.href = 'loginfaculty.html';  // Redirect if no data found
        return;
    }

    // Populate the dashboard with faculty data
    document.getElementById('facultyName').innerText = faculty.name;
    document.getElementById('facultyHeaderName').innerText = faculty.name;
    document.getElementById('facultyDepartment').innerText = `Department: ${faculty.department}`;
    document.getElementById('facultyDesignation').innerText = `Designation: ${faculty.designation}`;
});
