import { useState } from 'react';
import { 
  RefreshCcw, 
  DollarSign, 
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const AllRefundOrders = () => {
  const [refundOrders, setRefundOrders] = useState([
    {
      id: 'RF001',
      orderNumber: 'ORD123',
      product: 'iPhone 14 Pro',
      amount: 1200,
      status: 'Pending',
      reason: 'Damaged Product',
      requestDate: '2024-02-15'
    },
    {
      id: 'RF002',
      orderNumber: 'ORD456',
      product: 'Samsung Galaxy S23',
      amount: 900,
      status: 'Approved',
      reason: 'Wrong Size',
      requestDate: '2024-02-20'
    }
  ]);

  const getStatusVariant = (status) => {
    switch(status) {
      case 'Pending': return 'secondary';
      case 'Approved': return 'success';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCcw className="w-6 h-6 mr-2" />
          Refund Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Refund ID</TableHead>
              <TableHead>Order Number</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Refund Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refundOrders.map((refund) => (
              <TableRow key={refund.id}>
                <TableCell>{refund.id}</TableCell>
                <TableCell>{refund.orderNumber}</TableCell>
                <TableCell>{refund.product}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {refund.amount}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(refund.status)}>
                    {refund.status}
                  </Badge>
                </TableCell>
                <TableCell>{refund.requestDate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Refund Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <strong>Refund ID:</strong> {refund.id}
                        </div>
                        <div>
                          <strong>Order Number:</strong> {refund.orderNumber}
                        </div>
                        <div>
                          <strong>Product:</strong> {refund.product}
                        </div>
                        <div>
                          <strong>Refund Amount:</strong> ${refund.amount}
                        </div>
                        <div>
                          <strong>Reason:</strong> {refund.reason}
                        </div>
                        <div>
                          <strong>Status:</strong> 
                          <Badge variant={getStatusVariant(refund.status)}>
                            {refund.status}
                          </Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AllRefundOrders;