import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    email: null,
    name: null,
    profilePicture: null,
    role: null,  // Added role
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name") || "Guest";
    const storedProfilePicture = localStorage.getItem("profilePicture") || "/default-avatar.png";
    const storedRole = localStorage.getItem("role") || "User";  // Default role if not found
    
    setUserData({
      email: storedEmail,
      name: storedName,
      profilePicture: storedProfilePicture,
      role: storedRole,  // Set role
    });
  }, []);



  const [email, setEmail] = useState(null);
  

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("role");  // Remove role on logout
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0" />
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-3">
              {userData.email ? (
                <p className="mb-0">{userData.email}</p>
              ) : (
                <p className="mb-0">No email found</p>
              )}
            </li>

            {/* User Dropdown */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <div className="nav-link dropdown-toggle hide-arrow" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
                <div className="avatar avatar-online">
                  <img
                    src={userData.profilePicture}
                    alt="User Avatar"
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </div>

              {isDropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show">
                  <li>
                    <div className="dropdown-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar avatar-online">
                            <img
                              src={userData.profilePicture}
                              alt="User Avatar"
                              className="w-px-40 h-auto rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <span className="fw-semibold d-block">{userData.name}</span>
                          <small className="text-muted">{userData.role}</small>  {/* Display role */}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li><div className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-user me-2" />
                      <span className="align-middle">My Profile</span>
                    </a>
                  </li>
                  <li><div className="dropdown-divider" /></li>
                  <li>
                    <p className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                      <i className="bx bx-power-off me-2" />
                      <span className="align-middle">Log Out</span>
                    </p>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
