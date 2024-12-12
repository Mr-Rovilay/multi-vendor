import Footer from "@/components/footer/Footer";
import Header from "@/components/layout/Header";
import ProductDetails from "@/components/products/ProductDetails";
import SuggestedProduct from "@/components/products/SuggestedProduct";
import { productData } from "@/static/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { name } = useParams(); // Destructure `name` from the route parameters
  const [data, setData] = useState(null);

  // Ensure `name` is properly accessed and manipulated
  const productName = name ? name.replace(/-/g, " ") : "";

  useEffect(() => {
    if (productName) {
      const data = productData.find((item) => item.name === productName);
      setData(data);
    }
  }, [productName]); // Add `productName` as a dependency to ensure the effect runs when it changes

  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {
        data && <SuggestedProduct data={data}/>
      }
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
