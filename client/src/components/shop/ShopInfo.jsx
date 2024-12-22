import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, MapPin, Phone, Package, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start p-3 space-x-3">
    <Icon className="w-4 h-4 mt-1 text-muted-foreground" />
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="p-4 space-y-4">
    <div className="flex flex-col items-center space-y-3">
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-full h-16" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-3">
        <Skeleton className="w-4 h-4" />
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
    ))}
  </div>
);

export default function ShopInfo({ isOwner }) {
  const [isLoading, setIsLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={seller.avatar?.url} alt={seller.name} className="object-cover" />
                  <AvatarFallback>{seller.name?.[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Shop Avatar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardTitle className="mt-4">{seller.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {seller.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <InfoItem
          icon={MapPin}
          label="Address"
          value={seller.address}
        />
        <InfoItem
          icon={Phone}
          label="Phone Number"
          value={seller.phoneNumber}
        />
        {/* <InfoItem
          icon={Package}
          label="Total Products"
          value={products?.length || 0}
        /> */}
        <InfoItem
          icon={Star}
          label="Shop Ratings"
          value="4/5"
        //   value={`${averageRating}/5`}
        />
        <InfoItem
          icon={Calendar}
          label="Joined On"
          value={seller?.createdAt?.slice(0, 10)}
        />

        {isOwner && (
          <div className="pt-4">
            <Link to="/settings">
              <Button className="w-full">
                Edit Shop
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </>
  );
}