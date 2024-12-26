/* eslint-disable react/prop-types */
import { Star, StarHalf, StarOff,  } from "lucide-react";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star
          key={i}
          size={20}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalf
          key={i}
          size={20}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    } else {
      stars.push(
        <StarOff 
          key={i}
          size={20}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    }
  }
  return <div className="flex"> {stars} </div>;
};

export default Ratings;
