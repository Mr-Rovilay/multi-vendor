/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User,  
  X, 
  Store, 
  Menu, 
  X as Close 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { categoriesData, productData } from "../../static/data";
import { cn } from "@/lib/utils";
import Dropdown from "./Dropdown";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchData(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className=" max-pad-container sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold sm:text-2xl text-primary">
            MultiVendor
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden w-1/2 md:block">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Search products, sellers, categories..." 
                className="flex-grow"
                value={searchTerm}
                onChange={handleSearchChange}            
              />
              {searchTerm ? (
                <X
                  className="absolute w-4 h-4 text-gray-500 cursor-pointer right-3"
                  onClick={clearSearch}
                />
              ) : (
                <Search className="absolute w-4 h-4 text-gray-500 right-3" />
              )}
            </div>
            
            {searchData && searchData.length !== 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {searchData.map((product, index) => (
                  <Link 
                    key={index} 
                    to={`/product/${product.name.replace(/\s+/g, "-")}`}
                    className="block hover:bg-gray-100"
                  >
                    <div className="flex items-center p-2">
                      <img 
                        src={product.image_Url[0].url} 
                        alt={product.name} 
                        className="object-cover w-10 h-10 mr-3"
                      />
                      <span>{product.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Search Toggle - Visible on mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => {}}>
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Become Seller & Icons - Adjust for responsiveness */}
          <div className="items-center hidden space-x-4 md:flex">
            <Button asChild variant="outline" size="lg" className="hidden lg:flex">
              <Link to="/sell" className="flex items-center">
                <Store className="mr-2" /> Become a Seller
              </Link>
            </Button>

            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                <Badge className="absolute bg-green-500 -top-2 -right-2" variant="">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute bg-green-500 -top-2 -right-2" variant="">
                  5
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav
          className={cn(
            "transition-all duration-300 py-3",
            active && "fixed top-0 left-0 right-0 z-50 bg-white shadow-lg max-pad-container"
          )}
        >
          {/* Desktop Navigation */}
          <div className="items-center justify-between mx-auto md:flex">
            {/* Categories Dropdown */}
            <div className="mb-3 md:mb-0">

            <DropdownMenu className="">
              <Dropdown categoriesData={categoriesData} setDropDown={setDropDown} />
            </DropdownMenu>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link to="/" className={cn("hover:text-green-500", isLinkActive('/') && "text-green-500 font-semibold")}>Home</Link>
              <Link to="/best-selling" className={cn("hover:text-green-500", isLinkActive('/best-selling') && "text-green-500 font-semibold")}>Best Selling</Link>
              <Link to="/products" className={cn("hover:text-green-500", isLinkActive('/products') && "text-green-500 font-semibold")}>Products</Link>
              <Link to="/events" className={cn("hover:text-green-500", isLinkActive('/events') && "text-green-500 font-semibold")}>Events</Link>
              <Link to="/faq" className={cn("hover:text-green-500", isLinkActive('/faq') && "text-green-500 font-semibold")}>FAQ</Link>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-white md:hidden">
              <div className="p-4">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Search products..." 
                    className="w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}            
                  />
                  {searchTerm ? (
                    <X
                      className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 cursor-pointer right-3 top-1/2"
                      onClick={clearSearch}
                    />
                  ) : (
                    <Search className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 right-3 top-1/2" />
                  )}
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  <Link 
                    to="/" 
                    className={cn(
                      "block py-2 text-lg", 
                      isLinkActive('/') && "text-green-500 font-semibold"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/best-selling" 
                    className={cn(
                      "block py-2 text-lg", 
                      isLinkActive('/best-selling') && "text-green-500 font-semibold"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    Best Selling
                  </Link>
                  <Link 
                    to="/products" 
                    className={cn(
                      "block py-2 text-lg", 
                      isLinkActive('/products') && "text-green-500 font-semibold"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    Products
                  </Link>
                  <Link 
                    to="/events" 
                    className={cn(
                      "block py-2 text-lg", 
                      isLinkActive('/events') && "text-green-500 font-semibold"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    Events
                  </Link>
                  <Link 
                    to="/faq" 
                    className={cn(
                      "block py-2 text-lg", 
                      isLinkActive('/faq') && "text-green-500 font-semibold"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    FAQ
                  </Link>
                </div>

                {/* Mobile Additional Actions */}
                <div className="mt-6 space-y-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full"
                  >
                    <Link to="/sell" className="flex items-center justify-center">
                      <Store className="mr-2" /> Become a Seller
                    </Link>
                  </Button>

                  <div className="flex justify-between">
                    <Button variant="ghost" size="icon" className="relative">
                      <Heart className="w-5 h-5" />
                      <Badge className="absolute bg-green-500 -top-2 -right-2" variant="">
                        3
                      </Badge>
                    </Button>
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      <Badge className="absolute bg-green-500 -top-2 -right-2" variant="">
                        5
                      </Badge>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;