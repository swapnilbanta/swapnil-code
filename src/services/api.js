// ✅ Load environment variables from Vite
const BASE_URL = "http://142.93.215.17";

/**
 * 🔹 Safe environment variable access with fallbacks
 */
const getEnvVar = (key) => {
  // Try Vite env first
  if (import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  // Fallback for production/vercel
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key];
  }
  
  console.warn(`Environment variable ${key} not found`);
  return null;
};

const EMAIL = "fa730088@gmail.com"
const PASSWORD = "Welcome*123"

/**
 * 🔹 Enhanced API Request wrapper with better error handling
 */
const apiRequest = async (endpoint, { method = "POST", body = null, auth = true } = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    if (auth) {
      headers.Authorization = `Bearer ${getToken()}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * 🔹 Enhanced Auto Login with environment variable checks
 */
export const autoLogin = async () => {
  // Check if credentials are available
  if (!EMAIL || !PASSWORD) {
    const errorMsg = "Login credentials not found. Please check environment variables.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/userService/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        EmailId: EMAIL,
        Password: PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data?.Data?.AuthToken) {
      throw new Error("No AuthToken received from login response");
    }

    const token = data.Data.AuthToken;
    const userRowId = data.Data.UserRowId;

    // Store in localStorage
    localStorage.setItem("authToken", token);
    if (userRowId) {
      localStorage.setItem("UserRowId", userRowId);
    }

    console.log("✅ Login successful");
    return data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

// 🔹 Get Auth Token with enhanced error handling
const getToken = () => {
  // Try to get token from localStorage
  const token = localStorage.getItem("authToken");
  
  if (!token) {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error("Not in browser environment - localStorage not available");
    }
    throw new Error("No AuthToken found. Please login first.");
  }
  
  return token;
};

// Your other API functions remain the same...
export const getAllIndustry = () =>
  apiRequest("/api/commonService/getAllIndustry", {
    body: {
      PageNo: 1,
      PageSize: 10,
      SearchText: "",
      SortBy: "",
      SortOrder: "",
    },
  });

export const getAllCategoryByIndustry = (industryId) =>
  apiRequest("/api/commonService/getAllCategoryByIndustry", {
    body: {
      PageNo: 1,
      PageSize: 10,
      SearchText: "",
      SortBy: "",
      SortOrder: "",
      IndustryId: industryId,
    },
  });

export const getAllSubCategoryByCategory = (categoryId) =>
  apiRequest("/api/commonService/getAllSubCategoryByCategory", {
    body: {
      PageNo: 1,
      PageSize: 10,
      SearchText: "",
      SortBy: "",
      SortOrder: "",
      CategoryId: categoryId,
      SubCategoryId: null,
    },
  });

export const createInquiry = (inquiryData) =>
  apiRequest("/api/InquiriesService/createInquiry", {
    body: inquiryData,
  });

export const getAllProductsAndServices = async () => {
  const data = await apiRequest("/api/ProductsAndServices/getAllProductsAndServices", {
    body: { PageNo: 1, PageSize: 40 },
  });

  if (data?.Data?.length > 0) {
    localStorage.setItem("ProductsAndServicesId", data.Data[3].ProductsAndServicesId);
  }

  return data;
};

export const getProductsAndServicesDetail = async () => {
  const productId = localStorage.getItem("ProductsAndServicesId");
  if (!productId) throw new Error("No ProductsAndServicesId found in localStorage.");

  const response = await apiRequest(
    `/api/ProductsAndServices/getProductsAndServicesDetail?productsAndServicesId=${encodeURIComponent(productId)}`,
    { method: "GET" }
  );

  return response;
};

export const getAllProductsAndServicesByUser = (searchText) =>
  apiRequest("/api/ProductsAndServices/getAllProductsAndServicesByUser", {
    body: {
      PageNo: 1,
      PageSize: 20,
      SearchText: searchText || "",
    },
  });