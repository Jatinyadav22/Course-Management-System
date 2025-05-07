document.getElementById('facultyLoginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:5000/api/faculty/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save the faculty data to localStorage
            localStorage.setItem('facultyData', JSON.stringify(data.faculty));
            window.location.href = 'faculty.html';  // Redirect to faculty dashboard
        } else {
            document.getElementById('error-message').innerText = data.message || 'Login failed.';
        }
    } catch (err) {
        console.error('Login error:', err);
        document.getElementById('error-message').innerText = 'Server error.';
    }
});
