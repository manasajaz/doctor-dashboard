const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'], // Restrict to these roles
        required: true,
        default: 'patient', // Optional default role
    },
    profilePicture: {
        type: String, // URL of the profile picture stored in Cloudinary
        required: false, // Optional, as some users might not upload a picture
      },  
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
