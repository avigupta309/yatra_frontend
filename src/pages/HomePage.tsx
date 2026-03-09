import { SearchForm } from "../components/home/SearchForm";
import { BusCard } from "../components/home/BusCard";
import Feature from "../components/home/Feature";
import FilterBus from "../components/layout/FilterBus";
import { useState } from "react";

export function HomePage() {
  const [viewMore, setViewMore] = useState<number>(5);
  const [stopView, setStopView] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Book Your Perfect
              <span className="text-blue-600 block">Bus Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Travel comfortably with our premium bus services. Choose from AC
              and Non-AC buses with the best amenities.
            </p>
          </div>

          <div className="mb-16">
            {/* <SearchForm onSearch={handleSearch} /> */}
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Search Results */}
      <FilterBus />
      {/* Featured Buses Section */}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Bus Routes
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most popular routes and premium bus services
            </p>
          </div>

          <div className="space-y-6">
            <BusCard viewMore={viewMore} setStopView={setStopView} />
          </div>

          <div className="text-center mt-8">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition border-2
    ${
      stopView
        ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
    }`}
              onClick={() => setViewMore((prev) => prev + 5)}
            >
              {stopView ? "View More" : "You Reached The Bottom"}
            </button>
          </div>
        </div>
      </section>
      {/* Features Section */}

      <Feature />
    </div>
  );
}
