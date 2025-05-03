import React, { useState } from "react";

const soloEvents = ["Solo Dance", "Magic of Voice", "Doodle Art", "Mandala Art", "The Media Canvas", "Spandan Got Talent"];
const groupEvents = ["Group Dance", "Clash of Bands", "Street Play", "Movie Spoof", "Situational Antakshari", "Treasure Hunt", "Short Play", "Pirate Hunt"];

function EventDropdown() {
  const [eventType, setEventType] = useState("");
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleEventTypeChange = (e) => {
    const type = e.target.value;
    setEventType(type);
    setSelectedEvent("");

    if (type === "solo") {
      setEventList(soloEvents);
    } else if (type === "group") {
      setEventList(groupEvents);
    } else {
      setEventList([]);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Event Type:", eventType);
    console.log("Selected Event:", selectedEvent);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-white mt-10">
      {/* Event Type Dropdown */}
      <div>
        <label className="block mb-1">Choose Event Type:</label>
        <select
          className="w-full p-2 bg-black/80 border border-white/20 rounded"
          value={eventType}
          onChange={handleEventTypeChange}
        >
          <option value="">-- Select Type --</option>
          <option value="solo">Solo Events</option>
          <option value="group">Group Events</option>
        </select>
      </div>

      {/* Event Name Dropdown */}
      {eventList.length > 0 && (
        <div>
          <label className="block mb-1">Select Event:</label>
          <select
            className="w-full p-2 bg-black/80 border border-white/20 rounded"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">-- Select Event --</option>
            {eventList.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#ff7559] text-white py-3 rounded-md font-bold tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EventDropdown;
