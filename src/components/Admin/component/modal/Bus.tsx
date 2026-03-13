import { Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { BusFormInputs } from "../../../../types/busform";
import { useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
interface ModalProps {
  viewModal: () => void;
  busId: string;
}

export function BusModal({ viewModal, busId }: ModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BusFormInputs>();

  useEffect(() => {
    async function FetchBus() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bus/specificbus/${busId}`,
        );
        const busData = response.data.bus;
        reset(busData);
      } catch (error) {}
    }
    FetchBus();
  }, [busId]);

  const inputFielsStyle =
    "w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none";

  const onSubmit = async (data: BusFormInputs) => {
    const formData = new FormData();
    formData.append("busData", JSON.stringify(data));
    if (data.exteriorPic) {
      formData.append("exteriorPic", data.exteriorPic[0]);
    }
    if (data.interiorPic) {
      formData.append("interiorPic", data.interiorPic[0]);
    }
    try {
      const response = await axios.put(
        "http://localhost:3000/api/bus/busedit",
        formData,
      );
      toast.success("Bus Updated Sucessfully...");
    } catch (error: any) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="modal modal-open">
      <div
        className="modal-box w-11/12 max-w-4xl bg-white text-black overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-xl mb-4 text-blue-700">Edit Bus</h3>

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
                <p className="text-red-500 text-sm">
                  {errors.busNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Latitude</label>
              <input
                type="number"
                step="0.0001"
                {...register("latitude", { required: "Latitude is required" })}
                className={inputFielsStyle}
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Longitude</label>
              <input
                type="number"
                step="0.0001"
                {...register("longitude", {
                  required: "Longitude is required",
                })}
                className={inputFielsStyle}
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm">
                  {errors.longitude.message}
                </p>
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
                {...register("busDriverId.driverName", { required: true })}
                className={inputFielsStyle}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Driver Email</label>
              <input
                type="email"
                {...register("busDriverId.email", { required: true })}
                className={inputFielsStyle}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Driver Phone</label>
              <input
                type="tel"
                {...register("busDriverId.phoneNumber", { required: true })}
                className={inputFielsStyle}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Driver Address</label>
              <input
                {...register("busDriverId.address", { required: true })}
                className={inputFielsStyle}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={viewModal}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition flex items-center gap-1"
            >
              Cancel <X size={18} />
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Updating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="flex">
                    Save
                    <Save />
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* ########### */}

          <div>
            <label className="block mb-1 font-medium">Interior Photo</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("interiorPic")}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Exterior Photo</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("exteriorPic")}
            />
          </div>
        </form>
      </div>

      <div className="modal-backdrop" onClick={viewModal}></div>
    </div>
  );
}
