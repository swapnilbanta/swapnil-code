const BASE_URL = "http://142.93.215.17";

// 🔹 Login function
export const autoLogin = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/userService/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        EmailId: "fa730088@gmail.com",   
        Password: "Welcome*123",         
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, ...errorData };
    }

    const data = await response.json();
    const token = data?.Data?.AuthToken;
    const UserRowId = data?.Data?.UserRowId;

    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token saved successfully ✅");
    } else {
      console.warn("No AuthToken in response");
    }

    if (UserRowId) {
      localStorage.setItem("UserRowId", UserRowId);
      console.log("UserRowId saved successfully ✅");
    } else {
      console.warn("No UserRowId in response");
    }

    return data;
  } catch (err) {
    console.error("Auto login failed ❌", err);
    throw err;
  }
};


export const getAllIndustry = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No AuthToken found. Please login first.");
    }

    const response = await fetch(`${BASE_URL}/api/commonService/getAllIndustry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        PageNo: 1,
        PageSize: 10,
        SearchText: "",
        SortBy: "",
        SortOrder: "",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, ...errorData };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("GetAllIndustry failed ❌", err);
    throw err;
  }
};


export const getAllCategoryByIndustry = async (industryId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No AuthToken found. Please login first.");
    }

    const response = await fetch(`${BASE_URL}/api/commonService/getAllCategoryByIndustry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",  // 👈 changed from text/plain to json
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
      body: JSON.stringify({
        PageNo: 1,
        PageSize: 2,
        SearchText: "",
        SortBy: "",
        SortOrder: "",
        IndustryId: industryId, // 👈 pass the industry ID dynamically
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, ...errorData };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("GetAllCategoryByIndustry failed ❌", err);
    throw err;
  }
};



export const getAllSubCategoryByCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No AuthToken found. Please login first.");
    }

    const response = await fetch(`${BASE_URL}/api/commonService/getAllSubCategoryByCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json", // changed from text/plain
        Authorization: `Bearer ${token}`, // attach token
      },
      body: JSON.stringify({
        PageNo: 1,
        PageSize: 10,
        SearchText: "",
        SortBy: "",
        SortOrder: "",
        CategoryId: categoryId, // dynamic categoryId
        SubCategoryId: null,    // optional, can pass null or leave it
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, ...errorData };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("GetAllSubCategoryByCategory failed ❌", err);
    throw err;
  }
};




export const createInquiry = async (inquiryData) => {
  console.log("📤 Sending inquiry data:", inquiryData);
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No AuthToken found. Please login first.");

    const response = await fetch("http://142.93.215.17/api/InquiriesService/createInquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inquiryData), // ✅ send flat payload
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ createInquiry failed:", error);
    throw error;
  }
};





export const getAllProductsAndServices = async () => {
  try {
      const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No AuthToken found. Please login first.");

    const response = await fetch("http://142.93.215.17/api/ProductsAndServices/getAllProductsAndServices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain", // match curl first
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        PageNo: 1,
        PageSize: 20,
      }),
    });

    const raw = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} → ${raw}`);
    }

    // parse if JSON
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch (err) {
    console.error("❌ getAllProductsAndServices failed", err);
    throw err;
  }
};




// Add better token validation
export const getProductsAndServicesDetail = async (productsAndServicesId) => {
  try {
    const token = localStorage.getItem("authToken");
    console.log("🔑 Token exists:", !!token);
    
    if (!token) {
      throw new Error("No AuthToken found. Please login first.");
    }

    if (!productsAndServicesId) {
      throw new Error("Product/Service ID is required");
    }

    // Validate UUID format (basic check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productsAndServicesId)) {
      throw new Error("Invalid Product/Service ID format. Expected UUID.");
    }

    const url = `http://142.93.215.17/api/ProductsAndServices/getProductsAndServicesDetail?productsAndServicesId=${encodeURIComponent(productsAndServicesId)}`;
    
    console.log("🌐 API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "text/plain",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response ok:", response.ok);

    const raw = await response.text();
    console.log("🔎 Raw response:", raw);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${raw}`);
    }

    // Handle both JSON and plain text responses
    if (raw.trim().startsWith('{') || raw.trim().startsWith('[')) {
      const parsedData = JSON.parse(raw);
      console.log("✅ Parsed data:", parsedData);
      return parsedData;
    } else {
      console.warn("API returned non-JSON response:", raw);
      return { Data: { Sellers: [] } }; // Fallback empty structure
    }
  } catch (err) {
    console.error("❌ API call failed:", err);
    throw err;
  }
};




export const getAllProductsAndServicesByUser  = async () => {
  try {
      const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No AuthToken found. Please login first.");

    const response = await fetch("http://142.93.215.17/api/ProductsAndServices/getAllProductsAndServicesByUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain", // match curl first
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        PageNo: 1,
        PageSize: 20,
        "SearchText": "Laptop",
      }),
    });

    const raw = await response.text();
    console.log(raw);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} → ${raw}`);
    }

    // parse if JSON
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch (err) {
    console.error("❌ getAllProductsAndServices failed", err);
    throw err;
  }
};

