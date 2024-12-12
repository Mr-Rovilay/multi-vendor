import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
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

const CartSidebar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "https://hips.hearstapps.com/hmg-prod/images/copycat-hamburger-helper1-1659463591.jpg?crop=0.668xw:1.00xh;0.176xw,0&resize=640:*"
    },
    {
      id: 2,
      name: "Denim Jeans",
      price: 79.99,
      quantity: 1,
      image: "https://hips.hearstapps.com/hmg-prod/images/copycat-hamburger-helper1-1659463591.jpg?crop=0.668xw:1.00xh;0.176xw,0&resize=640:*"
    }
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <>
      {/* Cart Icon Trigger */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setOpenCart(true)}
      >
        <ShoppingCart className="w-5 h-5" />
        <Badge
          className="absolute bg-green-500 -top-2 -right-2"
          variant="secondary"
        >
          {cartItems.length}
        </Badge>
      </Button>

      {/* Animated Overlay and Sliding Cart Sidebar */}
      <AnimatePresence>
        {openCart && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenCart(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full bg-white shadow-xl w-96"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpenCart(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty</p>
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
                      {cartItems.map((item) => (
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
                                ${item.price} x {item.quantity}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="space-x-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decrementQuantity(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => incrementQuantity(item.id)}
                              >
                                <Plus className="w-4 h-4" />
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

              {/* Cart Summary and Checkout */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">${calculateTotal()}</span>
                </div>
                <Button className="w-full" disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;