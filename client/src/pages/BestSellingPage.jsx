import { useEffect, useState } from "react";
import { productData } from "@/static/data";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/footer/Footer";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/productCard/ProductCard";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and sorting
    const timer = setTimeout(() => {
      // Ensure we have productData and sort by total_sell
      const sortedData = productData 
        ? [...productData].sort((a, b) => b.total_sell - a.total_sell)
        : [];
      
      setData(sortedData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const renderProductGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No best-selling products found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((product, index) => (
          <div key={product.id || index} className="relative">
            <ProductCard data={product} />
            {index < 5 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2"
              >
                Top {index + 1}
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Card>
          <CardHeader className="max-pad-container">
            <CardTitle className="text-3xl font-bold">
              Best Selling Products
            </CardTitle>
            <p className="text-muted-foreground">
              Discover our most popular items
            </p>
          </CardHeader>
          <CardContent className="max-pad-container">
            {renderProductGrid()}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default BestSellingPage;