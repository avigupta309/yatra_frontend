import { useForm } from "react-hook-form";
import { BusFormInputs } from "../../../types/busform";
import { Save, X } from "lucide-react";
import axios from "axios";

export function BusAdd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusFormInputs>();

  const inputFielsStyle =
    "w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none";
  const onSubmit = async (data: BusFormInputs) => {

    try {
      const response = await axios.post(
        "http://localhost:3000/api/bus/busupload",
        data,
      );
    } catch (error) {}
    // reset();
  };

  return (
    <div className="w-full bg-white text-black">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Bus Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Bus Name</label>
            <input
              {...register("busName", { required: "Bus name is required" })}
              className={inputFielsStyle}
            />
            {errors.busName && (
              <p className="text-red-500 text-sm">{errors.busName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Bus Number</label>
            <input
              {...register("busNumber", {
                required: "Bus number is required",
              })}
              className={inputFielsStyle}
            />
            {errors.busNumber && (
              <p className="text-red-500 text-sm">{errors.busNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Latitude</label>
            <input
              type="number"
              step="0.0001"
              {...register("latitude", { required: "latitude is required" })}
              className={inputFielsStyle}
            />
            {errors.latitude && (
              <p className="text-red-500 text-sm">{errors.latitude.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">longitude</label>
            <input
              type="number"
              step="0.0001"
              {...register("longitude", {
                required: "longitude is required",
              })}
              className={inputFielsStyle}
            />
            {errors.longitude && (
              <p className="text-red-500 text-sm">{errors.longitude.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              {...register("type")}
              className="select select-bordered w-full bg-white cursor-pointer"
            >
              <option value="Non-AC">Non-AC</option>
              <option value="AC">AC</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Source</label>
            <input
              {...register("source", { required: "Source is required" })}
              className={inputFielsStyle}
            />
            {errors.source && (
              <p className="text-red-500 text-sm">{errors.source.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Destination</label>
            <input
              {...register("destination", {
                required: "Destination is required",
              })}
              className={inputFielsStyle}
            />
            {errors.destination && (
              <p className="text-red-500 text-sm">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Departure Time</label>
            <input
              type="text"
              {...register("departureTime", { required: true })}
              className={inputFielsStyle}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Arrival Time</label>
            <input
              type="text"
              {...register("arrivalTime", { required: true })}
              className={inputFielsStyle}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Fare Per Seat</label>
            <input
              type="number"
              {...register("farePerSeat", { required: true })}
              className={inputFielsStyle}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Total Seats</label>
            <input
              type="number"
              {...register("totalSeats", { required: true })}
              className={inputFielsStyle}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Amenities (comma separated)
            </label>
            <input
              {...register("amenities", { required: true })}
              className={inputFielsStyle}
              placeholder="charger,wifi,blanket"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Operator</label>
            <input
              {...register("operator", { required: true })}
              className={inputFielsStyle}
            />
          </div>
        </div>

        {/* Driver Info */}
        <h4 className="font-bold mt-4 mb-2 text-blue-600">Driver Info</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Driver Name</label>
            <input
              {...register("driverName", { required: true })}
              className={inputFielsStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Driver Email</label>
            <input
              type="email"
              {...register("driverEmail", { required: true })}
              className={inputFielsStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Driver Phone</label>
            <input
              type="tel"
              {...register("driverPhoneNumber", { required: true })}
              className={inputFielsStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Driver Address</label>
            <input
              {...register("driverAddress", { required: true })}
              className={inputFielsStyle}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
          >
            Save <Save size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
