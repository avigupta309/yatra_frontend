import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { ticketDetailsProps } from "../../types";
import { toast } from "react-toastify";

export const SelectedBus = () => {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [ticketDetails, setTicketDetails] = useState<ticketDetailsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();

  useEffect(() => {
    if (!authUser?.email) return;

    async function fetchTicket() {
      try {
        const response = await axios.post(`${backUrl}/api/bookedticket/view`, {
          userEmail: authUser?.email,
        });
        setTicketDetails(response.data.ticketBooked);
      } catch (error) {
        toast.error("Error to fetch tickets");
      } finally {
        setLoading(false);
      }
    }

    fetchTicket();
  }, [authUser?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading your tickets...
      </div>
    );
  }

  if (ticketDetails.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        No tickets booked yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center h-screen overflow-auto">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          🎫 My Booked Tickets
        </h1>

        {ticketDetails.map((ticket, i) => {
          const totalPrice = ticket.busId.farePerSeat * ticket.seats.length;

          return (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border"
            >
              {/* Top Section */}
              <div className="bg-gradient-to-r bg-blue-700 text-white p-6">
                <h2 className="text-xl font-bold">{ticket.busId.busName}</h2>
                <p className="text-sm opacity-90 mt-1">
                  {ticket.busId.source} → {ticket.busId.destination}
                </p>
              </div>

              {/* Ticket Info */}
              <div className="p-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Seats</span>
                  <span className="font-semibold">
                    {ticket.seats.join(", ")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Seat Fare</span>
                  <span className="font-semibold">
                    NPR {ticket.busId.farePerSeat}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total Seats</span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-bold">
                    {ticket.seats.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Departure</span>
                  <span className="font-semibold">
                    {ticket.busId.departureTime}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Arrival</span>
                  <span className="font-semibold">
                    {ticket.busId.arrivalTime}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    Total: NPR {totalPrice}
                  </span>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                    Download Ticket
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
