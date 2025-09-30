import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllProductsAndServices } from "../services/api"; // adjust path

const SimilarProducts = () => {
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsAndServices();

        if (data?.Data && Array.isArray(data.Data)) {
          const mapped = data.Data.map((p) => ({
            id: p.ProductsAndServicesId,
            name: p.ProductsAndServicesName || "Unnamed Product",
            image:
              p.Media && p.Media.length > 0
                ? `http://142.93.215.17${p.Media[0].MediaPath}`
                : "/placeholder.png",
            category: p.CategoryName || "Uncategorized",
          }));
          setItems(mapped);
        }
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
