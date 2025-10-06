// RequestForm.js
import React, { useState, useEffect } from "react";
import "../common/RequestForm.css";
import Select from "react-select";
import {
  getAllIndustry,
  getAllCategoryByIndustry,
  getAllSubCategoryByCategory,
  createInquiry,
} from "../services/api";
import { Country, State, City } from "country-state-city"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestForm() {
  const userRowId = localStorage.getItem("UserRowId");

  const [formData, setFormData] = useState({
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

  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ For country → state → city
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // ✅ For image preview
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

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

  // 🔹 Handle Country Change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setFormData({ ...formData, country: countryCode, state: "", city: "" });

    const stateList = State.getStatesOfCountry(countryCode);
    setStates(stateList);
    setCities([]);
  };

  // 🔹 Handle State Change
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setFormData({ ...formData, state: stateCode, city: "" });

    const cityList = City.getCitiesOfState(formData.country, stateCode);
    setCities(cityList);
  };

  // 🔹 Handle Inputs (including file preview)
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files ? files[0] : null;
      setFormData({
        ...formData,
        [name]: file,
      });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // 🔹 Submit Inquiry
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["requestType", "productName", "industry"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.warn(`⚠️ Please fill in required fields: ${missingFields.join(", ")}`);
      return;
    }

    const inquiryPayload = {
      EntityType: formData.type === "products" ? "products" : "services",
      RequestType: formData.requestType || "Information",
      CategoryId: formData.category || "3fa85f64",
      SubCategoryId: formData.subCategory || "3fa85f64",
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
      await createInquiry(inquiryPayload);

      toast.success("✅ Inquiry created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

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
      setStates([]);
      setCities([]);
      setPreviewImage(null);
    } catch (err) {
      console.error("❌ Failed to create inquiry:", err);
      toast.error(`❌ Failed to submit inquiry: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
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

          {/* Industry - with Search */}
          <div>
            <label>Industry *</label>
            <Select
              options={industries.map((ind) => ({
                value: ind.IndustryId,
                label: ind.IndustryName,
              }))}
              value={
                industries
                  .map((ind) => ({ value: ind.IndustryId, label: ind.IndustryName }))
                  .find((opt) => opt.value === formData.industry) || null
              }
              onChange={(selected) => {
                handleIndustryChange({ target: { value: selected ? selected.value : "" } });
              }}
              placeholder="Search or select industry"
              isClearable
            />
          </div>

          {/* Category - with Search */}
          <div>
            <label>Categories</label>
            <Select
              options={categories.map((cat) => ({
                value: cat.CategoryId,
                label: cat.CategoryName,
              }))}
              value={
                categories
                  .map((cat) => ({ value: cat.CategoryId, label: cat.CategoryName }))
                  .find((opt) => opt.value === formData.category) || null
              }
              onChange={(selected) => {
                handleCategoryChange({ target: { value: selected ? selected.value : "" } });
              }}
              placeholder="Search or select category"
              isClearable
              isDisabled={!formData.industry}
            />
          </div>

          {/* Sub Category - with Search */}
          <div>
            <label>Sub-Categories</label>
            <Select
              options={subCategories.map((sub) => ({
                value: sub.SubCategoryId,
                label: sub.SubCategoryName,
              }))}
              value={
                subCategories
                  .map((sub) => ({ value: sub.SubCategoryId, label: sub.SubCategoryName }))
                  .find((opt) => opt.value === formData.subCategory) || null
              }
              onChange={(selected) => {
                setFormData({ ...formData, subCategory: selected ? selected.value : "" });
              }}
              placeholder="Search or select sub category"
              isClearable
              isDisabled={!formData.category}
            />
          </div>

          {/* Country */}
          <div>
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
            >
              <option value="">Select your country</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label>State / Province</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              disabled={!formData.country}
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
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
            {previewImage && (
              <div>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }}
                />
              </div>
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

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
