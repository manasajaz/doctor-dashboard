const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    date: Date,
    reason: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
