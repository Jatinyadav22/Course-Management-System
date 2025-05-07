const express = require('express');
const router = express.Router();
const Faculty = require('../models/faculty'); // Mongoose model for Faculty

// Create a new faculty
router.post('/', async (req, res) => {
    try {
        const { name, email, password, department, designation, courses, updates } = req.body;

        if (!name || !email || !password || !department || !designation) {
            return res.status(400).json({ message: "All fields except courses and updates are required." });
        }

        const newFaculty = new Faculty({
            name,
            email,
            password,
            department,
            designation,
            courses: courses || [],
            updates: updates || []
        });

        await newFaculty.save();
        res.status(201).json({ message: "Faculty created successfully!", faculty: newFaculty });
    } catch (error) {
        console.error("Error creating faculty:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get all faculties
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (error) {
        console.error("Error fetching faculties:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get faculty by ID
router.get('/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found." });
        }
        res.status(200).json(faculty);
    } catch (error) {
        console.error("Error fetching faculty:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Update faculty details by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const updateFields = {};
//         const { name, email, password, department, designation, courses, updates } = req.body;

//         if (name) updateFields.name = name;
//         if (email) updateFields.email = email;
//         if (password) updateFields.password = password;
//         if (department) updateFields.department = department;
//         if (designation) updateFields.designation = designation;
//         if (courses) updateFields.courses = courses;
//         if (updates) updateFields.updates = updates;

//         const faculty = await Faculty.findByIdAndUpdate(
//             req.params.id,
//             updateFields,
//             { new: true }
//         );

//         if (!faculty) {
//             return res.status(404).json({ message: "Faculty not found." });
//         }

//         res.status(200).json({ message: "Faculty updated successfully.", faculty });
//     } catch (error) {
//         console.error("Error updating faculty:", error);
//         res.status(500).json({ message: "Server error. Please try again later." });
//     }
// });

// Delete faculty by ID
router.delete('/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found." });
        }
        res.status(200).json({ message: "Faculty deleted successfully." });
    } catch (error) {
        console.error("Error deleting faculty:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Login faculty by email
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required for login." });
        }

        const faculty = await Faculty.findOne({ email });

        if (!faculty || faculty.password !== password) {
            return res.status(404).json({ message: "Invalid email or password." });
        }

        res.status(200).json({ message: "Login successful.", faculty });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});
// PUT /api/faculty/email/:email
router.put('/email/:email', async (req, res) => {
    try {
        const { name, password, department, designation, courses, updates } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (password) updateFields.password = password;
        if (department) updateFields.department = department;
        if (designation) updateFields.designation = designation;
        if (courses) updateFields.courses = courses;
        if (updates) updateFields.updates = updates;

        const faculty = await Faculty.findOneAndUpdate(
            { email: req.params.email },
            { $set: updateFields },
            { new: true }
        );

        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found.' });
        }

        res.status(200).json({ message: 'Faculty updated successfully.', faculty });
    } catch (error) {
        console.error('Error updating faculty:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});



// Get courses for a faculty by ID
router.get('/:id/courses', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found." });
        }
        res.status(200).json({ courses: faculty.courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get updates for a faculty by ID
router.get('/:id/updates', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found." });
        }
        res.status(200).json({ updates: faculty.updates });
    } catch (error) {
        console.error("Error fetching updates:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});



module.exports = router;
