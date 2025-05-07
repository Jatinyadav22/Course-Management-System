const Faculty = require('../models/Faculty');

// Create a new faculty
exports.createFaculty = async (req, res) => {
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
};

// Get all faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Login by email
exports.loginFaculty = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });

    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(404).json({ message: "Faculty not found." });

    res.status(200).json({ message: "Login successful.", faculty });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update faculty by email
exports.updateFacultyByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const faculty = await Faculty.findOneAndUpdate({ email }, updateData, { new: true });

    if (!faculty) return res.status(404).json({ message: "Faculty not found." });

    res.status(200).json({ message: "Faculty updated.", faculty });
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).json({ message: "Server error." });
  }
};
