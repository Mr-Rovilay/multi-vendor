import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../productCard/ProductCard";
import { CardTitle} from "@/components/ui/card";


const SuggestedProduct = ({ data }) => {
  const [products,setProducts] = useState(null);

  useEffect(() => {
    const d = productData && productData.filter((i) => i.category === data.category);
    setProducts(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className="max-pad-container">
           <CardTitle className="mb-5 text-3xl font-bold text-center">Related Product</CardTitle>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
                products && products.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;