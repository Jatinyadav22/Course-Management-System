document.addEventListener("DOMContentLoaded", function () {
    // Sample student data
    const studentData = {
        name: "Jitender Singh",
        rollNo: "2302C230415",
        semester: "IV Sem",
        course: "B.Tech CSE",
        grades: {
            "DBMS": "A",
            "SE": "B+",
            "ML": "A-"
        },
        attendance: {
            "DBMS": "90%",
            "SE": "85%",
            "ML": "92%"
        }
    };

    // Display student info
    document.querySelector(".profile-card h2").textContent = studentData.name;
    document.querySelector(".profile-card p:nth-of-type(1)").textContent = "Roll No.: " + studentData.rollNo;
    document.querySelector(".profile-card p:nth-of-type(2)").textContent = studentData.semester;
    document.querySelector(".profile-card p:nth-of-type(3)").textContent = studentData.course;

    // Display grades
    const gradeTable = document.querySelector(".grades-table");
    Object.keys(studentData.grades).forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${course}</td><td>${studentData.grades[course]}</td>`;
        gradeTable.appendChild(row);
    });

    // Display attendance
    const attendanceTable = document.querySelector(".attendance-table");
    Object.keys(studentData.attendance).forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${course}</td><td>${studentData.attendance[course]}</td>`;
        attendanceTable.appendChild(row);
    });

    // Today's Schedule display (example)
    const scheduleContent = `
        <p>1. Data Structures & Algorithms (CSE2711) <br><br>
            &nbsp;&nbsp;&nbsp;  Time: 10:00 AM - 11:30 AM <br>
            &nbsp;&nbsp;&nbsp;  Room: NB-204 <br>
            &nbsp;&nbsp;&nbsp;  Professor: Ms. Nishtha Phutela</p>
    `;
    document.querySelector(".schedule-content").innerHTML = scheduleContent;
});
