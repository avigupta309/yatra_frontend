import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserModal } from "./modal/user";
interface userProps {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

export function Users() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState<userProps[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [viewUser, setViewUser] = useState<boolean>(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${backUrl}/api/user/viewuser`);
        setUsers(response.data.users);
      } catch (error) {}
    }
    fetchUser();
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-black">All Users</h2>
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-700 text-white sticky top-0">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users registered yet
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-100 transition cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">
                    {i + 1}. {user.fullName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">{user.email}</td>

                  <td className="px-4 py-3">{user.phoneNumber}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-red-500 hover:text-red-600">
                    <Edit
                      onClick={() => {
                        setViewUser(!viewUser);
                        setUserId(user._id);
                      }}
                      height={25}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {viewUser && (
          <UserModal closeModal={() => setViewUser(false)} userId={userId} />
        )}
      </div>
    </div>
  );
}
