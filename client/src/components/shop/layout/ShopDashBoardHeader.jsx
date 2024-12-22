/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Gift,
  Tag,
  ShoppingBag,
  Package,
  MessageSquare,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { icon: Gift, label: "Coupons", path: "/dashboard/cupouns" },
  { icon: Tag, label: "Events", path: "/dashboard-events" },
  { icon: ShoppingBag, label: "Products", path: "/dashboard-products" },
  { icon: Package, label: "Orders", path: "/dashboard-orders" },
  { icon: MessageSquare, label: "Messages", path: "/dashboard-messages" },
];

const NavLink = ({ icon: Icon, label, path }) => (
  <Link to={path}>
    <Button variant="ghost" className="justify-start w-full gap-2">
      <Icon className="w-4 h-4" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  </Link>
);

export default function ShopDashBoardHeader() {
  const { seller } = useSelector((state) => state.seller);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 max-pad-container">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-2 pt-4">
                {navItems.map((item) => (
                  <NavLink key={item.path} {...item} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
          

          <Link to="/dashboard" className="text-xl font-bold sm:text-2xl text-primary">
            MultiVendor
          </Link>
       
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path}>
                  <Button variant="ghost" size="icon">
                    <item.icon className="w-5 h-5" />
                  </Button>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-10 h-10 rounded-full">
              <Avatar className="w-10 h-10">
                <AvatarImage src={seller.avatar?.url} alt={seller.name} className="object-cover"/>
                <AvatarFallback>{seller.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="cursor-pointer">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to={`/shop/${seller._id}`}>View Shop</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}