import { useEffect, useState } from "react";
import { Clock } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CountDown = ({ 
  targetDate = "2024-12-11",
  onCountdownEnd = () => {}
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (Object.keys(timeLeft).length === 0) {
      setIsExpired(true);
      onCountdownEnd();
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        setIsExpired(true);
        onCountdownEnd();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onCountdownEnd]);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
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
  }

  if (isExpired) {
    return (
      <Card className="p-4 text-center">
        <Badge variant="destructive" className="flex items-center justify-center">
          <Clock className="mr-2" /> Time#&39;s Up!
        </Badge>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-center space-x-4">
        <Clock className="text-primary" />
        <div className="flex space-x-2">
          {Object.entries(timeLeft).map(([interval, value]) => (
            <Badge 
              key={interval} 
              variant="outline" 
              className="flex flex-col items-center p-2 min-w-[70px]"
            >
              <span className="text-xl font-bold">{value}</span>
              <span className="text-xs uppercase">{interval}</span>
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CountDown;