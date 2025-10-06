// ProductGallery.js
import React, { useEffect, useState } from "react";
import { getProductsAndServicesDetail } from "../services/api";

const BASE_URL = "http://142.93.215.17";

const ProductGallery = () => {
  const [selected, setSelected] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // ✅ Fetch product details from backend
    const fetchData = async () => {
      try {
        const res = await getProductsAndServicesDetail();

        if (res?.Success && res?.Data) {
          setProduct(res.Data);

          // ✅ Default select first image if available
          if (res.Data.Media?.length > 0) {
            setSelected(res.Data.Media[0].MediaPath);
          }
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      }
    };

    fetchData();
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="gallery" style={{ display: "flex", gap: "20px" }}>
      {/* Thumbnail List */}
      <div className="thumbnails" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {product.Media?.map((media, idx) => (
          <img
            key={idx}
            src={`${BASE_URL}${media.MediaPath}`} // ✅ prepend base URL
            alt={media.ActualFileName || "thumb"}
            className={`thumb ${selected === media.MediaPath ? "active" : ""}`}
            onClick={() => setSelected(media.MediaPath)}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
              border: selected === media.MediaPath ? "2px solid blue" : "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
              background: "#fff"
            }}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {selected ? (
          <img
            src={`${BASE_URL}${selected}`}
            alt="main"
            style={{
              width: "400px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "10px",
              background: "#f9f9f9",
              padding: "10px"
            }}
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
