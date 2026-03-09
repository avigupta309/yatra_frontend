import { useEffect, useState } from "react";
import { BusInfo } from "../../../types";
import { string } from "zod";

interface busInteriorProps {
  busFeatures: BusInfo | null;
}

const BusInterior = ({ busFeatures }: busInteriorProps) => {
  const [interiorPic, setInteriorPic] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (busFeatures?.interiorPic) {
      setInteriorPic(busFeatures.interiorPic);
    }
  }, [busFeatures]);
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4  text-black">
        <h3 className="text-lg font-semibold mb-1">Bus Interior</h3>
        <div className="aspect-video bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
          <img src={interiorPic} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export { BusInterior };
