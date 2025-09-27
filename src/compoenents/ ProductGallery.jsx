import React, { useState } from "react";

const ProductGallery = ({ images }) => {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="gallery">
      <div className="thumbnails">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="thumb"
            className={`thumb ${selected === img ? "active" : ""}`}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
      <div className="main-image">
        <img src={selected} alt="main" />
      </div>
    </div>
  );
};

export default ProductGallery;
