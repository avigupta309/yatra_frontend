import { useState, useEffect } from "react";

export function DisplayDate() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleString("en-US", options));
    };

    updateDateTime(); // initial
    const interval = setInterval(updateDateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <input
        type="text"
        readOnly
        value={currentDateTime}
        className="w-full h-12 px-4 border rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white "
      />
    </div>
  );
}
