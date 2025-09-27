import React, { useState } from "react";
import "../common/ContactForm.css"; // Import CSS

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="form-container-one">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Contact Information</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+91 1234567890"
            />
          </div>

          <div className="form-group">
            <label>Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Submit Request</button>
        </div>
      </form>
    </div>
  );
}
