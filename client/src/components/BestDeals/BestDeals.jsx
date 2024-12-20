import { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import { productData } from "@/static/data";
import { CardHeader, CardTitle } from "@/components/ui/card";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const first_five = d.slice(0, 5);
    setData(first_five);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-pad-container">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Best Deals
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
