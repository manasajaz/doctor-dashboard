const mongoose = require('mongoose');

const PatientCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true, // Remove extra spaces
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true, // Ensure spaces are removed
    unique: true, // Unique phone number for each patient
  },
  profileImage: {
    type: String, // Path to the uploaded image
    required: false,
  },
  blood: {
    type: String, // Store blood type for patient
    required: false, 
  },
}, { timestamps: true }); // Automatically manage `createdAt` and `updatedAt` fields

const PatientCard = mongoose.model('PatientCard', PatientCardSchema);

module.exports = PatientCard;
