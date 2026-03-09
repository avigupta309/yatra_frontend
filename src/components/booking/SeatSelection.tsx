import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Seat } from "../../types";

interface SeatSelectionProps {
  totalSeats: number;
  availableSeats: number;
  onSeatSelect: (selectedSeats: number[]) => void;
  selectedSeats: number[];
}

export function SeatSelection({
  totalSeats,
  onSeatSelect,
  selectedSeats,
}: SeatSelectionProps) {
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const generatedSeats: Seat[] = [];
    const bookedSeats = new Set([3, 8, 12, 15, 19, 23, 26]);

    for (let i = 1; i <= totalSeats; i++) {
      generatedSeats.push({
        id: i.toString(),
        number: i,
        isAvailable: !bookedSeats.has(i),
        isSelected: selectedSeats.includes(i),
        type: i % 4 === 1 || i % 4 === 0 ? "window" : "aisle",
      });
    }

    setSeats(generatedSeats);
  }, [totalSeats, selectedSeats]);

  const handleSeatClick = (seatNumber: number) => {
    const seat = seats.find((s) => s.number === seatNumber);
    if (!seat || !seat.isAvailable) return;

    let newSelectedSeats: number[];
    if (selectedSeats.includes(seatNumber)) {
      newSelectedSeats = selectedSeats.filter((s) => s !== seatNumber);
    } else {
      if (selectedSeats.length >= 6) return;
      newSelectedSeats = [...selectedSeats, seatNumber];
    }

    onSeatSelect(newSelectedSeats);
  };

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable)
      return "bg-gray-300 text-gray-500 cursor-not-allowed";
    if (seat.isSelected) return "bg-blue-600 text-white";
    return "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer";
  };

  const renderSeatLayout = () => {
    const rows = [];
    const seatsPerRow = 4;
    const totalRows = Math.ceil(totalSeats / seatsPerRow);

    for (let row = 0; row < totalRows; row++) {
      const rowSeats = [];
      const startSeat = row * seatsPerRow + 1;

      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = startSeat + col;
        if (seatNumber > totalSeats) break;

        const seat = seats.find((s) => s.number === seatNumber);
        if (!seat) continue;

        rowSeats.push(
          <div key={seatNumber} className={col === 1 ? "mr-6" : ""}>
            <button
              className={`w-10 h-10 p-0 text-xs font-medium transition-all duration-200 rounded ${getSeatColor(
                seat,
              )}`}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={!seat.isAvailable}
            >
              {seatNumber}
            </button>
          </div>,
        );
      }

      rows.push(
        <div
          key={row}
          className="flex items-center justify-center space-x-2 mb-2"
        >
          {rowSeats}
        </div>,
      );
    }

    return rows;
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Select Your Seats here</h2>
        <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          {selectedSeats.length} selected
        </div>
      </div>

      {/* Bus Front Indicator */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-600">
          Driver
        </div>
      </div>

      {/* Seat Layout */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="max-w-xs mx-auto">{renderSeatLayout()}</div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-sm mb-6 ">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center">
            <User className="h-3 w-3 text-green-600" />
          </div>
          <span className="text-gray-800">Availablezzzz</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <User className="h-3 w-3 text-white" />
          </div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
            <User className="h-3 w-3 text-gray-500" />
          </div>
          <span>Booked</span>
        </div>
      </div>

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Selected Seats:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
              >
                Seat {seat}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
