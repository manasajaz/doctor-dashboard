import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaLocationArrow, FaCamera, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({
    email: null,
    name: null,
    profilePicture: null,
    role: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name") || "Guest";
    const storedProfilePicture = localStorage.getItem("profilePicture") || "/default-avatar.png";
    const storedRole = localStorage.getItem("role") || "User";  // Default role if not found

    setUserData({
      email: storedEmail,
      name: storedName,
      profilePicture: storedProfilePicture,
      role: storedRole,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl min-h-[90vh] bg-white shadow-lg">

        {/* Profile Picture Section */}
        <div className="col-span-1 flex flex-col items-center text-center p-6 bg-gradient-to-t from-gray-100 to-gray-200 rounded-xl shadow-lg">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-blue-500 relative group">
            <img src={userData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            <div className="w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-300">
              <FaCamera className="text-white text-3xl" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-black mb-2">{userData.name}</h1>
          <h2 className="font-semibold text-blue-600 bg-blue-100 rounded-full px-6 py-1 mb-4">{userData.role || "General Practitioner"}</h2>
          <p className="text-gray-600 text-sm mb-6">
            Dedicated healthcare provider with years of experience in patient care and management.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full shadow-md mb-4">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg mt-6 transition flex justify-center items-center w-full shadow-md"
          >
            Logout
            <FaSignOutAlt className="ml-2" />
          </button>
        </div>

        {/* Other Details */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gradient-to-t from-gray-100 to-gray-200e p-6 rounded-xl shadow-lg flex flex-col space-y-6 text-gray-800">
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">About Me</h3>
            <p className="text-gray-600">
              I am a skilled and compassionate doctor with a focus on providing excellent care for patients in all stages of life.
              I strive to make a positive difference in the health and well-being of everyone I care for.
            </p>
          </div>

          {/* Role Section */}
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Role</h3>
            <div className="bg-blue-600 text-white py-1 px-6 rounded-full inline-block font-semibold">
              {userData.role}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-xl text-blue-800 mb-2">Contact Information</h2>
            <div className="flex items-center space-x-4 mb-4">
              <FaEnvelope className="text-blue-500 hover:text-blue-600 transition-colors" />
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <FaPhoneAlt className="text-blue-500 hover:text-blue-600 transition-colors" />
              <p className="text-gray-600">+92 0123456789</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaLocationArrow className="text-blue-500 hover:text-blue-600 transition-colors" />
              <p className="text-gray-600">Karachi, Pakistan</p>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition lg:w-1/3 xl:w-1/2 md:w-1/4 sm:w-full shadow-md">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

