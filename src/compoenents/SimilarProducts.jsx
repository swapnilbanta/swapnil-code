import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimilarProducts = ({ items }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // 4 cards like in your screenshot
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // mobile landscape
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // mobile portrait
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="similar">
      <h3 className="similar-title">Explore Similar Products</h3>
      <Slider {...settings} className="similar-slider">
        {items.map((item) => (
          <div key={item.id} className="similar-card">
            <img src={item.image} alt={item.name} />
            <p className="product-name">{item.name}</p>
            <p className="product-category">Clothing, textiles, accessories</p>
            <button className="more-btn">See More....</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimilarProducts;
