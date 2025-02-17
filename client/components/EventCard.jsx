import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Share2 } from "lucide-react";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleBookClick = () => {
    const isLoggedIn = Boolean(localStorage.getItem("authToken"));

    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    navigate(`/select/${event._id}`, { state: { event } });
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-gray-900 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content Container */}
      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {event.profilepicture ? (
            <img
              src={event.profilepicture}
              alt={event.eventName}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              onError={(e) => {
                e.target.src = "/api/placeholder/400/320";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-[#EAB308]/50" />
            </div>
          )}

          {/* Spots Badge */}
          <div className="absolute top-4 right-4 bg-[#EAB308] text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.parkingSpots} spots</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6 bg-gray-900">
          {/* Title */}
          <h2 className="text-2xl font-bold text-white group-hover:text-[#EAB308] transition-all duration-300 line-clamp-2">
            {event.eventName || "Untitled Event"}
          </h2>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-[#EAB308]" />
              <span className="line-clamp-1 font-medium">{event.venue}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <Clock className="w-5 h-5 text-[#EAB308]" />
              <span className="font-medium">
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBookClick}
              className="flex-1 bg-[#EAB308] hover:bg-[#F59E0B] text-gray-900 font-bold py-3 px-6 rounded-xl transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50 active:scale-95"
            >
              Book Now
            </button>

            <button
              onClick={() => {
                /* Share functionality */
              }}
              className="p-3 bg-gray-800 text-[#EAB308] rounded-xl hover:bg-gray-700 transition-all duration-300 hover:text-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
