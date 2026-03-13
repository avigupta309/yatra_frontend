import axios from "axios";
import { Save, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModalProps {
  closeModal: () => void;
  userId: string;
}

interface userProps {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  profilePic: FileList;
}

export function UserModal({ closeModal, userId }: ModalProps) {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<userProps>();

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `${backUrl}/api/user/viewoneuser/${userId}`,
      );
      const userData = response.data.data;
      reset({
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
      });
    }

    fetchUser();
  }, [userId, reset]);

  const onSubmit = async (data: userProps) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("role", data.role);
    formData.append("fullName", data.fullName);
    if (data.profilePic && data.profilePic.length > 0) {
      formData.append("profilePic", data.profilePic[0]);
    } else {
      console.log("No image selected");
    }
    console.log(data);
    try {
      await axios.put(`${backUrl}/api/user/changerole/${userId}`, formData);
      toast.success("Sucessfuly Updated User Info");
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
              {...register("fullName", { required: "Name is required" })}
              className="w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
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

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              className="w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
            </select>
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
