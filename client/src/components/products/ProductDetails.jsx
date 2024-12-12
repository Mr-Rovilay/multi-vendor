import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ShoppingCart, MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const toggleWishlistHandler = () => {
    setClick(!click);
    toast.success(click ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=e4tw3rfwe35t532");
  };

  const addToCartHandler = () => {
    toast.success(`Added ${count} item(s) to cart`);
  };

  if (!data) return <div className="py-10 text-center">Loading product details...</div>;

  return (
    <div className="px-4 py-8 max-pad-container md:max-w-6xl md:mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="relative">
                <img 
                  src={data.image_Url[selectedImage].url} 
                  alt={data.name} 
                  className="object-cover w-full rounded-lg h-96"
                />
                {data.image_Url.length > 1 && (
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="mr-2"
                      onClick={() => setSelectedImage(prev => 
                        prev > 0 ? prev - 1 : data.image_Url.length - 1
                      )}
                    >
                      <ChevronLeft />
                    </Button>
                  </div>
                )}
                {data.image_Url.length > 1 && (
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setSelectedImage(prev => 
                        prev < data.image_Url.length - 1 ? prev + 1 : 0
                      )}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Thumbnail Gallery */}
          <div className="flex justify-center space-x-2">
            {data.image_Url.map((image, index) => (
              <img 
                key={index}
                src={image.url} 
                alt={`Thumbnail ${index + 1}`}
                className={cn(
                  "w-16 h-16 object-cover rounded-md cursor-pointer border-2",
                  selectedImage === index 
                    ? "border-primary" 
                    : "border-transparent opacity-50 hover:opacity-100"
                )}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="mb-4 text-3xl font-bold">{data.name}</h1>
          
          <div className="flex items-center mb-4">
            <Badge variant="outline" className="mr-2">
              {data.shop.name}
            </Badge>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(data.shop.ratings) 
                      ? "text-yellow-500 fill-yellow-500" 
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({data.shop.ratings} ratings)
              </span>
            </div>
          </div>

          <p className="mb-4 text-gray-600">{data.description}</p>

          <div className="flex items-center mb-4 space-x-4">
            <span className="text-3xl font-bold text-primary">
              ${data.discount_price}
            </span>
            {data.price && (
              <span className="text-xl text-gray-400 line-through">
                ${data.price}
              </span>
            )}
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decrementCount}
              >
                -
              </Button>
              <span className="px-4 py-2 border rounded">{count}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={incrementCount}
              >
                +
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleWishlistHandler}
            >
              <Heart
                className={cn(
                  "h-6 w-6",
                  click 
                    ? "text-red-500 fill-red-500" 
                    : "text-gray-500 hover:text-red-500"
                )}
              />
            </Button>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full" 
              onClick={addToCartHandler}
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> 
              Add to Cart
            </Button>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={data.shop.shop_avatar.url} />
                    <AvatarFallback>
                      {data.shop.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{data.shop.name}</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleMessageSubmit}
                      className="mt-2"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="seller">Seller Information</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <p className="leading-relaxed text-gray-600">
                {data.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No reviews yet for this product.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seller">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4 space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={data.shop.shop_avatar.url} />
                  <AvatarFallback>{data.shop.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{data.shop.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(data.shop.ratings) 
                            ? "text-yellow-500 fill-yellow-500" 
                            : "text-gray-300"
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({data.shop.ratings} ratings)
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Joined:</strong> 12/12/2024
                    </p>
                    <p>
                      <strong>Total Products:</strong> 1234
                    </p>
                    <p>
                      <strong>Total Reviews:</strong> 645
                    </p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <Button>Visit Shop</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetails;