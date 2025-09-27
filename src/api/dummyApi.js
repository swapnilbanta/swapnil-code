// Dummy API simulation (can be replaced with real API later)
import shirt1 from "../assets/shirt1.jpg";
import shirt2 from "../assets/shirt2.jpg";
import shirt3 from "../assets/shirt3.jpg";
import shirt4 from "../assets/shirt4.jpg";
import  product1 from "../assets/product1.jpg";
import  product2 from "../assets/product2.jpg";
import  seller1 from "../assets/seller1.png";
import  seller2 from "../assets/seller2.png";
export const getProductDetails = () => {
  return Promise.resolve({
    name: "Button-Down Shirt",
    company: "Eco Bright PVT Ltd",
    supplier: "Rnaura Tech Pvt. Ltd.",
    verified: true,
    size: "12W",
    customization: "Domestic, International",
    certification: "BIS Approved",
    description: "Men's casual waif shortsheet with long sleeve fit design",
    images: [
      shirt1,
      shirt2,
    shirt3,
    shirt4
    ]
  });
};

export const getSimilarProducts = () => {
  return Promise.resolve([
    { id: 1, name: "Black Shirt", category: "Clothing", image: product1  },
    { id: 2, name: "Jeans", category: "Clothing", image: product2 },
    { id: 3, name: "Food", category: "Accessories", image: product2 },
     { id: 4, name: "Jeans", category: "Clothing", image: product2 },
        { id: 5, name: "Jeans", category: "Clothing", image: product2 },
                { id: 6, name: "Jeans", category: "Clothing", image: product2 },
  ]);
};

export const getSellers = () => {
  return Promise.resolve([
    { 
      id: 1, 
      name: "Tech Solutions Inc.", 
      type: "Manufacturer", 
      logo: seller1 
    },
    { 
      id: 2, 
      name: "Global Innovations Ltd.", 
      type: "Distributor", 
      logo:  seller2
    },
    { 
      id: 3, 
      name: "Apex Manufacturing Co.", 
      type: "Wholesaler", 
      logo:  seller1
    },
    { 
      id: 4, 
      name: "Strategic Supply Chain", 
      type: "Supplier", 
      logo:  seller2
    },
    { 
      id: 5, 
      name: "Pinnacle Products Group", 
      type: "Retailer", 
      logo: seller1
    }
  ]);
};
