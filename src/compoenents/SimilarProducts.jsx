import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllProductsAndServices } from "../services/api";

const SimilarProducts = ({ res }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // 🔹 Normalizer so both API and props look the same
  const mapProducts = (list) =>
    list.map((p) => ({
      id: p.ProductsAndServicesId || p.id,
      name: p.ProductsAndServicesName || p.name || "Unnamed Product",
      image:
        p.Media?.length > 0
          ? `http://142.93.215.17${p.Media[0].MediaPath}`
          : p.image || "/placeholder.png",
      category: p.CategoryName || p.category || "Uncategorized",
    }));

  // 🔹 Fallback API load
  const loadAllProducts = async () => {
    try {
      const data = await getAllProductsAndServices();
      if (data?.Data && Array.isArray(data.Data)) {
        setItems(mapProducts(data.Data));
      }
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (res && res.length > 0) {
      // ✅ If props present → use them directly
      setItems(mapProducts(res));
      setLoading(false);
    } else {
      // ✅ Otherwise load from API
      loadAllProducts();
    }
  }, [res]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="similar">
      <h3 className="similar-title">Explore Similar Products</h3>
      {items.length > 0 ? (
        <Slider {...settings} className="similar-slider">
          {items.map((item) => (
            <div key={item.id} className="similar-card">
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <p className="product-name">{item.name}</p>
              <p className="product-category">{item.category}</p>
              <button className="more-btn">See More....</button>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SimilarProducts;
