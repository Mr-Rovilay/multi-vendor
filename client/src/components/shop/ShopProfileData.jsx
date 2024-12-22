import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // ShadCN Tabs
import { Button } from "@/components/ui/button"; 
import { productData } from "@/static/data";
import Events from "../Events/Events";
import ProductCard from "../productCard/ProductCard";

const ShopProfileData = ({ isOwner }) => {
  const [allReviews, setAllReviews] = useState([]); // Example review state

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Shop Dashboard</h2>
        {isOwner && (
          <Link to="/dashboard">
            <Button variant="secondary" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </div>

      <Tabs defaultValue="products" className="mt-6">
        <TabsList className="flex">
          <TabsTrigger value="products">Shop Products</TabsTrigger>
          <TabsTrigger value="events">Running Events</TabsTrigger>
          <TabsTrigger value="reviews">Shop Reviews</TabsTrigger>
        </TabsList>

        {/* Shop Products Tab */}
        <TabsContent value="products" className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productData?.map((product, index) => (
            <ProductCard key={index} data={product} isShop />
          ))}
        </TabsContent>

        {/* Running Events Tab */}
        <TabsContent value="events" className="mt-4">
          {Events?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Events.map((event, index) => (
                <ProductCard key={index} data={event} isShop isEvent />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No events available for this shop!</p>
          )}
        </TabsContent>

        {/* Shop Reviews Tab */}
        <TabsContent value="reviews" className="mt-4">
          {allReviews?.length > 0 ? (
            allReviews.map((item, index) => (
              <div key={index} className="flex items-start gap-4 mb-4">
                <img
                  src={item.user?.avatar?.url}
                  alt="Reviewer Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium">{item.user?.name}</h4>
                    {/* <Ratings rating={item.rating} className="ml-2" /> */}
                  </div>
                  <p className="text-sm text-gray-600">{item.comment}</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews available for this shop!</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopProfileData;
