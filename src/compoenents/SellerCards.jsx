import React from "react";

const SellerCards = ({ sellers }) => {
  return (
    <div className="sellers">
      <h3>Other Sellers for This Product</h3>
      <div className="seller-list">
        {sellers.map((seller) => (
          <div key={seller.id} className="seller-card">
            <div className="seller-logo">
              <img src={seller.logo} alt={seller.name} />
            </div>
            <div className="seller-info">
              <h4>{seller.name}</h4>
              <p className="seller-type">{seller.type}</p>
              <span className="verified">Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerCards;
