const mongoose = require('mongoose');

const DoctorCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true, // Remove extra spaces
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true, // Ensure spaces are removed
    unique: true, // Each doctor should have a unique phone number
  },
  profileImage: {
    type: String, // Path to the uploaded image
    required: false,
  },
  diseases: {
    type: [String], // Array of diseases or specializations the doctor treats
    required: false, // Required as each doctor should have at least one specialization
  },
}, { timestamps: true }); // Automatically manage `createdAt` and `updatedAt` fields

const DoctorCard = mongoose.model('DoctorCard', DoctorCardSchema);

module.exports = DoctorCard;
