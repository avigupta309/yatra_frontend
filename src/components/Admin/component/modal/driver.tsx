import axios from "axios";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModalProps {
  closeModal: () => void;
  driverId: string;
}

interface driverProps {
  driverName: string;
  phoneNumber: string;
  email: string;
  password: string;
  profilePic: FileList;
}

export function DriverModal({ closeModal, driverId }: ModalProps) {
  const [_, setDriver] = useState<driverProps>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<driverProps>();

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `http://localhost:3000/api/driver/specificdriver/${driverId}`,
      );
      const driverData = response.data.driver;
      setDriver(driverData);
      reset({
        email: driverData.email,
        driverName: driverData.driverName,
        phoneNumber: driverData.phoneNumber,
      });
    }

    fetchUser();
  }, [driverId, reset]);

  const onSubmit = async (data: driverProps) => {
    console.log(data);
    const formData = new FormData();
    formData.append("driverName", data.driverName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    if (data.profilePic && data.profilePic.length > 0) {
      formData.append("profilePic", data.profilePic[0]);
    } else {
      console.log("No image selected");
    }
    try {
      await axios.put(
        `http://localhost:3000/api/driver/handledriveredit`,
        formData,
      );
      toast.success("Sucessfully updated Driver info...");
    } catch (error) {
      toast.error("Something Went Wrong");
    }

    // reset();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl bg-white  text-black">
        <h3 className="font-bold text-xl mb-2 text-blue-700 ">Modify User</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              {...register("driverName", { required: "Name is required" })}
              className="w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.driverName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.driverName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              {...register("phoneNumber", { required: "Phone is required" })}
              className="w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("profilePic")}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModal}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <span className="flex">
                close
                <X />
              </span>
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
        </form>
      </div>

      <div className="modal-backdrop"></div>
    </div>
  );
}
