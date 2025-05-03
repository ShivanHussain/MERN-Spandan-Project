import React from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';
import CursorTrail from './CursorTrail';
import './App.css'
import { ChevronRight, X } from 'lucide-react';
import axios from 'axios';
import { authActions } from './auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Events() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //console.log(isLoggedIn);



  const submit1 = () => {
    /* Solo Dance */

    //localStorage.setItem("eventID", "67f9eee62d424284974a169d");   //local database id

    localStorage.setItem("eventID","67fc7ca5a55cc9ff50fea642")     //Atlas database

}

const submit2 = () => {
    /* Magic of Voice */

    //localStorage.setItem("eventID", "67f9ef90677e46ea8d8a3721");   //local database id

    localStorage.setItem("eventID","67fc7d13a55cc9ff50fea645")   //Atlas database

}

const submit3 = () => {
    /*The Meida Canvas*/

    //localStorage.setItem("eventID", "67fa7d2b9d9dfd2151829d52");   //local database id

    localStorage.setItem("eventID","67fc7ff6a55cc9ff50fea64b")   //Atlas database

}

const submit4 = () => {
    /*Spandan Got Talent */

    //localStorage.setItem("eventID", "67fa7d849d9dfd2151829d54");   //local database id

    localStorage.setItem("eventID","67fc8051a55cc9ff50fea64e")   //Atlas databaseentID

}

const submit5 = () => {
    /*Mandala Art*/

    //localStorage.setItem("eventID", "67fa7db39d9dfd2151829d56");   //local database id

    localStorage.setItem("eventID","67fc8096a55cc9ff50fea651")   //Atlas databaseentID

}

const submit6 = () => {
    /*Doodle Art*/

    //localStorage.setItem("eventID", "67fa7dea9d9dfd2151829d58");   //local database id

    localStorage.setItem("eventID","67fc80e7a55cc9ff50fea654")  //Atlas database
}

const submit7 = () => {
  /* Group Dance */
  //localStorage.setItem("gEventID", "67fa7e339d9dfd2151829d5a");   //local database id

  localStorage.setItem("gEventID","67fc86499d2c73eb93be8a58")   //Atlas database
}

const submit8 = () => {
  /* Clash of Bands */
  //localStorage.setItem("gEventID", "67fa7e6c9d9dfd2151829d5c");   //local database id

  localStorage.setItem("gEventID","67fc86929d2c73eb93be8a5b")   //Atlas database
}

const submit9 = () => {
  /* Street Play */
  //localStorage.setItem("gEventID", "67fa3ca39d9dfd2151829d2b");   //local database id

  localStorage.setItem("gEventID","67fc7f79a55cc9ff50fea648")   //Atlas database
}

const submit10 = () => {
  /* Movie Spoof */
  //localStorage.setItem("gEventID", "67fa3c029d9dfd2151829d29");   //local database id

  localStorage.setItem("gEventID","67fe8b95c272aa39f3e96e40")    //Atlas database
}

const submit11= () => {
  /* Treasure Hunt */
  //localStorage.setItem("gEventID", "67fa7eb49d9dfd2151829d5e");   //local database id

  localStorage.setItem("gEventID","67fc86f39d2c73eb93be8a5e")    //Atlas database
}

const submit12= () => {
  /* Short Play */
  //localStorage.setItem("gEventID", "67fa7f209d9dfd2151829d60");   //local database id

  localStorage.setItem("gEventID","67fc877d9d2c73eb93be8a62")   //Atlas database
}

const submit13= () => {
  /* Pirates Hunt */
  //localStorage.setItem("gEventID","67fa7f559d9dfd2151829d62");   //local database id

  localStorage.setItem("gEventID","67fc7bf2a55cc9ff50fea63f")  //Atlas database
}

