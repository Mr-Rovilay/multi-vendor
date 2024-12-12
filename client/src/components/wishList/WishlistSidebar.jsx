import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const WishlistSidebar = ({ onAddToCart }) => {
  const [openWishlist, setOpenWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/path/to/tshirt-image.jpg"
    },
    {
      id: 2,
      name: "Denim Jeans",
      price: 79.99,
      image: "/path/to/jeans-image.jpg"
    }
  ]);

  const calculateTotal = () => {
    return wishlistItems
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  };

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    onAddToCart(item); // Pass item to parent for cart functionality
    removeItem(item.id); // Optionally remove the item from the wishlist after adding to cart
  };

  return (
    <>
      {/* Wishlist Icon Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setOpenWishlist(true)}
      >
        <Heart className="w-5 h-5" />
        <Badge
          className="absolute bg-green-500 -top-2 -right-2"
          variant="secondary"
        >
          {wishlistItems.length}
        </Badge>
      </Button>

      {/* Animated Overlay and Sliding Wishlist Sidebar */}
      <AnimatePresence>
        {openWishlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenWishlist(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full bg-white shadow-xl w-96"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Wishlist Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Wishlist</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenWishlist(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Wishlist Items */}
              <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                {wishlistItems.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your wishlist is empty
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wishlistItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-16 h-16 rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium line-clamp-1">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                ${item.price}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="space-x-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleAddToCart(item)}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Wishlist Summary */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total Value:</span>
                  <span className="font-bold">${calculateTotal()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WishlistSidebar;