import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import loginImg from "../assets/blog.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4600/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login Response:", response.data);

      const { token, email, name, profilePicture , role } = response.data;

      if (!token || !email) {
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      // Save user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name || "Guest");
      localStorage.setItem("profilePicture", profilePicture || "/default-avatar.png");
      localStorage.setItem("role" , role || "Guest")

      toast.success("Login successful!");
      navigate("/"); // Redirect to home/dashboard

    } catch (error) {
      console.error("Login Error:", error);
      if (error.response?.status === 400) {
        toast.error("Invalid email or password.");
      } else if (error.response?.status === 500) {
        toast.error("Server error, please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="grid grid-cols-12 gap-5 p-5 bg-red-50 min-h-screen">
      <div className="md:col-span-4 col-span-12 row-span-6">
        <img className="w-full object-cover h-full transition-all duration-500" src={loginImg} alt="Login" />
      </div>
      <div className="md:col-span-8 col-span-12 row-span-6 bg-white p-5 rounded shadow min-h-screen">
        <h2 className="text-4xl mb-8 pb-4">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {formData.showPassword ? (
                  <FaRegEye className="text-gray-600 cursor-pointer" onClick={togglePasswordVisibility} />
                ) : (
                  <FaRegEyeSlash className="text-gray-600 cursor-pointer" onClick={togglePasswordVisibility} />
                )}
              </span>
            </div>
          </div>
          <button type="submit" className="block w-2/5 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700">
            Login
          </button>
          <p className="inline-block">Don't have an account?</p>
          <Link to="/register" className="ml-2 text-md text-indigo-500 underline">
            Sign Up
          </Link>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar closeOnClick draggable theme="light" transition={Slide} />
    </div>
  );
};

export default Login;
