import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const productName = data.name.replace(/\s+/g, "-");

  const renderStars = () => {
    return Array(5).fill().map((_, index) => (
      <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
    ));
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        <div className="relative">
          <Link to={`/product/${productName}`}>
            <img
              src={data.image_Url[0]?.url}
              alt={data.name}
              className="object-cover w-full h-48 rounded-md"
            />
          </Link>
          <div className="absolute flex flex-col space-y-2 top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="mt-4">
          <Link to={`/`} className="text-sm text-muted-foreground hover:underline">
            {data.shop.name}
          </Link>
          <Link to={`/product/${productName}`} className="block mt-1">
            <h3 className="text-lg font-semibold leading-tight">
              {data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name}
            </h3>
          </Link>
          <div className="flex items-center mt-2">
            {renderStars()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div>
          <span className="text-lg font-bold">
            ${data.price === 0 ? data.price : data.discount_price}
          </span>
          {data.originalPrice && (
            <span className="ml-2 text-sm line-through text-muted-foreground">
              ${data.originalPrice}
            </span>
          )}
        </div>
        <Badge variant="secondary">{data?.sold_out} sold</Badge>
      </CardFooter>
      {isDetailsOpen && <ProductDetailsCard setOpen={setIsDetailsOpen} data={data} />}
    </Card>
  );
};

export default ProductCard;

