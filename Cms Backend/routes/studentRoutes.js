const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Mongoose model

// Create a new student
router.post('/', async (req, res) => {
    try {
        const { name, rollNumber, email, course, year, grades, attendance } = req.body;

        if (!name || !rollNumber || !email || !course || !year) {
            return res.status(400).json({ message: "All fields except grades and attendance are required." });
        }

        const newStudent = new Student({
            name,
            rollNumber,
            email,
            course,
            year,
            grades: grades || [],
            attendance: attendance || 0, // Default attendance is 0 if not provided
        });

        await newStudent.save();
        res.status(201).json({ message: "Student created successfully!", student: newStudent });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Update student details by email
router.put('/email/:email', async (req, res) => {
    try {
        const updateFields = {};
        const { name, rollNumber, email, course, year, grades, attendance } = req.body;

        if (name) updateFields.name = name;
        if (rollNumber) updateFields.rollNumber = rollNumber;
        if (email) updateFields.email = email;
        if (course) updateFields.course = course;
        if (year) updateFields.year = year;
        if (grades) updateFields.grades = grades;
        if (attendance !== undefined) updateFields.attendance = attendance; // Allow updating attendance

        // Update student by email
        const student = await Student.findOneAndUpdate(
            { email: req.params.email }, // Find student by email
            updateFields,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({ message: "Student updated successfully.", student });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Delete student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.status(200).json({ message: "Student deleted successfully." });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Login student by email
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required for login." });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({ message: "Login successful.", student });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get attendance for a student by ID
router.get('/:id/attendance', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.status(200).json({ attendance: student.attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get grades for a student by ID
router.get('/:id/grades', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.status(200).json({ grades: student.grades });
    } catch (error) {
        console.error("Error fetching grades:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;
