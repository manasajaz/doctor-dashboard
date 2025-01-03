const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directory where images will be temporarily stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only JPEG, PNG, and JPG formats are allowed'), false); // Reject the file
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // Max file size: 2MB
  },
  fileFilter: fileFilter,
})
// .single('profilePicture'); // Use .single() for single file upload

module.exports = upload;
