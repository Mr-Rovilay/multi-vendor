import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  ClipboardList, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

import { 
  Card, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const getStatusVariant = (status) => {
  switch(status.toLowerCase()) {
    case 'processing':
      return 'secondary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status) => {
  switch(status.toLowerCase()) {
    case 'processing':
      return <Package className="w-4 h-4 mr-2" />;
    case 'delivered':
      return <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 mr-2 text-red-500" />;
    default:
      return null;
  }
};

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  // Mock orders data - replace with actual data fetching
  const orders = [
    {
      _id: "23455654gg56555455",
      orderItems: [
        { name: "Iphone 11 pro max" },
        { name: "Apple Airpods" }
      ],
      totalPrice: 4434,
      orderStatus: "Processing",
      orderDate: "2024-02-15"
    },
    {
      _id: "34566789hj45678",
      orderItems: [
        { name: "Samsung Galaxy S21" }
      ],
      totalPrice: 3299,
      orderStatus: "Delivered",
      orderDate: "2024-01-20"
    },
    {
      _id: "45677890kl56789",
      orderItems: [
        { name: "Sony Noise Cancelling Headphones" },
        { name: "Portable Charger" }
      ],
      totalPrice: 5600,
      orderStatus: "Cancelled",
      orderDate: "2024-03-05"
    }
  ];

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Mobile view using Accordion
  const MobileOrderView = () => (
    <Accordion type="single" collapsible className="w-full md:hidden">
      {currentOrders.map((order) => (
        <AccordionItem key={order._id} value={`item-${order._id}`}>
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span>Order #{order._id.slice(-8)}</span>
              <Badge variant={getStatusVariant(order.orderStatus)}>
                {order.orderStatus}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-2">
              <div>
                <span className="font-medium">Items:</span>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="font-medium">Total:</span>
                  <p className="text-sm">${order.totalPrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p className="text-sm">{order.orderDate}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Link to={`/order/${order._id}`}>
                  <Button variant="outline" size="sm">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle>
            <div className="flex items-center">
              <ClipboardList className="w-6 h-6 mr-2" />
              My Orders
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Orders per page:</span>
            <Select 
              value={ordersPerPage.toString()} 
              onValueChange={(value) => setOrdersPerPage(Number(value))}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
     
        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    #{order._id.slice(-8)}
                  </TableCell>
                  <TableCell>
                    {order.orderItems.map((item, index) => (
                      <div key={index}>{item.name}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    ${order.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.orderStatus)}>
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="outline" size="icon">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Accordion View */}
        <MobileOrderView />

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between mt-4 space-y-2 md:flex-row md:space-y-0">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
     
    </Card>
  );
};

export default AllOrders;