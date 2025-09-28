import React from "react";
import "../common/Breadcrumb.css";

const Breadcrumb = () => {
  const crumbs = [
    "Home",
    "Clothing & Accessories",
    "Topwear",
    "Shirts",
    "Men's Shirts",
    "Casual Shirt",
  ];

  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-left">
        <h3>Apparel & Fashion</h3>
        <p>Button-Down Shirt</p>
      </div>

      <div className="breadcrumb-right">
        {crumbs.map((crumb, index) => (
          <span key={index} className="crumb">
            {crumb}
            {index < crumbs.length - 1 && <span className="separator">›</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