const submit14= () => {
  /*Antakshari */
  //localStorage.setItem("gEventID", "67fc95fab151b7d4b142f148");   //local database id

  localStorage.setItem("gEventID","67fe8cd4c272aa39f3e96e41")   //Atlas database
}


  const submit = () => {
    navigate("/signup");
  }

  const submitlogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v2/user/logout",
        {},
        { withCredentials: true });

      console.log(res);


      dispatch(authActions.logout());
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("Pid");
      localStorage.removeItem("gEventID");
      localStorage.removeItem("pid1");
      localStorage.removeItem("teamName");
      localStorage.removeItem("_id");
      localStorage.removeItem("user");

      toast(res.data.message, {
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 4000
      });

      navigate("/");


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast(err.response.data.message, {
        type: "error",
        position: "top-center",
        theme: "light",
        autoClose: 4000
      });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      
      
      
      <CursorTrail />
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-serif text-white font-bold tracking-wider transform hover:scale-105 transition-transform cursor-pointer">SPANDAN'25</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to='/' className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Home</Link>
              <a href="#theme" className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Theme</a>
              <a href="#events" className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Events</a>
              {/* <a href="#contact" className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Contact</a> */}
              {/*<button onClick={submit} className="bg-[#a22a40] text-white px-6 py-2 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#E2725B] transition-all hover:scale-110 transform">
  Register Now
</button>*/}
              {!isLoggedIn ? (
                <div className="">
                  <button onClick={submit} className="bg-[#a22a40] text-white px-6 py-2 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#E2725B] transition-all hover:scale-110 transform">
  Register Now
</button>
                </div>
              ) : (
                <div>
                  <button onClick={submitlogout} className="bg-[#a22a40] text-white px-6 py-2 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#E2725B] transition-all hover:scale-110 transform">
  Logout
</button>
                </div>
              )}

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#ff7559] hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <ChevronRight size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg- bg-black flex flex-col items-center justify-center space-y-8 px-8 ">
          {/* Close Button */}
          <button
          
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            <X size={32} />
          </button>

          {/* Menu Items */}
          <a href="#theme" className="text-white text-3xl font-bold uppercase tracking-wider hover:scale-110 transition-transform transform">
            Theme
          </a>
          <a href="#events" className="text-white text-3xl font-bold uppercase tracking-wider hover:scale-110 transition-transform transform">
            Events
          </a>
          <a href="#contact" className="text-white text-3xl font-bold uppercase tracking-wider hover:scale-110 transition-transform transform">
            Contact
          </a>
          {!isLoggedIn ? (
                <div className="">
                  <button onClick={submit} className="bg-[#a22a40] text-white px-6 py-2 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#E2725B] transition-all hover:scale-110 transform">
  Register Now
</button>
                </div>
              ) : (
                <div>
                  <button onClick={submitlogout} className="bg-[#a22a40] text-white px-6 py-2 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#E2725B] transition-all hover:scale-110 transform">
  Logout
</button>
                </div>
              )}
        </div>
      )}









      {/* Page Content */}
      <div className="pt-28 px-4 max-w-6xl mx-auto">
        {/* Graphic */}
        <div className="flex justify-center mb-8">
          <img src="/src/assets/events.png" alt="Events Graphic" className="w-44 h-44 object-contain" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-7xl md:text-7xl font-bold text-[#ff7559] mb-4 font-poppins">Competitions</h2>

        {/* Solo Events */}
        <h3 className="text-3xl font-semibold mt-16 mb-6 text-white">Solo Events</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">


          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/solo-dance' onClick={submit1}><img src="/src/assets/event/2.png" alt="Solo Event 1" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/magic-of-voice' onClick={submit2}><img src="/src/assets/event/4.png" alt="Solo Event 2" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/media-canvas' onClick={submit3}><img src="/src/assets/event/9.png" alt="Solo Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/mandala-art' onClick={submit5}><img src="/src/assets/event/13.png" alt="Solo Event 4" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/doodle-art' onClick={submit6}><img src="/src/assets/event/14.png" alt="Solo Event 5" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/spandan-got-talent' onClick={submit4}><img src="/src/assets/event/12.png" alt="Solo Event 6" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
        </div>

        {/* Group Events */}
        <h3 className="text-3xl font-semibold mt-20 mb-6 text-white">Group Events</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/group-dance' onClick={submit7}><img src="/src/assets/event/3.png" alt="Group Event 1" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/clash-of-bands' onClick={submit8}><img src="/src/assets/event/5.png" alt="Group Event 2" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/street-play' onClick={submit9}><img src="/src/assets/event/6.png" alt="Group Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/movie-spoof' onClick={submit10}><img src="/src/assets/event/7.png" alt="Group Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/antakshari' onClick={submit14}><img src="/src/assets/event/8.png" alt="Group Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/treasure-hunt' onClick={submit11}><img src="/src/assets/event/10.png" alt="Group Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/short-play' onClick={submit12}><img src="/src/assets/event/11.png" alt="Group Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:scale-105 transition">
            <Link to='/register/pirates-hunt' onClick={submit13}><img src="/src/assets/event/1.png" alt="Group Event 3" className="w-full h-29rem object-cover rounded" /></Link>
            <p className="mt-2 text-center text-[#ff7559] font-bold"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
