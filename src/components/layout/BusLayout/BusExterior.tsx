import { useEffect, useState } from "react";
import { BusInfo } from "../../../types";

interface BusExteriorProps {
  busFeatures: BusInfo | null;
}

const BusExterior = ({ busFeatures }: BusExteriorProps) => {
  const [exteriorImage, setExteriorImage] = useState<string | undefined>(
    undefined,
  );
  useEffect(() => {
    if (busFeatures?.exteriorPic) {
      setExteriorImage(busFeatures.exteriorPic);
    }
  }, [busFeatures]);
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4  text-black">
        <h3 className="text-lg font-semibold mb-3">Bus Exterior</h3>
        <p className="text-xl">{busFeatures?.busNumber}</p>

        <div className="aspect-video bg-gradient-to-r rounded-lg relative overflow-hidden bg-cover bg-sky-400">
          <img src={exteriorImage} alt="" className="w-full h-72" />
        </div>
      </div>
    </div>
  );
};
export { BusExterior };
