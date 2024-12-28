import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Store, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import { toast } from "sonner";
import { addToCart } from "@/redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const EventCard = ({
  data,
  name = "No Name",
  description = "No description available.",
  category = "Uncategorized",
  startDate,
  endDate,
  status,
  tags = "",
  originalPrice,
  discountPrice,
  stock,
  images = [],
  shop = {},
}) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  const formattedStartDate = format(new Date(startDate), "MMMM dd, yyyy");
  const formattedEndDate = format(new Date(endDate), "MMMM dd, yyyy");

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <Card className="relative w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 group hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {images?.[0]?.url ? (
          <img
            src={images[0].url}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
        )}
        {discount > 0 && <Badge className="absolute bg-red-500 right-2 top-2">{discount}% OFF</Badge>}
        <Badge variant="secondary" className="absolute left-2 top-2">
          {category}
        </Badge>
      </div>

      <CardHeader className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold line-clamp-2">{name}</h3>
          {status && <Badge variant="outline">{status}</Badge>}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">${discountPrice}</span>
              {originalPrice > discountPrice && (
                <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
            <p className="text-sm text-gray-600">Stock: {stock}</p>
          </div>
          <CountDown data={data}/>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Starts: {formattedStartDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Ends: {formattedEndDate}</span>
          </div>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-1">
            {tags.split(",").map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        )}

        {shop?.name && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Store className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{shop.name}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2 p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/product-details">
            <Eye className="w-4 h-4 mr-2" /> Details
          </Link>
        </Button>
        <Button className="w-full" onClick={() => addToCartHandler(data)}>
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
