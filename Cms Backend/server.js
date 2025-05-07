const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const path = require('path');  // For serving static files
const facultyRoutes = require('./routes/facultyRoutes');
const studentRoutes = require('./routes/studentRoutes'); // Adding student routes

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON body in requests

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration (if needed)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Ensure this secret is strong and unique
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Ensure this is the correct MongoDB URI
      ttl: 24 * 60 * 60, // Session expiration time in seconds (24 hours)
    }),
    cookie: {
      httpOnly: true, // For security
      secure: process.env.NODE_ENV === 'production', // Set true only if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Routes for handling requests
app.use('/api/students', studentRoutes); // Register student-related routes
app.use('/api/faculty', facultyRoutes); // Register faculty-related routes

// Route for serving the student dashboard page (student.html)
app.get('/student', (req, res) => {
  // Ensure that student.html is in the 'public' directory
  res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

// Route for serving the faculty dashboard page (faculty.html)
app.get('/faculty', (req, res) => {
  // Ensure that faculty.html is in the 'public' directory
  res.sendFile(path.join(__dirname, 'public', 'faculty.html'));
});

// Example of a simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running smoothly!' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error for debugging
  res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
