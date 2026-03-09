import { BusInfo } from "../../../types";

interface AnimatedDriverProps {
  busFeatures: BusInfo | null;
}

const AnimatedDriver = ({ busFeatures }: AnimatedDriverProps) => {
  const driverImgSrc = busFeatures?.busDriverId.profileImage;
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Driver</h3>
        <div className="flex items-center space-x-3">
          <div>
            <img
              src={driverImgSrc}
              alt="Driver"
              className="w-20 rounded-full object-cover border border-gray-200"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {busFeatures?.busDriverId.driverName}
            </p>
            <p className="text-sm text-gray-600">Professional Driver</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></div>
              <span className="text-xs text-green-600">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedDriver };
