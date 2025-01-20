const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 6800;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));


app.get("/" , (req, res) => {
    res.send("Welcome")
})


// import routes
const authRoutes = require('./Routes/authRoute');

//route Use
app.use('/api/auth', authRoutes);



// MongoDB connection
mongoose.connect("mongodb+srv://moizmirza212:3EJeeE8K0T6BViw4@cluster0.6u4kpyg.mongodb.net/")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log("MongoDB connection Error", err);
  });

// Server Start
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
