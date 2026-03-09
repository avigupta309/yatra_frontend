import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Auth";
import { BusInfo } from "../../../types";
interface busProps {
  busFeatures: BusInfo | null;
}
const BusStructure = ({ busFeatures }: busProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { setUserInfo, authUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const ButtonStyle =
    "w-12 h-12 text-sm font-bold rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-white";

  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats((prev) => [...prev, seatNumber]);
    }
  };

  useEffect(() => {
    if (!authUser || !busFeatures || !id) return;
    const ticketAmount: number = busFeatures.farePerSeat * selectedSeats.length;

    setUserInfo({
      name: authUser.fullName,
      userId: authUser.id,
      mobileNo: authUser.phone,
      useremail: authUser.email,
      busName: busFeatures.busName,
      from: busFeatures.source,
      to: busFeatures.destination,
      busId: id,
      seat: selectedSeats,
      ticketAmount: ticketAmount,
    });
  }, [selectedSeats]);

  const leftSeats = () => {
    const seatElements = [];
    for (let i = 1; i <= 7; i++) {
      seatElements.push(
        <div key={i} className="flex space-x-2 mb-2">
          <button
            className={`${ButtonStyle} ${selectedSeats.includes(`A${i}`) ? "bg-red-500" : "bg-blue-600"}`}
            onClick={() => handleSeatClick(`A${i}`)}
          >
            {`A${i}`}
          </button>
          <button
            className={`${ButtonStyle} ${selectedSeats.includes(`B${i}`) ? "bg-red-500" : "bg-blue-600"}`}
            onClick={() => handleSeatClick(`B${i}`)}
          >
            {`B${i}`}
          </button>
        </div>,
      );
    }

    return seatElements;
  };

  const rightSeat = () => {
    const seatElements = [];
    for (let i = 1; i <= 7; i++) {
      seatElements.push(
        <div key={i} className="flex space-x-2 mb-2">
          <button
            className={`${ButtonStyle} ${selectedSeats.includes(`C${i}`) ? "bg-red-500" : "bg-blue-600"}`}
            onClick={() => handleSeatClick(`C${i}`)}
          >
            {`C${i}`}
          </button>
          <button
            className={`${ButtonStyle} ${selectedSeats.includes(`D${i}`) ? "bg-red-500" : "bg-blue-600"}`}
            onClick={() => handleSeatClick(`D${i}`)}
          >
            {`D${i}`}
          </button>
        </div>,
      );
    }

    return seatElements;
  };

  return (
    <div>
      <div className="relative bg-gray-50 rounded-xl p-6">
        {/* Driver Area */}
        <div className="flex justify-end mb-4">
          <div className="bg-slate-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
            🚗 Driver
          </div>
        </div>

        {/* Seat Layout */}
        <div className="flex justify-center items-start space-x-8">
          {/* Left Column */}
          <div className="space-y-3">{leftSeats()}</div>

          {/* Aisle Separator */}
          <div className="flex flex-col items-center h-full py-4">
            <div className="h-80 w-1 bg-gray-400"></div>
            <span className="text-xs text-gray-500 mt-2 p-2 rotate-90 whitespace-nowrap">
              Separate
            </span>
          </div>

          {/* Right Column */}
          <div className="space-y-3">{rightSeat()}</div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">Selected Seats:</h3>
              <p className="text-sm text-gray-600">
                {selectedSeats.map((seat, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 ml-3 bg-blue-500 text-white rounded text-sm"
                  >
                    {seat}
                  </span>
                ))}
              </p>
            </div>
            <Link
              to={"/PaymentProcessing"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export { BusStructure };
