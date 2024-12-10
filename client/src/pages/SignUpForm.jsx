import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Phone, Eye, EyeOff, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signupSchema } from "../zod-schema/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "@/redux/actions/authActions";

export default function Signup() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "customer",
      contact: "",
      avatar: null,
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
    form.setValue("avatar", e.target.files);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("contact", data.contact);
      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }
  
      // Wait for the signup action to complete
      const result = await dispatch(signup(formData)); 
  
      // Check if the action was successful
      if (result?.type === "SignupSuccess") {
        toast.success("Signup successful! Please log in.");
        navigate("");
      } else {
        throw new Error(result?.payload || "Signup failed!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup failed!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Sign up to start your marketplace journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                          size={20}
                        />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your full name"
                          className="pl-10"
                        />
                      </div>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                          size={20}
                        />
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                        />
                      </div>
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
                      <div className="relative">
                        <Lock
                          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                          size={20}
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          autoComplete="current-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 h-full px-3"
                          onClick={togglePasswordVisibility}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone
                          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                          size={20}
                        />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Your contact number"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Upload
                          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                          size={20}
                        />
                        <Input
                          type="file"
                          onChange={(e) => {
                            handleAvatarChange(e);
                            onChange(e.target.files);
                          }}
                          onBlur={onBlur}
                          name={name}
                          ref={ref}
                          accept="image/*"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    {avatarPreview && (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-16 h-16 mt-2 rounded-full"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
