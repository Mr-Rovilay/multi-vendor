import { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const mockTrackingData = {
    '123456': {
      orderNumber: '123456',
      status: 'In Transit',
      estimatedDelivery: '2024-03-20',
      items: [
        { name: 'iPhone 15 Pro', quantity: 1 },
        { name: 'Apple AirPods Pro', quantity: 1 }
      ],
      trackingSteps: [
        { 
          status: 'Order Placed', 
          date: '2024-03-10', 
          completed: true 
        },
        { 
          status: 'Processed', 
          date: '2024-03-12', 
          completed: true 
        },
        { 
          status: 'Shipped', 
          date: '2024-03-15', 
          completed: true 
        },
        { 
          status: 'In Transit', 
          date: '2024-03-16', 
          completed: true 
        },
        { 
          status: 'Out for Delivery', 
          date: '2024-03-20', 
          completed: false 
        },
        { 
          status: 'Delivered', 
          date: '', 
          completed: false 
        }
      ]
    }
  };

  const handleTrackOrder = () => {
    const orderInfo = mockTrackingData[trackingNumber];
    setOrderDetails(orderInfo);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Order Placed': return <Package className="w-4 h-4 mr-2" />;
      case 'Processed': return <Clock className="w-4 h-4 mr-2" />;
      case 'Shipped': return <Truck className="w-4 h-4 mr-2" />;
      case 'In Transit': return <MapPin className="w-4 h-4 mr-2" />;
      case 'Out for Delivery': return <Truck className="w-4 h-4 mr-2" />;
      case 'Delivered': return <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4 space-x-2">
          <Input 
            placeholder="Enter Tracking Number" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <Button onClick={handleTrackOrder}>Track</Button>
        </div>

        {orderDetails && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Order #{orderDetails.orderNumber}</h3>
              <Badge variant="outline">
                {orderDetails.status}
              </Badge>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-md">Items</h4>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>Quantity: {item.quantity}</span>
                </div>
              ))}
            </div>

            <Progress value={orderDetails.trackingSteps.filter(step => step.completed).length / orderDetails.trackingSteps.length * 100} />

            <Accordion type="single" collapsible>
              <AccordionItem value="tracking-details">
                <AccordionTrigger>Tracking Details</AccordionTrigger>
                <AccordionContent>
                  {orderDetails.trackingSteps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center mb-2 ${step.completed ? 'text-green-600' : 'text-gray-400'}`}
                    >
                      {getStatusIcon(step.status)}
                      <div>
                        <span className="font-medium">{step.status}</span>
                        {step.date && <span className="ml-2 text-sm">{step.date}</span>}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackOrder;