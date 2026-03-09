import React from "react";
import { useForm } from "react-hook-form";
import { Save, MapPin, Thermometer } from "lucide-react";

interface SettingsFormProps {
  fullName: string;
  email: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
}

export const UserDashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormProps>();

  const onSubmit = (data: SettingsFormProps) => {
    console.log("Updated Data:", data);
    // connect your backend here
  };

  // 🔥 Dummy weather data (you will replace this later)
  const weatherData = {
    location: "Kathmandu",
    temperature: 26,
    condition: "Sunny",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            Account Settings
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* BASIC INFO */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Basic Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    {...register("phone")}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* PASSWORD SECTION */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Old Password</label>
                  <input
                    type="password"
                    {...register("oldPassword", {
                      required: "Old password required",
                    })}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {errors.oldPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    {...register("newPassword", {
                      required: "New password required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            >
              <Save size={18} />
              Save Changes
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN - WEATHER BOX */}
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">
            Current Location Weather
          </h3>

          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-indigo-500" />
            <span className="font-medium">{weatherData.location}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Thermometer className="text-red-500" />
            <span className="text-2xl font-bold">
              {weatherData.temperature}°C
            </span>
          </div>

          <div className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium">
            {weatherData.condition}
          </div>
        </div>
      </div>
    </div>
  );
};
