import { BusInfo } from "../../../types";

interface BusModalProps {
  busFeatures: BusInfo | null;
  showInfoModal: boolean;
  setShowInfoModal: (show: boolean) => void;
}
const BusModal = ({
  busFeatures,
  showInfoModal,
  setShowInfoModal,
}: BusModalProps) => {
  return (
    <div className="text-gray-800">
      {showInfoModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  🚌 Bus Details
                </h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    👨‍✈️
                    <div>
                      <p className="text-sm font-medium">Driver</p>
                      <p className="text-sm text-gray-600">
                        {busFeatures?.busDriverId.driverName}
                      </p>
                      <p className="text-sm text-gray-500 relative ">
                        {busFeatures?.busDriverId.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    🔢
                    <div>
                      <p className="text-sm font-medium">Bus Number</p>
                      <p className="text-sm text-gray-600">
                        {busFeatures?.busNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    🎨
                    <div>
                      <p className="text-sm font-medium">Color</p>
                      <p className="text-sm text-gray-600">
                        {busFeatures?.busColor || "black & white"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    💺
                    <div>
                      <p className="text-sm font-medium">Total Seats</p>
                      <p className="text-sm text-gray-600">
                        {busFeatures?.totalSeats}
                      </p>
                    </div>
                  </div>
                  <div>
                    💺
                    <p className="text-sm font-medium">Available Seats</p>
                    <p className="text-sm text-gray-600">
                      {busFeatures?.availableSeats}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    📍 <span className="text-sm font-medium">Source:</span>
                    <span className="text-sm">{busFeatures?.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    🎯 <span className="text-sm font-medium">Destination:</span>
                    <span className="text-sm">{busFeatures?.destination}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      <strong>Departure:</strong> {busFeatures?.departureTime}
                    </span>
                    <span>
                      <strong>Arrival:</strong> {busFeatures?.arrivalTime}
                    </span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="text-sm font-medium mb-2">
                    Bus Type: {busFeatures?.type}
                  </p>
                  <p className="text-sm font-medium mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {busFeatures?.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { BusModal };
