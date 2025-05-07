const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  attendance: { type: Number, default: 0 },
  grades: [
    {
      subject: String,
      grade: String,
    }
  ]
});

// Export the Student model based on the schema
module.exports = mongoose.model('Student', studentSchema);
