import React from "react";
import { BusFront, CheckCircle2, Laptop, Heart, Code2 } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-100 text-gray-800 px-6 py-12">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-12 animate-fade-in">
        <div className="flex justify-center mb-4">
          <BusFront size={48} className="text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Welcome to SmartBus Booking System
        </h1>
        <p className="text-gray-600 text-lg">
          Seamless, secure, and smart — your travel experience, redefined.
        </p>
      </div>

      {/* About Description */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-lg leading-relaxed text-gray-700">
          Our SmartBus Booking System allows users to browse and book buses
          effortlessly. Whether you prefer{" "}
          <span className="font-semibold text-blue-600">AC</span> or{" "}
          <span className="font-semibold text-sky-600">Non-AC</span> buses, we
          bring the convenience of real-time seat selection, easy payment
          verification, and a smooth booking flow — all from one unified
          platform.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
        {/* Feature 1 */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 text-center">
          <CheckCircle2 size={36} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Smart Seat Selection
          </h3>
          <p className="text-gray-600 text-sm">
            Choose your desired seat (like 1A, 2B, 4D, etc.) in real-time,
            view availability, and confirm instantly.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 text-center">
          <Laptop size={36} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Smooth Booking Experience
          </h3>
          <p className="text-gray-600 text-sm">
            Clean UI with responsive design, easy navigation, and secure data
            handling for the best booking experience.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 text-center">
          <Heart size={36} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            User-Centered Design
          </h3>
          <p className="text-gray-600 text-sm">
            We care about simplicity and clarity. Every part of the system is
            designed for a seamless user journey.
          </p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8">
          <div className="flex flex-col items-center">
            <Code2 size={40} className="text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Developed by
            </h2>
            <p className="text-blue-700 font-semibold text-lg">Avinash Gupta</p>
            <p className="text-gray-600 text-sm mt-1">
              Full Stack Developer | MERN Stack Enthusiast | Passionate about
              Clean UI
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/avigupta309"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/avinash-gupta-9b35b6313/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16">
        © {new Date().getFullYear()} SmartBus Booking System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
