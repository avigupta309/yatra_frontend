import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bus,
  User,
  LogOut,
  LogIn,
  Settings,
  Sun,
  MoonIcon,
} from "lucide-react";
import { useAuth } from "../../hooks/Auth";
import axios from "axios";
import { toast} from "react-toastify";

export function Header() {
  const { logged, theme, setTheme, authUser, setLogged } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.get("http://localhost:3000/api/logout", {
      withCredentials: true,
    });
  
    toast.error(`Log Out Sucessflly mr/ms ${authUser?.fullName}`);
    setTimeout(() => {
      setLogged(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Bus className="h-8 w-8" />
            <span className="text-2xl font-bold">Yaatra</span>
          </Link>

          <div className="hidden md:block text-gray-700 text-lg font-medium">
            Your Journey, Our Passion
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>

            <div className="relative">
              <label className="swap swap-rotate text-black cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hidden"
                />

                {/* Thin Hamburger */}
                <svg
                  className="swap-off"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>

                {/* Thin Close Icon */}
                <svg
                  className="swap-on"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </label>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  {logged ? (
                    <>
                      <Link
                        to="/profile"
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setTheme(!theme);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        {theme ? (
                          <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                        ) : (
                          <MoonIcon className="h-4 w-4 mr-2 text-blue-700" />
                        )}
                        Toggle Theme
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div>
                      <Link
                        to="/login"
                        className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign Up
                      </Link>
                      <button
                        onClick={() => {
                          setTheme(!theme);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        {theme ? (
                          <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                        ) : (
                          <MoonIcon className="h-4 w-4 mr-2 text-blue-700" />
                        )}
                        Toggle Theme
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
