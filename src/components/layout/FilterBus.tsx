import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Bus } from "../../types";
import axios from "axios";
import { MapPin } from "lucide-react";
import { FilterBusCard } from "../home/FilterBusCard";
import { toast } from "react-toastify";
const FilterBus: React.FC = () => {
  const [cookies, , removeCookie] = useCookies(["busData"]);

  const { source, destination, type } = cookies.busData || {};

  const [searchResults, setSearchResults] = useState<Bus[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  function handleRemoveCookie() {
    removeCookie("busData", { path: "/" });
  }
  useEffect(() => {
    async function fetchFilterBusList() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/bus/filterbus",
          { params: { source, destination, type: type } },
        );
        setSearchResults(response.data.filterBus);
        if (source && destination) {
          setIsSearched(true);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    fetchFilterBusList();
  }, [destination, source, type]);

  return (
    <div>
      {isSearched && (
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Available Buses
                <p className="text-sm">
                  {source} → {destination}
                </p>
              </h2>
              <p
                className=" bg-blue-100 text-blue-700 rounded-full text-sm font-medium p-3 py-1 cursor-pointer"
                onClick={() => {
                  setIsSearched(false);
                  handleRemoveCookie();
                }}
              >
                Close <span>X</span>
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {searchResults.length} buses found
                </span>
                <FilterBusCard searchResults={searchResults} />
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No buses found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try searching for a different route or date
                </p>
                <button
                  onClick={() => setIsSearched(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Search Again
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default FilterBus;
