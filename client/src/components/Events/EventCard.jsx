import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const EventCard = ({ 
  title, 
  description, 
  originalPrice, 
  currentPrice, 
  soldCount, 
  imageUrl 
}) => {
  const addToCartHandler = () => {
    // Implement add to cart logic
    console.log(`Adding ${title} to cart`);
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-48"
        />
        <Badge variant="destructive" className="absolute top-4 right-4">
          Sale
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="mb-4 text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="mr-2 line-through text-destructive">
              ${originalPrice}
            </span>
            <span className="font-bold">
              ${currentPrice}
            </span>
          </div>
          <Badge variant="outline">
            {soldCount} Sold
          </Badge>
        </div>
        
        <CountDown />
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/product-details">
            <Eye className="mr-2" /> See Details
          </Link>
        </Button>
        
        <Button onClick={addToCartHandler}>
          <ShoppingCart className="mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;