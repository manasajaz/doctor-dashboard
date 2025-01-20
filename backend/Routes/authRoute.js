const express = require('express');
const { register, login, deleteUser, postDoctor, getDoctorCard, getDoctorById, postPatient, getPatientCard, deletePatientCard, editPatientCard } = require('../Controller/authController');
const router = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/upload'); // Import the upload instance

// Use the upload middleware for file uploads
router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.delete('/delete', AuthMiddleware, deleteUser);

router.post('/doctor', postDoctor);
router.post('/patient', postPatient);

router.get('/doctor-card', getDoctorCard)
router.get("/doctor-card/:id", getDoctorById);

router.get('/patient-card', getPatientCard)

router.delete('/patient-card/:id', deletePatientCard)
router.put('/patient-card/:id', editPatientCard)


module.exports = router;