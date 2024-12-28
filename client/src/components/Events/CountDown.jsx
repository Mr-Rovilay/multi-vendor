import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/utils/server";

const CountDown = ({ data }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(data.endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // If countdown is complete, make API call
      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timer);
        api
          .delete(`/event/delete-shop-event/${data._id}`)
          .then(() => console.log("Event deleted successfully"))
          .catch((error) => console.error("Failed to delete event", error));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.endDate, data._id]); // Add data.endDate as dependency

  const isExpired = Object.keys(timeLeft).length === 0;

  if (isExpired) {
    return (
      <Card className="p-4 text-center">
        <Badge variant="destructive" className="flex items-center justify-center">
          <Clock className="mr-2" /> Time's Up!
        </Badge>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Clock className="text-primary" />
      <div className="flex">
        {Object.entries(timeLeft).map(([interval, value]) => (
          <div
            key={interval}
            className="flex flex-col items-center p-2"
          >
            <span className="text-sm font-bold">{value}</span>
            <span className="text-xs uppercase">{interval}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDown;