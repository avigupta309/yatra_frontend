import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DriverModal } from "./modal/driver";
interface userProps {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

export function Drivers() {
  const [drivers, setDrivers] = useState<userProps[]>([]);
  const [driverId, setDriverId] = useState<string>("");
  const [viewDriver, setViewDriver] = useState<boolean>(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/driver/viewalldriver",
        );
        setDrivers(response.data.driver);
      } catch (error) {}
    }
    fetchUser();
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-black">All Drivers</h2>
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-700 text-white sticky top-0">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users registered yet
                </td>
              </tr>
            ) : (
              drivers.map((driver, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-100 transition cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">
                    {i + 1}. {driver.fullName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">{driver.email}</td>

                  <td className="px-4 py-3">{driver.phoneNumber}</td>

                  
                  <td className="text-red-500 hover:text-red-600">
                    <Edit
                      onClick={() => {
                        setViewDriver(!viewDriver);
                        setDriverId(driver._id);
                      }}
                      height={25}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {viewDriver && (
          <DriverModal
            closeModal={() => setViewDriver(false)}
            driverId={driverId}
          />
        )}
      </div>
    </div>
  );
}
