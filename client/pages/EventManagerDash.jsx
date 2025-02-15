
import React, { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  Car,
  Trash2,
  ParkingMeter,
} from "lucide-react";
import Notification from "./Notification";
import EventForm from "./EventForm";
import ParkingSpotForm from "./ParkingSpotForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const EventManagerDash = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showParkingSpotForm, setShowParkingSpotForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    venue: "",
    parkingSpots: 0,
    profilepicture: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const userToken = localStorage.getItem("userToken"); // Replace with the correct token retrieval method

    if (!userToken) {
      // If the token is not found, redirect to login page
      navigate("/auth/login");
    } else {
      fetchEvents();
    }
  }, [navigate]); // Ensure this effect runs only once on mount

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/getallevents");
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        parkingSpots: Number(formData.parkingSpots),
      };

      const response = await fetch("http://localhost:8000/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          title: "Success!",
          text: "Event created successfully!",
          icon: "success",
          background: "#1a1a1a",
          color: "#ffd700",
          confirmButtonColor: "#ffd700",
          confirmButtonText: "Great!",
        });
        setShowEventForm(false);
        setFormData({
          eventName: "",
          eventDate: "",
          venue: "",
          parkingSpots: 0,
        });
        fetchEvents();
      } else {
        showNotification(data.message || "Failed to create event", "error");
      }
    } catch (error) {
      showNotification("Error creating event", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddParkingSpots = (eventId) => {
    setSelectedEventId(eventId);
    setShowParkingSpotForm(true);
  };

  const handleParkingSpotSubmit = async (newParkingSpot) => {
    try {
      await Swal.fire({
        title: "Success!",
        text: "Parking spots added successfully!",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffd700",
        confirmButtonColor: "#ffd700",
        confirmButtonText: "Great!",
      });
      fetchEvents();
    } catch (error) {
      showNotification("Error adding parking spots", "error");
    }
  };

  const handleDeleteEvent = async (eventId, eventName) => {
    try {
      const willDelete = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete "${eventName}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        background: "#1a1a1a",
        color: "#ffd700",
        confirmButtonColor: "#ffd700",
        cancelButtonColor: "#333",
      });

      if (willDelete.isConfirmed) {
        const response = await fetch(`http://localhost:8000/${eventId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== eventId)
          );

          await Swal.fire({
            title: "Deleted!",
            text: "Event has been deleted successfully",
            icon: "success",
            background: "#1a1a1a",
            color: "#ffd700",
            confirmButtonColor: "#ffd700",
            timer: 2000,
            timerProgressBar: true,
          });
        } else {
          throw new Error("Failed to delete event");
        }
      }
    } catch (error) {
      console.error("Error in delete operation:", error);
      await Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffd700",
        confirmButtonColor: "#ffd700",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 border-b border-yellow-400 pb-4">
          Event Manager Dashboard
        </h1>

        <button
          onClick={() => setShowEventForm(true)}
          className="flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 font-semibold shadow-lg hover:shadow-yellow-400/20"
        >
          <Plus size={20} />
          <span>Create New Event</span>
        </button>

        {showEventForm && (
          <EventForm
            formData={formData}
            setFormData={setFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onSubmit={handleEventSubmit}
            loading={loading}
          />
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              <div className="text-yellow-400 mb-4 text-6xl">🎪</div>
              <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
              <p>Create your first event to get started!</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-200 shadow-lg hover:shadow-yellow-400/10"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  {event.eventName}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Calendar size={18} className="text-yellow-400 mr-2" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={18} className="text-yellow-400 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Car size={18} className="text-yellow-400 mr-2" />
                    <span>{event.parkingSpots} parking spots</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => handleAddParkingSpots(event._id)}
                    className="w-full flex items-center justify-center space-x-2 bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400/20 transition-colors duration-200 border border-yellow-400/20 hover:border-yellow-400/40"
                  >
                    <ParkingMeter size={16} />
                    <span>Add Parking</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteEvent(event._id, event.eventName)
                    }
                    className="w-full flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-200 border border-red-500/20 hover:border-red-500/40"
                  >
                    <Trash2 size={16} />
                    <span>Delete Event</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {showParkingSpotForm && (
          <ParkingSpotForm
            eventId={selectedEventId}
            onSubmit={handleParkingSpotSubmit}
            onClose={() => setShowParkingSpotForm(false)}
          />
        )}

        {notification.show && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </div>
  );
};

export default EventManagerDash;
