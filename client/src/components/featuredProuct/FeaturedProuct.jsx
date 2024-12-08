import { productData } from "@/static/data";
import ProductCard from "../ProductCard/ProductCard";
import { CardHeader, CardTitle } from "@/components/ui/card";

const FeaturedProduct = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-pad-container">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Featured Products
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            <>
              {productData &&
                productData.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
