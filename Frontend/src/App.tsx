import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import Events from './EventsPage';
import RegisterEvent from './RegisterEvent';
import ScrollToTop from './ScrollToTop'; // ✅ import the scroll helper
import Signup from './Signup';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './auth';
import Footer from './ContactFooter';
import SoloEventDashboard from "./SoloEventDashboard";


function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
  if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("Pid")
    ){
      dispatch(authActions.login());
      
    }
  },[dispatch])
  return (
    <>
      <ScrollToTop/> {/* ✅ this ensures scroll resets on route change */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register/:eventName" element={<RegisterEvent />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/shikharshreyshivanraj/solo-events" element={<SoloEventDashboard />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
