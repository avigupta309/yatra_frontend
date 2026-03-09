import {
  Star,
  MapPin,
  Clock,
  Snowflake,
  Wifi,
  Zap,
  Coffee,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Bus, BusInfo } from "../../types";

interface busProps {
  searchResults: BusInfo[] | Bus[];
}

export function FilterBusCard({ searchResults }: busProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
        return <Wifi className="h-3 w-3" />;
      case "charging point":
        return <Zap className="h-3 w-3" />;
      case "snacks":
        return <Coffee className="h-3 w-3" />;
      case "blanket":
        return <Snowflake className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {searchResults.map((bus, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row lg:items-center justify-between p-4 mt-5 rounded-lg border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          {/* Bus Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {bus.busName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{bus.operator}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      bus.type === "AC"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {bus.type}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {bus?.rating || 5}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ₹ {bus.farePerSeat}
                </div>
                <div className="text-sm text-gray-600">per seat</div>
              </div>
            </div>

            {/* Route and Time */}
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>
                  {bus.source} → {bus.destination}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {bus.departureTime} - {bus.arrivalTime}
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-3">
              {bus.amenities.slice(0, 4).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}

              {bus.amenities.length > 4 && (
                <div className="text-xs text-gray-500 mt-1">
                  +{bus.amenities.length - 4} more
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 rounded bg-gray-200 text-gray-800 text-xs">
                {bus.availableSeats}
              </span>
              <span className="text-sm text-gray-500">{bus.totalSeats}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="lg:ml-6 mt-3 lg:mt-0">
            <Link
              to={`/selectionbus/${bus._id}`}
              className={`block text-center w-full lg:w-auto px-8 py-2 rounded-lg font-medium text-white transition ${
                bus.availableSeats === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {bus.availableSeats === 0 ? "Sold Out" : "Select Seats"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
