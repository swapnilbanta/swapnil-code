import React, { useEffect, useState } from "react";
import { getProductDetails, getSimilarProducts, getSellers } from "../api/dummyApi";
import ProductGallery from "./ ProductGallery";
import ProductDetails from "./ProductDetails";
import SimilarProducts from "./SimilarProducts";
import SellerCards from "./SellerCards";
import Header from "./Header";
// import Breadcrumb from "./Breadcrumb";


const ProductOverview = () => {
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getProductDetails().then(setProduct);
    getSimilarProducts().then(setSimilar);
    getSellers().then(setSellers);
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <>
    <Header/>
    <div className="container">
      <div className="product-header">


        {/* <Breadcrumb/> */}
        <ProductGallery images={product.images} />
        <ProductDetails product={product} />
      </div>

   <SimilarProducts items={similar} />
      <SellerCards sellers={sellers} />

    </div>
    </>
  );
};

export default ProductOverview;
