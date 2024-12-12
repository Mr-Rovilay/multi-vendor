import { 
    User, 
    ShoppingBag, 
    RefreshCcw, 
    MessageCircle, 
    MapPin, 
    RailSymbol,
    LockKeyhole, 
    LogOut, 
    LayoutDashboard 
  } from "lucide-react";
  import { Link, useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
  } from "@/components/ui/card";
import api from "@/utils/server";
import { toast } from "sonner";
  
  const ProfileSidebarItem = ({ 
    icon: Icon, 
    label, 
    active, 
    activeNumber, 
    onClick,
    className
  }) => (
    <Button
      variant={active === activeNumber ? "secondary" : "ghost"}
      className={`
        w-full justify-start 
        ${className}
      `}
      onClick={onClick}
    >
      <Icon 
        className={`
          mr-2 w-5 h-5 
          ${active === activeNumber ? 'text-primary' : 'text-muted-foreground'}
        `} 
      />
      {label}
    </Button>
  );
  
  const ProfileSidebar = ({ setActive, active }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
  
    const logoutHandler = () => {
      api
        .post(`/auth/logout`)
        .then((res) => {
          toast.success(res.data.message);
       
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
  
    const sidebarItems = [
      { 
        icon: User, 
        label: "Profile", 
        activeNumber: 1,
        action: () => setActive(1)
      },
      { 
        icon: ShoppingBag, 
        label: "Orders", 
        activeNumber: 2,
        action: () => setActive(2)
      },
      { 
        icon: RefreshCcw, 
        label: "Refunds", 
        activeNumber: 3,
        action: () => setActive(3)
      },
      { 
        icon: MessageCircle, 
        label: "Inbox", 
        activeNumber: 4,
        action: () => {
          setActive(4);
          navigate("/inbox");
        }
      },
      { 
        icon: RailSymbol , 
        label: "Track Order", 
        activeNumber: 5,
        action: () => setActive(5)
      },
      { 
        icon: LockKeyhole, 
        label: "Change Password", 
        activeNumber: 6,
        action: () => setActive(6)
      },
      { 
        icon: MapPin, 
        label: "Address", 
        activeNumber: 7,
        action: () => setActive(7)
      }
    ];
  
    return (
      <Card>
        <CardContent className="pt-6 space-y-2">
          {sidebarItems.map((item) => (
            <ProfileSidebarItem
              key={item.activeNumber}
              icon={item.icon}
              label={item.label}
              active={active}
              activeNumber={item.activeNumber}
              onClick={item.action}
            />
          ))}
  
          {user && user?.role === "Admin" && (
            <Link to="/admin/dashboard">
              <ProfileSidebarItem
                icon={LayoutDashboard}
                label="Admin Dashboard"
                active={active}
                activeNumber={8}
                onClick={() => setActive(8)}
              />
            </Link>
          )}
  
          <ProfileSidebarItem
            icon={LogOut}
            label="Log out"
            active={active}
            activeNumber={9}
            onClick={logoutHandler}
            className="text-destructive hover:text-destructive"
          />
        </CardContent>
      </Card>
    );
  };
  
  export default ProfileSidebar;