import React, { useState, useEffect } from "react";
import "../common/ContactForm.css";
import { autoLogin } from "../services/api"; // import your login api

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });

  // 🔹 Run login once & bind data into form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await autoLogin();

        if (res?.Data) {
          const firstName = res.Data.FirstName || "";
          const middleName = res.Data.MiddleName ? ` ${res.Data.MiddleName}` : "";
          const lastName = res.Data.LastName ? ` ${res.Data.LastName}` : "";
          const businessId = res.Data.BusinessId || "";
          const companyName = res.Data.CompanyName || "";

          setFormData({
            fullName: `${firstName}${middleName}${lastName}`.trim(),
            // ✅ Company name with BusinessId
            companyName: businessId
              ? `${companyName} (ID: ${businessId})`
              : companyName,
            phoneNumber: res.Data.PhoneNumber || "",
            email: res.Data.EmailId || "",
          });
        }
      } catch (error) {
        console.error("AutoLogin failed:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
              placeholder="Enter full name"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              placeholder="Enter company name"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="+91 1234567890"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="example@gmail.com"
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
}
