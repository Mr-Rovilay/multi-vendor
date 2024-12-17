import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

const Address = () => {
  const [open, setOpen] = useState(false);

  // Static user address data
  const addresses = [
    {
      id: 1,
      type: "Home",
      address1: "123 Main Street",
      address2: "Apartment 4B",
      phoneNumber: "+234 801 234 5678",
    },
    {
      id: 2,
      type: "Office",
      address1: "456 Tech Lane",
      address2: "Suite 12",
      phoneNumber: "+234 909 876 5432",
    },
  ];

  const addressTypes = ["Default", "Home", "Office"];

  return (
    <Card className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Addresses</h1>
        <Button onClick={() => setOpen(true)}>Add New</Button>
      </div>
      <div className="mt-6 space-y-4">
        {addresses.map((item) => (
          <Card key={item.id} className="flex justify-between items-center p-4">
            <div>
              <h4 className="font-semibold">{item.type}</h4>
              <p>{item.address1}, {item.address2}</p>
              <p className="text-gray-500 text-sm">{item.phoneNumber}</p>
            </div>
            <Trash2 className="cursor-pointer text-red-500" />
          </Card>
        ))}

        {addresses.length === 0 && (
          <p className="text-center text-gray-500">You do not have any saved addresses!</p>
        )}
      </div>

      {/* Add New Address Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Country</label>
              <Select>
                <SelectTrigger className="w-full">
                  <span>Choose your country</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1">City</label>
              <Select>
                <SelectTrigger className="w-full">
                  <span>Choose your city</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Accra">Accra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1">Address 1</label>
              <Input placeholder="123 Main Street" />
            </div>

            <div>
              <label className="block mb-1">Address 2</label>
              <Input placeholder="Apartment 4B" />
            </div>

            <div>
              <label className="block mb-1">Zip Code</label>
              <Input placeholder="100001" type="number" />
            </div>

            <div>
              <label className="block mb-1">Address Type</label>
              <Select>
                <SelectTrigger className="w-full">
                  <span>Choose Address Type</span>
                </SelectTrigger>
                <SelectContent>
                  {addressTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Save Address
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Address;
