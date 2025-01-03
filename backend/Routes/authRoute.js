const express = require('express');
const { register, login, deleteUser, getDoctor, postDoctor , getDoctorCard, postPatient, getPatientCard  } = require('../Controller/authController');
const router = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/upload'); // Import the upload instance

// Use the upload middleware for file uploads
router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.get('/doctor', getDoctor);
router.post('/doctor', postDoctor);
router.post('/patient', postPatient);
router.delete('/delete', AuthMiddleware, deleteUser);
router.get('/doctor-card' , getDoctorCard )
router.get('/patient-card' , getPatientCard )


module.exports = router;
