// ✅ Load environment variables from Vite
const BASE_URL = import.meta.env.VITE_BASE_URL;
const EMAIL = import.meta.env.VITE_EMAIL;
const PASSWORD = import.meta.env.VITE_PASSWORD;

/**
 * 🔹 Helper to get Auth Token from localStorage
 */
const getToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No AuthToken found. Please login first.");
  return token;
};

/**
 * 🔹 Generic API Request wrapper
 * Handles: token, method, headers, body, error handling
 */
const apiRequest = async (endpoint, { method = "POST", body = null, auth = true } = {}) => {
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

  const raw = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status} → ${raw}`);

  try {
    return JSON.parse(raw);
  } catch {
    return raw; // fallback if response is plain text
  }
};


export const autoLogin = async () => {
  const response = await fetch(`${BASE_URL}/api/userService/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      EmailId: EMAIL,
      Password: PASSWORD,
    }),
  });

  if (!response.ok) throw new Error(`Login failed: ${response.status}`);

  const data = await response.json();
  const token = data?.Data?.AuthToken;
  const userRowId = data?.Data?.UserRowId;

  if (token) localStorage.setItem("authToken", token);
  if (userRowId) localStorage.setItem("UserRowId", userRowId);

  return data;
};

// 🔹 Get All Industry
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

// 🔹 Get All Categories by Industry
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

// 🔹 Get All SubCategories by Category
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

// 🔹 Create Inquiry
export const createInquiry = (inquiryData) =>
  apiRequest("/api/InquiriesService/createInquiry", {
    body: inquiryData,
  });

// 🔹 Get All Products & Services
export const getAllProductsAndServices = async () => {
  const data = await apiRequest("/api/ProductsAndServices/getAllProductsAndServices", {
    body: { PageNo: 1, PageSize: 40 },
  });

  // Save first productId in localStorage
  if (data?.Data?.length > 0) {
    localStorage.setItem("ProductsAndServicesId", data.Data[3].ProductsAndServicesId);
  }

  return data;
};

// 🔹 Get Product/Service Detail
export const getProductsAndServicesDetail = async () => {
  const productId = localStorage.getItem("ProductsAndServicesId");
  if (!productId) throw new Error("No ProductsAndServicesId found in localStorage.");

  const response = await apiRequest(
    `/api/ProductsAndServices/getProductsAndServicesDetail?productsAndServicesId=${encodeURIComponent(
      productId
    )}`,
    { method: "GET" }
  );

  console.log("📦 Product Details Response:", response); // ✅ log here
  return response;
};


// 🔹 Get All Products/Services By User
export const getAllProductsAndServicesByUser = (searchText) =>
  apiRequest("/api/ProductsAndServices/getAllProductsAndServicesByUser", {
    body: {
      PageNo: 1,
      PageSize: 20,
      SearchText: searchText || "",
    },
  });
