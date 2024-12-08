/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import {  Heart, ShoppingCart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1)
  const [click, setClick] = useState(false)

  // Placeholder for Redux dispatches and cart/wishlist state
  const dispatch = null // Replace with actual Redux dispatch
  const cart = [] // Replace with actual cart state
  const wishlist = [] // Replace with actual wishlist state

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        // Uncomment and replace with actual Redux action
        // dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const toggleWishlistHandler = () => {
    setClick(!click);
    if (click) {
      // Uncomment and replace with actual Redux action
      // dispatch(removeFromWishlist(data));
      toast.success("Removed from wishlist");
    } else {
      // Uncomment and replace with actual Redux action
      // dispatch(addToWishlist(data));
      toast.success("Added to wishlist");
    }
  };

  const handleMessageSubmit = () => {
    // Implement message submission logic
    toast.info("Message feature coming soon");
  };

  return (
    <Dialog open={true} onOpenChange={() => setOpen(false)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid gap-6 p-4 md:grid-cols-2">
          {/* Left Column - Product Image and Shop Info */}
          <div className="space-y-4">
            <img 
              src={data.image_Url[0].url} 
              alt={data.name} 
              className="object-cover w-full rounded-lg h-96"
            />
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={data.shop.shop_avatar.url} alt={data.shop.name} />
                <AvatarFallback>{data.shop.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{data.shop.name}</h3>
                <p className="text-sm text-muted-foreground">({data.shop.ratings}) Ratings</p>
              </div>
            </div>

            <Button 
              variant="default" 
              className="w-full"
              onClick={handleMessageSubmit}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Send Message
            </Button>

            <p className="text-destructive">(50) Sold out</p>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-muted-foreground">{data.description}</p>

            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-primary">
                ${data.discount_price}
              </span>
              {data.price && (
                <span className="text-lg text-red-500 line-through">
                  ${data.price}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
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
                  className={`h-6 w-6 ${click ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} 
                />
              </Button>
            </div>

            <Button 
              className="w-full" 
              onClick={() => addToCartHandler(data._id)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsCard