import React from "react";
import {
  CarFront,
  Calendar,
  Map,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const EventForm = ({
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
  onSubmit,
  loading,
}) => {
  const steps = [
    {
      title: "Event Details",
      subtitle: "Let's start with the basics",
      icon: <Map size={20} />,
    },
    {
      title: "Venue & Date",
      subtitle: "When and where?",
      icon: <Calendar size={20} />,
    },
    {
      title: "Parking Details",
      subtitle: "Set up your parking arrangement",
      icon: <CarFront size={20} />,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "parkingSpots" ? Number(value) : value, // Convert parkingSpots to number
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          {steps[currentStep - 1].title}
        </h2>
        <div className="flex items-center space-x-2 text-gray-400">
          {steps[currentStep - 1].icon}
          <span className="text-sm">{steps[currentStep - 1].subtitle}</span>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter venue"
            />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Parking Spots</label>
            <input
              type="number"
              name="parkingSpots"
              value={formData.parkingSpots}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of parking spots"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          className="flex items-center space-x-2 text-gray-400 hover:text-white"
        >
          <ChevronLeft size={16} />
          <span className="text-sm">Back</span>
        </button>
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <span className="text-sm">Next</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <span className="text-sm">
              {loading ? "Submitting..." : "Submit"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
