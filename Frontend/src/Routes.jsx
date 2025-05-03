import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // move your current homepage content here
import EventDetails from './EventDetails'; // a new component for event info

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/group-dance" element={<EventDetails title="Group Dance" />} />
        {/* add more as needed */}
      </Routes>
    </>
  );
}
