import React from "react";
import { X } from "lucide-react";

const Notification = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded-xl shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white animate-slideIn flex items-center justify-between space-x-4`}
  >
    <p className="font-overpass text-sm">{message}</p>
    <button onClick={onClose} className="hover:opacity-80 transition-opacity">
      <X size={16} />
    </button>
  </div>
);

export default Notification;
