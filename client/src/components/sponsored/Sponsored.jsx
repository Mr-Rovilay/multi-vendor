import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award, Zap } from 'lucide-react';

const SponsoredPage = () => {
  const sponsoredItems = [
    {
      id: 1,
      title: 'Premium Smartphone',
      description: 'Cutting-edge technology in a sleek design',
      price: 999,
      discount: 20,
      image: "/api/placeholder/400/300",
      sponsor: 'Tech Innovations Inc.',
      features: [
        '5G Enabled',
        'Advanced Camera System',
        '256GB Storage',
        'Long Battery Life'
      ]
    },
    {
      id: 2,
      title: 'Smart Home Package',
      description: 'Complete home automation solution',
      price: 599,
      discount: 15,
      image: "/api/placeholder/400/300",
      sponsor: 'Home Connect Solutions',
      features: [
        'Voice Control',
        'Energy Monitoring',
        'Security Integration',
        'Multi-device Sync'
      ]
    },
    {
      id: 3,
      title: 'Fitness Tracker Pro',
      description: 'Advanced health and wellness companion',
      price: 249,
      discount: 25,
      image: "/api/placeholder/400/300",
      sponsor: 'Wellness Tech',
      features: [
        'Heart Rate Monitoring',
        'GPS Tracking',
        'Sleep Analysis',
        'Water Resistant'
      ]
    }
  ];

  return (
    <div className="max-pad-container bg-gradient-to-br from-blue-50 to-white">
      <div className="mb-12 text-center">
        <h1 className="flex items-center justify-center mb-4 text-4xl font-bold">
          <Award className="mr-3 text-yellow-500" size={40} />
          Sponsored Deals
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Exclusive offers from our trusted partners. Limited time deals with exceptional value.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {sponsoredItems.map((item) => (
          <Card key={item.id} className="transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="relative">
              <div className="absolute flex items-center px-3 py-1 text-sm text-white bg-yellow-500 rounded-full top-4 right-4">
                <Star className="mr-2" size={16} />
                Sponsored
              </div>
              <img 
                src={item.image} 
                alt={item.title} 
                className="object-cover w-full h-48 rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-4 text-2xl">{item.title}</CardTitle>
              
              <div className="mb-4">
                <p className="mb-2 text-muted-foreground">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="mr-3 text-xl font-bold">${item.price}</span>
                    <span className="font-semibold text-green-600">
                      {item.discount}% OFF
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    by {item.sponsor}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="flex items-center mb-2 font-semibold">
                  <Zap className="mr-2 text-blue-500" size={20} />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
                <Button className="w-full">
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="secondary" size="lg">
          View All Sponsored Deals
        </Button>
      </div>
    </div>
  );
};

export default SponsoredPage;