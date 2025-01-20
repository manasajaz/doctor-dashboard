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
    unique: true, // Each doctor should have a unique phone number
  },
  profileImage: {
    type: String, // Path to the uploaded image
    required: false,
  },
  blood: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const PatientCard = mongoose.model('PatientCard', PatientCardSchema);

module.exports = PatientCard;
