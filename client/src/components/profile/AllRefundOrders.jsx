import { useState } from 'react';
import { RefreshCcw, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AllRefundOrders = () => {
  const [refundOrders] = useState([
    {
      id: 'RF001',
      orderNumber: 'ORD123',
      product: 'iPhone 14 Pro',
      amount: 1200,
      status: 'Pending',
      reason: 'Damaged Product',
      requestDate: '2024-02-15',
    },
    {
      id: 'RF002',
      orderNumber: 'ORD456',
      product: 'Samsung Galaxy S23',
      amount: 900,
      status: 'Approved',
      reason: 'Wrong Size',
      requestDate: '2024-02-20',
    },
  ]);

  const getStatusVariant = (status) => {
    switch (status) {
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
        {/* Table for Medium and Larger Screens */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-sm font-semibold text-left">Refund ID</th>
                <th className="p-3 text-sm font-semibold text-left">Order Number</th>
                <th className="p-3 text-sm font-semibold text-left">Product</th>
                <th className="p-3 text-sm font-semibold text-left">Refund Amount</th>
                <th className="p-3 text-sm font-semibold text-left">Status</th>
                <th className="p-3 text-sm font-semibold text-left">Request Date</th>
                <th className="p-3 text-sm font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refundOrders.map((refund) => (
                <tr key={refund.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{refund.id}</td>
                  <td className="p-3">{refund.orderNumber}</td>
                  <td className="p-3">{refund.product}</td>
                  <td className="flex items-center p-3">
                    <DollarSign className="w-4 h-4 mr-1" /> ${refund.amount}
                  </td>
                  <td className="p-3">
                    <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                  </td>
                  <td className="p-3">{refund.requestDate}</td>
                  <td className="p-3">
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
                          <div><strong>Refund ID:</strong> {refund.id}</div>
                          <div><strong>Order Number:</strong> {refund.orderNumber}</div>
                          <div><strong>Product:</strong> {refund.product}</div>
                          <div><strong>Refund Amount:</strong> ${refund.amount}</div>
                          <div><strong>Reason:</strong> {refund.reason}</div>
                          <div>
                            <strong>Status:</strong> 
                            <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly List */}
        <div className="block md:hidden">
          {refundOrders.map((refund) => (
            <div key={refund.id} className="p-4 mb-4 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <strong>Refund ID:</strong>
                <span>{refund.id}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Order Number:</strong>
                <span>{refund.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Product:</strong>
                <span>{refund.product}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Refund Amount:</strong>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" /> ${refund.amount}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Status:</strong>
                <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Request Date:</strong>
                <span>{refund.requestDate}</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refund Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div><strong>Refund ID:</strong> {refund.id}</div>
                    <div><strong>Order Number:</strong> {refund.orderNumber}</div>
                    <div><strong>Product:</strong> {refund.product}</div>
                    <div><strong>Refund Amount:</strong> ${refund.amount}</div>
                    <div><strong>Reason:</strong> {refund.reason}</div>
                    <div>
                      <strong>Status:</strong> 
                      <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllRefundOrders;
