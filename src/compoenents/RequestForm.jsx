import React, { useState } from "react";
import "./RequestForm.css";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    requestType: "",
    productName: "",
    category: "",
    subCategory: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    quantity: "",
    value: "",
    units: "",
    image: null,
    technicalDetails: "",
    description: "",
    type: "products",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted! Check console.");
  };

  return (
    <div className="form-container">
      <h2>Request for Information / Quotation / Proposal</h2>
      <p>Choose your request type and provide your details.</p>

     <div className="toggle-buttons">
  <label>
     Products
    <input
      type="radio"
      name="type"
      value="products"
      checked={formData.type === "products"}
      onChange={handleChange}
    />
   
  </label>
  <label>
    
    <input
      type="radio"
      name="type"
      value="services"
      checked={formData.type === "services"}
      onChange={handleChange}
    />
  
  </label>
</div>



      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Request Type</label>
            <select name="requestType" onChange={handleChange}>
              <option value="">Select request type</option>
              <option>Information</option>
              <option>Quotation</option>
              <option>Proposal</option>
            </select>
          </div>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Categories</label>
            <select name="category" onChange={handleChange}>
              <option value="">Select your Segment</option>
              <option>Electronics</option>
              <option>Machinery</option>
              <option>Software</option>
            </select>
          </div>
          <div>
            <label>Sub-Categories</label>
            <select name="subCategory" onChange={handleChange}>
              <option value="">Select sub segment type</option>
              <option>Type A</option>
              <option>Type B</option>
            </select>
          </div>
          <div>
            <label>Country</label>
            <select name="country" onChange={handleChange}>
              <option value="">Select your country</option>
              <option>USA</option>
              <option>India</option>
              <option>UK</option>
            </select>
          </div>
          <div>
            <label>State / Province</label>
            <select name="state" onChange={handleChange}>
              <option value="">Select your State</option>
              <option>California</option>
              <option>Maharashtra</option>
              <option>London</option>
            </select>
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter location"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Pin Code</label>
            <input
              type="text"
              name="pinCode"
              placeholder="Enter your pincode"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Value (no's)</label>
            <input
              type="number"
              name="value"
              placeholder="Enter values in numbers"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Units</label>
            <input
              type="text"
              name="units"
              placeholder="Enter Units"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Upload Image</label>
            <input type="file" name="image" onChange={handleChange} />
          </div>
        </div>

        <div>
          <label>Add Technical Details (if any)</label>
          <textarea
            name="technicalDetails"
            placeholder="Type your technical details"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Type product description"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
