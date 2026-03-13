import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { BusInfo } from "../../../types";
import axios from "axios";
import { BusModal } from "./modal/Bus";

export function Bus() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [bus, setBus] = useState<BusInfo[]>([]);
  const [busId, setBusId] = useState<string>("");
  const [viewModal, setViewModal] = useState<boolean>(false);
  useEffect(() => {
    async function fetchBus() {
      try {
        const response = await axios.get(`${backUrl}/api/bus/viewbus`);
        setBus(response.data.bus);
      } catch (error) {}
    }
    fetchBus();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-black">All Buses</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className=" bg-blue-700 text-white ">
            <tr>
              <th>Bus </th>
              <th>Driver </th>
              <th>Operator </th>
              <th>Bus No. </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bus.map((bus, i) => {
              return (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">
                    {i + 1}. {bus.busName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {bus.busDriverId.driverName}
                  </td>
                  <td>{bus.operator}</td>
                  <td>{bus.busNumber}</td>
                  <td className="text-red-500 hover:text-red-600">
                    <Edit
                      onClick={() => {
                        setViewModal(!viewModal);
                        setBusId(bus._id);
                      }}
                      height={25}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {viewModal && (
          <BusModal
            viewModal={() => {
              setViewModal(false);
            }}
            busId={busId}
          />
        )}
      </div>
    </div>
  );
}
