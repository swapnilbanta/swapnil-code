import React, { useEffect, useState } from "react";
import { getAllProductsAndServicesByUser } from "../services/api";
 // adjust import path

const SellerCards = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const data = await getAllProductsAndServicesByUser();

        if (data?.Success && Array.isArray(data.Data)) {
          setSellers(
            data.Data.map((item) => ({
              id: item.ProductsAndServicesId,
              name: item.UserName,
              type: item.ItemType,
              logo: item.Media?.[0]?.MediaPath
                ? `http://142.93.215.17${item.Media[0].MediaPath}`
                : "/placeholder-logo.png",
            }))
          );
        } else {
          setError(data?.Message || "No sellers found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) return <p>Loading sellers...</p>;
  if (error) return <p className="error">❌ {error}</p>;

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
