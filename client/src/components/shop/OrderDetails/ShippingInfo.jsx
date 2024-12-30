import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

export const ShippingInfo = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold">
          <MapPin className="w-4 h-4 mr-2" /> Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data?.shippingAddress.address1} </p>
        <p>{data?.shippingAddress.address2}</p>
        <p>{data?.shippingAddress.country}</p>
        <p>{data?.shippingAddress.city}</p>
        <p>{data?.user?.phoneNumber}</p>
      </CardContent>
    </Card>
  );
};

