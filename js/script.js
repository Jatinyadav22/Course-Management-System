document.addEventListener("DOMContentLoaded", function () {
    // User role selection buttons
    const buttons = document.querySelectorAll(".user-selection button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("selected")); // Remove class from all buttons
            this.classList.add("selected"); // Add class to clicked button
        });
    });

    // Form validation and login logic
    const signinForm = document.querySelector(".signin-form");
    if (signinForm) {
        signinForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            
            if (email === "" || password === "") {
                alert("Please fill in all required fields.");
                return;
            }

            // Example login simulation (Replace with actual authentication logic)
            if (email === "student1@coursesphere.com" && password === "1354") {
                alert("Student Login Successful!");
                window.location.href = "student.html"; // Redirect to student dashboard
            } else if (email === "faculty1@coursesphere.com" && password === "123") {
                alert("Faculty Login Successful!");
                window.location.href = "faculty.html"; // Redirect to faculty dashboard
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }
});
