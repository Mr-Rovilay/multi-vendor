import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Home, 
  RefreshCw 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-2xl">
        {/* Card Header */}
        <CardHeader className="py-6 text-center text-white bg-gradient-to-r from-red-500 to-red-600">
          <div className="flex justify-center mb-4 animate-pulse">
            <AlertTriangle className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <h1 className="mb-2 text-4xl font-extrabold tracking-wide">Oops!</h1>
          <p className="text-lg font-light">We couldn&apos;t find the page you&apos;re looking for.</p>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="p-8 space-y-6 text-center">
          <p className="leading-relaxed text-gray-600">
            It seems like the page has wandered into the digital abyss. Let’s help you get back on track.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <Button asChild variant="default" size="lg" className="transition-transform transform hover:scale-105">
              <Link to="/" className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.location.reload()}
              className="transition-transform transform hover:border-blue-600 hover:text-blue-600 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reload
            </Button>
          </div>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="p-4 text-sm text-center text-gray-500 border-t bg-gray-50">
          Error 404 - The requested page does not exist.
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
