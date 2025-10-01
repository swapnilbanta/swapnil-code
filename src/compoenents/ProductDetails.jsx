import { useNavigate } from "react-router-dom";
import { getProductsAndServicesDetail } from "../services/api";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // ✅ Fetch product details from backend
    const fetchData = async () => {
      try {
         const res = await getProductsAndServicesDetail();

        if (res?.Success && res?.Data) {
          setProduct(res.Data); // store product data
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="details">
      {/* ✅ Basic product info */}
      <h2>{product.ProductsAndServicesName}</h2>
      <p className="supply">{product.UserName}</p>

      {/* Example Verified (Draft/Published check) */}
      {product.Status === "Published" && (
        <div className="verified">Verified</div>
      )}

      <br />

      <button className="quote-btn" onClick={() => navigate("/quote")}>
        Request a Quote
      </button>

      {/* ✅ Specification */}
      <h3>Specification</h3>
      <div className="spec-grid">
        <div>Product Size: {product.ProductSize || "N/A"}</div>
        <div>
          Customization Availability:{" "}
          {product.CustomizationAvailability ?? "N/A"}
        </div>
        <div>Category: {product.CategoryName}</div>
        <div>Sub Category: {product.SubCategoryName}</div>
        <div>Description: {product.Description || "N/A"}</div>
      </div>

      <button className="more-btn">More...</button>
    </div>
  );
};

export default ProductDetails;
