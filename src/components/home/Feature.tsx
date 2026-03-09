import { Star, Wifi, Zap } from "lucide-react";
import React from "react";

const Feature: React.FC = () => {
  return (
    <div>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SmartBus?
            </h2>
            <p className="text-lg text-gray-600">
              Experience comfort and convenience like never before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:scale-105 transition-transform bg-white shadow rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Travel in luxury with our premium AC buses equipped with the
                latest amenities
              </p>
            </div>

            <div className="text-center p-6 hover:scale-105 transition-transform bg-white shadow rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Modern Amenities
              </h3>
              <p className="text-gray-600">
                Enjoy Wi-Fi, charging points, entertainment systems, and
                comfortable seating
              </p>
            </div>

            <div className="text-center p-6 hover:scale-105 transition-transform bg-white shadow rounded-xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quick Booking
              </h3>
              <p className="text-gray-600">
                Book your tickets in just a few clicks with our intuitive
                booking system
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
