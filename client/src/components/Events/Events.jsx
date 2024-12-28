import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EventCard from "./EventCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllEvents } from "@/redux/actions/eventAction";
import { Loader } from "../layout/Loader";

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  if (error) {
    return (
      <div className="py-10 text-center max-pad-container">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-pad-container bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="mb-8">
        <CardTitle className="text-3xl font-bold text-center">
          Popular Events
        </CardTitle>
        <CardDescription className="font-bold text-center">
          Discover exciting products and limited-time offers
        </CardDescription>
      </CardHeader>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
       <Loader/>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allEvents && allEvents.length > 0 ? (
            allEvents.map((event) => (
              <EventCard data={allEvents && allEvents[0]}
                key={event._id}
                {...event}
              />
            ))
          ) : (
            <div className="py-10 text-center col-span-full">
              <h4 className="text-lg text-gray-600">
                No events available at the moment
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                Check back later for exciting new events
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;