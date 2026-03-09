import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftRight, MapPin, Search } from "lucide-react";
import { SearchFilters } from "../../types";
import { DisplayDate } from "../layout/DisplayDate";
import axios from "axios";
import { useCookies } from "react-cookie";


interface FormValues {
  source: string;
  destination: string;
  type?: "AC" | "Non-AC";
}

export function SearchForm(){
  const [isSwapping, setIsSwapping] = useState(false);
  const [, setCookies] = useCookies(["busData"]);
  const [city, setCity] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      source: "",
      destination: "",
      type: undefined,
    },
  });

  useEffect(() => {
    async function fetchCityName() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/city/viewcity"
        );
        setCity(response.data.city[0].cityName);
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    fetchCityName();
  }, []);

  const handleSwapCities = () => {
    setIsSwapping(true);
    const source = getValues("source");
    const destination = getValues("destination");
    setValue("source", destination);
    setValue("destination", source);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const onSubmit = (values: FormValues) => {
    if (!values.source || !values.destination) return;
    const searchFilters: SearchFilters = {
      source: values.source,
      destination: values.destination,
      type: values.type,
      updateAt:Date.now()
    };
    // onSearch(searchFilters);
    setCookies("busData", searchFilters, { path: "/" });
  };

  return (
    <div className="p-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Source Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                {...register("source", { required: "Please select departure" })}
                className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-gray-50"
              >
                <option value="">Select departure</option>
                {city.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            {errors.source && (
              <p className="text-red-500 text-xs mt-1">
                {errors.source.message}
              </p>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwapCities}
              className={`h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-transform duration-300 ${
                isSwapping ? "rotate-180" : ""
              }`}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                {...register("destination", {
                  required: "Please select destination",
                })}
                className="w-full h-12 pl-10 pr-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-gray-50 cursor-pointer"
              >
                <option
                  className="bg-green-700 text-white cursor-none"
                  value=""
                >
                  Select destination
                </option>
                {city.map((city, index) => (
                  <option key={index} value={city} className="cursor-pointer">
                    {city}
                  </option>
                ))}
              </select>
            </div>
            {errors.destination && (
              <p className="text-red-500 text-xs mt-1">
                {errors.destination.message}
              </p>
            )}
          </div>

          {/* Travel Date Component */}
          <DisplayDate />

          {/* Search Button */}
          <button
            type="submit"
            className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition duration-200"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Buses
          </button>
        </div>

        {/* Bus Type Selector */}
        <div className="mt-3">
          <label className="text-sm font-semibold text-gray-700">
            Bus Type
          </label>
          <select
            {...register("type")}
            className="w-full md:w-48 mt-1 h-11 pl-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
          >
            <option value="">All bus types</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </div>
      </form>
    </div>
  );
}
