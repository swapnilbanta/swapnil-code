
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();

  return (
  <div className="details">
    
      <h2>{product.company}</h2>
      <p className="supply" >{product.supplier}</p>

      {product.verified && <div className="verified"> Verified</div>}
      <br></br>

      <button className="quote-btn" onClick={() => navigate("/quote")}>
        Request a Quote
      </button>

      <h3>Specification</h3>
      <div className="spec-grid">
        <div>Product Size: {product.size}</div>
        <div>Customization Availability: {product.customization}</div>
        <div>Certification: {product.certification}</div>
        <div>Description: {product.description}</div>
      </div>
        <button 
        className="more-btn" 
      >
      More...
      </button>
    </div>
  );
};

export default ProductDetails;
