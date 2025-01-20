import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";
import axios from "axios";

function DoctorForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "", // Updated field name
    profileImage: "", // Updated field name
    diseases: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("profileImage", formData.profileImage);
    data.append("diseases", formData.diseases);

    try {
      const response = await axios.post(
        "http://localhost:4600/api/auth/doctor",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Doctor created successfully!");
        console.log("Server Response:", response.data);
      } else {
        alert("Error creating doctor");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidepannel />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Forms/</span> Doctor
                Registration
              </h4>
              <div className="row">
                <div className="col-xl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Doctor Registration</h5>
                      <small className="text-muted float-end">
                        Fill the details
                      </small>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Dr. John Doe"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+1234567890"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="profileImage">
                            Profile Picture
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="profileImage"
                            name="profileImage"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                profileImage: e.target.files[0],
                              })
                            }
                            accept="image/*"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="diseases">
                            Specialization / Diseases Treated
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="diseases"
                            name="diseases"
                            value={formData.diseases}
                            onChange={handleInputChange}
                            placeholder="Cardiology, Neurology"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Register Doctor
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

export default DoctorForm;
