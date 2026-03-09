import { Bus } from "./component/Bus";
import { BusAdd } from "./component/BusForm";
import { Drivers } from "./component/Driver";
import { Users } from "./component/Users";

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <Users />
      <Bus />
      <Drivers/>
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Bus</h2>
        <BusAdd />
      </div>
    </div>
  );
};

{
  /* <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bus Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Driver Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Bus
          </button>
        </form> */
}
