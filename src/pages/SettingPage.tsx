import { useEffect, useState } from "react";
import { AdminDashboard } from "../components/Admin/AdminDashBoard";
import { useAuth } from "../hooks/Auth";
import { UserDashboard } from "../components/User/UserDashboard";

export function AdminSettingsPage() {
  const [userRole, setUserRole] = useState<string>("user");
  const { authUser } = useAuth();
  useEffect(() => {
    if (!authUser) return;
    setUserRole(authUser?.role);
  }, [authUser]);
  return (
    <div>{userRole == "user" ? <UserDashboard /> : <AdminDashboard />}</div>
  );
}
