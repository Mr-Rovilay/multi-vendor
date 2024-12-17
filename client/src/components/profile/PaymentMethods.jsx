import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  CheckCircle 
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'CC1',
      type: 'Visa',
      lastFour: '4532',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 'CC2',
      type: 'Mastercard',
      lastFour: '7890',
      expiryDate: '06/26',
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleAddCard = () => {
    const cardDetails = {
      id: `CC${paymentMethods.length + 1}`,
      type: newCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      lastFour: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      isDefault: false
    };

    setPaymentMethods([...paymentMethods, cardDetails]);
    // Reset form
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const handleDeleteCard = (id) => {
    setPaymentMethods(paymentMethods.filter(card => card.id !== id));
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <CreditCard className="w-6 h-6 mr-2" />
            Payment Methods
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Card Number</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Card Holder</Label>
                    <Input 
                      placeholder="John Doe"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({...newCard, cardHolder: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Expiry Date</Label>
                    <Input 
                      placeholder="MM/YY"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input 
                    placeholder="123"
                    type="password"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddCard} className="w-full">
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {paymentMethods.map((card) => (
          <div 
            key={card.id} 
            className="flex items-center justify-between p-4 transition-colors border-b last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-medium">
                  {card.type} **** {card.lastFour}
                </div>
                <div className="text-sm text-gray-500">
                  Expires {card.expiryDate}
                </div>
              </div>
              {card.isDefault && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Default
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!card.isDefault && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSetDefault(card.id)}
                >
                  Set as Default
                </Button>
              )}
              {!card.isDefault && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;