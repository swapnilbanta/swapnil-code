// RequestForm.js
import React, { useState, useEffect } from "react";
import "../common/RequestForm.css";
import {
  getAllIndustry,
  getAllCategoryByIndustry,
  getAllSubCategoryByCategory,
  createInquiry,
} from "../services/api";

export default function RequestForm() {
   const userRowId = localStorage.getItem("UserRowId");
  const [formData, setFormData] = useState({
    requestType: "", // Information / Quotation / Proposal
    productName: "",
    industry: "",
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
    type: "products", // products or services
  });

  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch industries on mount
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const industryResponse = await getAllIndustry();
        const industriesData = industryResponse?.Data || [];
        setIndustries(industriesData);

        if (industriesData.length > 0) {
          const firstIndustryId = industriesData[0].IndustryId;
          const categoryResponse = await getAllCategoryByIndustry(firstIndustryId);
          setCategories(categoryResponse?.Data || []);
        }
      } catch (err) {
        console.error("Error fetching industries/categories ❌", err);
      }
    }
    fetchIndustries();
  }, []);

  // 🔹 Handle Industry Change
  const handleIndustryChange = async (e) => {
    const industryId = e.target.value;
    setFormData({ ...formData, industry: industryId, category: "", subCategory: "" });
    setSubCategories([]);

    if (industryId) {
      try {
        const categoryResponse = await getAllCategoryByIndustry(industryId);
        setCategories(categoryResponse?.Data || []);
      } catch (err) {
        console.error("Error fetching categories ❌", err);
      }
    }
  };

  // 🔹 Handle Category Change
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category: categoryId, subCategory: "" });

    if (categoryId) {
      try {
        const subCatResponse = await getAllSubCategoryByCategory(categoryId);
        setSubCategories(subCatResponse?.Data || []);
      } catch (err) {
        console.error("Error fetching subcategories ❌", err);
      }
    }
  };

  // 🔹 Handle Other Inputs
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files ? files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };



  // 🔹 Submit Inquiry - FIXED PAYLOAD
// 🔹 Submit Inquiry - FIXED PAYLOAD
// 🔹 Submit Inquiry
// 🔹 Submit Inquiry - CORRECTED PAYLOAD
// 🔹 Submit Inquiry - Correct Payload
const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = ["requestType", "productName", "industry"];
  const missingFields = requiredFields.filter((field) => !formData[field]);

  if (missingFields.length > 0) {
    alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
    return;
  }
const inquiryPayload = {
  EntityType: formData.type === "products" ? "products" : "services",
  RequestType: formData.requestType || "Information",
  CategoryId: formData.category || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  SubCategoryId: formData.subCategory || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  UserRowId: userRowId,
  RequestingBusinessId: null,
  Country: formData.country || "",
  State: formData.state || "",
  City: formData.city || "",
  Pincode: formData.pinCode || "",
  Quantity: Number(formData.quantity) || 0,
  Value: Number(formData.value) || 0,
  Units: Number(formData.units) || 0,
  ImagePath: formData.image ? formData.image.name : "",
  AdditionalDetails: formData.technicalDetails || "",
  Description: formData.description || "",
  Status: "Open",
  ProductName: formData.productName,
};

  try {
    setLoading(true);
    const res = await createInquiry(inquiryPayload); 
    alert("✅ Inquiry created successfully!");

    // Reset form
    setFormData({
      requestType: "",
      productName: "",
      industry: "",
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

    setCategories([]);
    setSubCategories([]);
  } catch (err) {
    console.error("❌ Failed to create inquiry:", err);
    alert(`Failed to submit inquiry: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="form-container">
      <h2>Request for Information / Quotation / Proposal</h2>
      <p>Choose your request type and provide your details.</p>

      {/* Toggle Products / Services */}
      <div className="toggle-buttons">
        <label>
          <input
            type="radio"
            name="type"
            value="products"
            checked={formData.type === "products"}
            onChange={handleChange}
          />
          Products
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="services"
            checked={formData.type === "services"}
            onChange={handleChange}
          />
          Services
        </label>
      </div>

      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Request Type */}
          <div>
            <label>Request Type *</label>
            <select 
              name="requestType" 
              value={formData.requestType} 
              onChange={handleChange}
              required
            >
              <option value="">Select request type</option>
              <option value="Information">Information</option>
              <option value="Quotation">Quotation</option>
              <option value="Proposal">Proposal</option>
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label>Product Name *</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              placeholder="Enter product name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Industry */}
          <div>
            <label>Industry *</label>
            <select 
              name="industry" 
              value={formData.industry} 
              onChange={handleIndustryChange}
              required
            >
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind.IndustryId} value={ind.IndustryId}>
                  {ind.IndustryName}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label>Categories</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleCategoryChange}
              disabled={!formData.industry}
            >
              <option value="">Select your Segment</option>
              {categories.map((cat) => (
                <option key={cat.CategoryId} value={cat.CategoryId}>
                  {cat.CategoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Category */}
          <div>
            <label>Sub-Categories</label>
            <select 
              name="subCategory" 
              value={formData.subCategory} 
              onChange={handleChange}
              disabled={!formData.category}
            >
              <option value="">Select sub segment type</option>
              {subCategories.map((sub) => (
                <option key={sub.SubCategoryId} value={sub.SubCategoryId}>
                  {sub.SubCategoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select your country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label>State / Province</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              placeholder="Enter state"
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="Enter location"
              onChange={handleChange}
            />
          </div>

          {/* Pin Code */}
          <div>
            <label>Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              placeholder="Enter your pincode"
              onChange={handleChange}
            />
          </div>

          {/* Quantity */}
          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              placeholder="Enter quantity"
              onChange={handleChange}
              min="0"
            />
          </div>

          {/* Value */}
          <div>
            <label>Value</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              placeholder="Enter values in numbers"
              onChange={handleChange}
              min="0"
            />
          </div>

          {/* Units */}
          <div>
            <label>Units</label>
            <input
              type="number"
              name="units"
              value={formData.units}
              placeholder="Enter Units (numeric)"
              onChange={handleChange}
              min="0"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label>Upload Image</label>
            <input 
              type="file" 
              name="image" 
              onChange={handleChange}
              accept="image/*"
            />
            {formData.image && (
              <small>Selected: {formData.image.name}</small>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <div>
          <label>Add Technical Details (if any)</label>
          <textarea
            name="technicalDetails"
            value={formData.technicalDetails}
            placeholder="Type your technical details"
            onChange={handleChange}
            rows="3"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Type product description"
            onChange={handleChange}
            rows="3"
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}