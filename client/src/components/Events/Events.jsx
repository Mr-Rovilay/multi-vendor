
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import EventCard from "./EventCard";

const Events = () => {
  const events = [
    { 
      id: 1, 
      title: 'Iphone Pro Max', 
      description: 'Experience the latest in smartphone technology with cutting-edge features and sleek design.',
      originalPrice: 4000,
      currentPrice: 5000,
      soldCount: 120,
      imageUrl: "https://cdn.dxomark.com/wp-content/uploads/drafts/post-178568/Apple-iPhone-16-Pro-Max_featured-image-packshot-review.png"
    },
    { 
        id: 2, 
        title: 'Iphone Pro Max', 
        description: 'Experience the latest in smartphone technology with cutting-edge features and sleek design.',
        originalPrice: 4000,
        currentPrice: 5000,
        soldCount: 120,
        imageUrl: "https://cdn.dxomark.com/wp-content/uploads/drafts/post-178568/Apple-iPhone-16-Pro-Max_featured-image-packshot-review.png"
      },
      { 
        id: 3 , 
        title: 'Iphone Pro Max', 
        description: 'Experience the latest in smartphone technology with cutting-edge features and sleek design.',
        originalPrice: 4000,
        currentPrice: 5000,
        soldCount: 120,
        imageUrl: "https://cdn.dxomark.com/wp-content/uploads/drafts/post-178568/Apple-iPhone-16-Pro-Max_featured-image-packshot-review.png"
      },
  ];

  return (
    <div className="max-pad-container bg-gradient-to-br from-blue-50 to-white">
 
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Popular Events</CardTitle>
          <CardDescription className="font-bold text-center">
            Discover exciting products and limited-time offers
          </CardDescription>
        </CardHeader>
      
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard 
                key={event.id}
                {...event}
              />
            ))}
          </div>
      
  
    </div>
  );
}

export default Events;