import React, { useEffect, useState } from "react";
import { BusHeader } from "../components/layout/BusLayout/BusHeader";
import { BusExterior } from "../components/layout/BusLayout/BusExterior";
import type { BusInfo } from "../types";
import { BusInterior } from "../components/layout/BusLayout/BusInterior";
import { AnimatedDriver } from "../components/layout/BusLayout/AnimatedDriver";
import { BusStructure } from "../components/layout/BusLayout/BusStructure";
import { BusModal } from "../components/layout/BusLayout/BusInfo";
import Map from "../components/Map/Map";
import { useParams } from "react-router-dom";
import axios from "axios";
const SelectionBus: React.FC = () => {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [busFeatures, setBusFeatures] = useState<BusInfo | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    async function FetchingCityDetails() {
      try {
        const response = await axios.get(
          `${backUrl}/api/bus/specificbus/${id}`,
        );
        setBusFeatures(response.data.bus);
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    FetchingCityDetails();
  }, [id]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <BusHeader
          busFeatures={busFeatures}
          setShowInfoModal={setShowInfoModal}
        />

        {/* Main Bus Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bus Images Section */}
          <div className="space-y-4">
            {/* Bus Exterior */}
            <BusExterior busFeatures={busFeatures} />

            {/* Bus Interior */}
            <BusInterior busFeatures={busFeatures} />

            {/* Animated Driver */}
            <AnimatedDriver busFeatures={busFeatures} />
          </div>

          {/* Seat Selection Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Select Your Seats</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>

              {/* Bus Layout */}
              <BusStructure busFeatures={busFeatures} />
            </div>
          </div>
        </div>

        {/* Info Modal */}
        <BusModal
          busFeatures={busFeatures}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
        />
        <Map />
      </div>
    </div>
  );
};

export { SelectionBus };
