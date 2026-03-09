import {  BusInfo } from "../../../types";

interface BusHeaderProps {
    busFeatures: BusInfo|null;
    setShowInfoModal: (show: boolean) => void;
}

const BusHeader = ({ busFeatures, setShowInfoModal }: BusHeaderProps) => {

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6  text-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold  flex items-center gap-2">
            🚌 {busFeatures?.source} → {busFeatures?.destination}
          </h1>
          <h1 className="text-xl font-medium bg-slate-600 p-2 rounded-lg text-white">{busFeatures?.busName}</h1>
          <button
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ℹ️ Bus Info
          </button>
        </div>
      </div>
    </div>
  );
};

export { BusHeader };