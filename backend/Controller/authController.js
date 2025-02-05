const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const Patient = require("../models/Patient");
const PatientCard = require('../models/PatientCard');
const DoctorCard = require('../models/DoctorCard');
const Doctor = require("../models/Doctor") // Import the correct model

const multer = require("multer");
const path = require("path");


const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const ExistingUser =
      (await Doctor.findOne({ email })) || (await Patient.findOne({ email }));

    if (ExistingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Validate role
    if (!["doctor", "patient"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    let user;
    if (role === "doctor") {
      user = new Doctor({ name, email, password: hashedPassword, role });
    } else if (role === "patient") {
      user = new Patient({ name, email, password: hashedPassword, role });
    }

    let uploadedImageUrl = null;

    // Check if there's a file and upload it to Cloudinary
    if (req.file) {
      console.log("File received:", req.file);
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "user_profiles", // You can change the folder name as needed
        });
        uploadedImageUrl = result.secure_url;
        user.profilePicture = uploadedImageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        return res
          .status(500)
          .json({ error: "Error uploading image to Cloudinary" });
      }
    }

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12d",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.user.id;

  try {
    const user =
      (await Patient.findByIdAndDelete(id)) ||
      (await Doctor.findByIdAndDelete(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Succesfully" });
    console.log("User delete", user);
  } catch (error) {
    console.log("Error Deleting User");
    res.status(500).json({ message: "Error Deleting User" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET; // Use environment variable for security

  try {
    console.log("Attempting to log in user with email:", email);

    // Search for user in both collections
    let user = await Patient.findOne({ email }) || await Doctor.findOne({ email });
    if (!user) {
      console.error("User not found for email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Determine user role based on collection
    const userType = user instanceof Patient ? "patient" : "doctor";

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Invalid password for user:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: userType }, jwtSecret, { expiresIn: "1h" });

    console.log("Token generated successfully for user:", email);

    // Return response with profile picture
    res.json({
      token,
      email: user.email,
      name: user.name,
      role: userType,
      profilePicture: user.profilePicture || null, // Send profilePicture if exists, else null
    });

  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getDoctorCard = async (req, res) => {
  try {
    console.log("Fetching doctor cards from the database...");

    // Fetch all doctor cards, excluding sensitive fields if any
    const doctorCards = await DoctorCard.find({}, "-__v"); // Exclude fields like `__v` if not needed

    if (!doctorCards || doctorCards.length === 0) {
      console.log("No doctor cards found in the database.");
      return res.status(404).json({ error: "No doctor cards found" });
    }

    res.status(200).json(doctorCards);
  } catch (error) {
    console.error("Error in getDoctorCard controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await DoctorCard.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatientCard = async (req, res) => {
  try {
    console.log("Fetching patient cards from the database...");

    // Fetch all doctor cards, excluding sensitive fields if any
    const patientCards = await PatientCard.find({}, "-__v");    // Exclude fields like `__v` if not needed

    if (!patientCards || patientCards.length === 0) {
      console.log("No patient cards found in the database.");
      return res.status(404).json({ error: "No patient cards found" });
    }

    res.status(200).json(patientCards);

  } catch (error) {
    console.error("Error in getpatientCard controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await PatientCard.findById(id);
    if (!patient) {
      return res.status(404).json({ error: "patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware for handling file uploads

const uploadMiddleware = multer({ storage }).single('profileImage');


const postDoctor = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }

    try {
      const { name, phoneNumber, diseases } = req.body;

      if (!name || !phoneNumber || !diseases) {
        return res
          .status(400)
          .json({ error: "Name, phone number, and diseases are required" });
      }

      const profileImage = req.file ? `/uploads/${req.file.filename}` : "";

      const newDoctor = new DoctorCard({
        name,
        phoneNumber,
        profileImage,
        diseases: diseases.split(",").map((disease) => disease.trim()),
      });

      const savedDoctor = await newDoctor.save();
      res.status(201).json({ ...savedDoctor._doc, role: "doctor" });
    } catch (error) {
      console.error("Error creating doctor:", error);
      res.status(500).json({ error: "Error creating doctor" });
    }
  });
};


const postPatient = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }

    try {
      const { name, phoneNumber, blood } = req.body;

      if (!name || !phoneNumber || !blood) {
        return res
          .status(400)
          .json({ error: "Name, phone number, and blood type are required" });
      }

      const profileImage = req.file ? `/uploads/${req.file.filename}` : "";

      const newPatient = new PatientCard({
        name,
        phoneNumber,
        blood,
        profileImage,
      });

      const savedPatient = await newPatient.save();
      res.status(201).json({
        ...savedPatient._doc, role: "patient",
      });
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ error: "Error creating patient" });
    }
  });
};

const deletePatientCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the card
    const deletedCard = await PatientCard.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ error: "Patient card not found" });
    }

    res.status(200).json({ message: "Patient card deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient card:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const editPatientCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, blood, profileImage } = req.body;

    // Find and update the patient card by ID
    const updatedCard = await PatientCard.findByIdAndUpdate(
      id,
      { name, phoneNumber, blood, profileImage },
      { new: true } // Return the updated document
    );

    if (!updatedCard) {
      return res.status(404).json({ error: "Patient card not found" });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error in editPatientCard controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { register, login, deleteUser, postDoctor, getDoctorCard, getPatientCard, getDoctorById, getPatientById, postPatient, deletePatientCard, editPatientCard };
