import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { productData } from "@/static/data";
import { 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Footer from "@/components/footer/Footer";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/productCard/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      try {
        if (categoryData === null) {
          const d = productData.sort((a, b) => b.total_sell - a.total_sell);
          setData(d);
        } else {
          const d = productData.filter((item) => 
            item.category.toString() === categoryData
          );
          setData(d);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [categoryData]);

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
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>No Products Found</AlertTitle>
          <AlertDescription>
            There are no products available in this category.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((i, index) => (
          <ProductCard 
            key={index} 
            data={i} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main >
          <CardHeader className="max-pad-container">
            <Breadcrumb>
              <BreadcrumbList >
                <BreadcrumbItem >
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {categoryData ? `${categoryData} Products` : 'All Products'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle className="mt-4 text-3xl font-bold">
              {categoryData ? `${categoryData} Products` : 'All Products'}
            </CardTitle>
          </CardHeader>
          <CardContent className="max-pad-container">
            {renderProductGrid()}
          </CardContent>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;