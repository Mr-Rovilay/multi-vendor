import { useState } from 'react';
import { useSelector } from 'react-redux';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Camera, Loader2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

import { backend_url } from "@/utils/server";
import { toast } from "sonner";
import { profileSchema } from '@/zod-schema/auth';
import AllOrders from '../products/AllOrders';
import AllRefundOrders from './AllRefundOrders';
import TrackOrder from './TrackOrder';
import ChangePassword from './ChangePassword';
import Address from './Address';
import PaymentMethods from './PaymentMethods';

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.profile?.contact || '',
      password: '',
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Implement your update logic here
      console.log('Profile Update Data:', data);
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render different sections based on active state
  const renderActiveContent = () => {
    switch(active) {
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6 space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer group">
                      <Avatar className="w-[150px] h-[150px] border-4 border-primary/50 group-hover:opacity-70 transition-opacity">
                        <AvatarImage 
                          src={avatarPreview || `${backend_url}${user.profile.avatar}`} 
                          alt="Profile avatar" 
                        />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <Camera className="w-8 h-8 text-stone-300" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {avatarPreview && (
                        <div className="flex justify-center">
                          <img 
                            src={avatarPreview} 
                            alt="Avatar Preview" 
                            className="max-w-[300px] max-h-[300px] object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              type="email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter 10-digit phone number" 
                              type="tel"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter new password" 
                              type="password"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
      case 2:
        return <AllOrders />;
      case 3:
        return <AllRefundOrders />;
      case 5:
        return <TrackOrder />;
      case 6:
        return <ChangePassword />;
      case 7:
        return <Address />;
        case 8:
          return <PaymentMethods />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderActiveContent()}
    </div>
  );
};

export default ProfileContent;