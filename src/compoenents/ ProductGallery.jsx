import React, { useEffect, useState } from "react";
import { getProductsAndServicesDetail } from "../services/api";

const ProductGallery = () => {
  const [selected, setSelected] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // ✅ Fetch product details from backend
    const fetchData = async () => {
      try {
        const res = await getProductsAndServicesDetail();
        console.log("res full object:", JSON.stringify(res, null, 2));

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
    <div className="gallery">
      <div className="thumbnails">
        {product.Media?.map((media, idx) => (
          <img
            key={idx}
            src={`http://142.93.215.17${media.MediaPath}`} // ✅ prepend base URL
            alt={media.ActualFileName || "thumb"}
            className={`thumb ${selected === media.MediaPath ? "active" : ""}`}
            onClick={() => setSelected(media.MediaPath)}
          />
        ))}
      </div>

      <div className="main-image">
        {selected ? (
          <img
            src={`http://142.93.215.17${selected}`}
            alt="main"
            style={{ width: "400px", height: "auto" }}
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
