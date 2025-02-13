const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorCard",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // Store image path
    required: false,
  },
  diseases: {
    type: [String], // Array of diseases
    required: false,
  },
  date: {
    type: String, // Store as string for easy formatting
    required: true,
  },
  time: {
    type: String, // Store as string for easy formatting
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
