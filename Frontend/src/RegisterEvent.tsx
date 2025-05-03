/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import eventData from "./eventData";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from './auth';

// Solo form structure
const soloFields = [
  { label: "Full Name", type: "text", name: "name" },
  { label: "PID", type: "text", name: "pid" },
];

function RegisterEvent() {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  const { eventName } = useParams();
  const event = eventData[eventName];

  const navigate = useNavigate();

  const pid = localStorage.getItem("Pid");
  const user = localStorage.getItem("user");


  console.log(eventName);

  if (!event) {
    return (
      <div className="text-white text-center mt-40">
        <h1 className="text-4xl font-bold">404 - Event Not Found</h1>
        <p className="mt-4">The event you're trying to register for doesn't exist.</p>
        <Link to="/" className="text-[#ff7559] underline mt-6 block">Go Back Home</Link>
      </div>
    );
  }

  const isGroup = event.type === "group";
  const minPIDs = isGroup ? event.minPIDs || 3 : 0;
  const maxPIDs = isGroup ? event.maxPIDs || 6 : 0;

  const [formData, setFormData] = useState({
    ...(isGroup ? { name: "", college: "" } : { name: user, pid: pid }),
  });

  const [pids, setPids] = useState(isGroup ? Array(minPIDs).fill("") : []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePidChange = (index:any, value:any) => {
    const updatedPIDs = [...pids];
    updatedPIDs[index] = value;
    setPids(updatedPIDs);
  };

  const addMorePid = () => {
    if (pids.length < maxPIDs) {
      setPids((prev) => [...prev, ""]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removePid = (index:any) => {
    setPids((prev) => prev.filter((_, i) => i !== index));
  };



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



  const submit = () => {
    navigate("/signup");
  }



  const handleSubmit = async (e:any) => {



    e.preventDefault();
    const submissionData = isGroup
      ? { ...formData, pids, eventName }
      : { ...formData, eventName };

    console.log(submissionData);


    if (eventName === "solo-dance" || eventName === "magic-of-voice" ||
      eventName === "doodle-art" || eventName === "media-canvas" || eventName === "mandala-art" ||
      eventName === "spandan-got-talent") {
      try {


        const id = localStorage.getItem("eventID");



        const res = await axios.post(`http://localhost:3000/api/v2/solo/participate/${id}`,
          submissionData, { withCredentials: true });


        console.log(res);

        localStorage.removeItem("eventID");


        toast(res.data.message, {
          type: "success",
          position: "top-center",
          theme: "light",
          autoClose: 4000
        });

        navigate("/events");
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
    else {

      try {

        const id = localStorage.getItem("gEventID");

        const res = await axios.post(`http://localhost:3000/api/v2/group/participate/${id}`,
          submissionData, { withCredentials: true });


        console.log(res);

        localStorage.removeItem("eventID");


        toast(res.data.message, {
          type: "success",
          position: "top-center",
          theme: "light",
          autoClose: 4000
        });

        navigate("/events");
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


  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-3xl font-serif text-white font-bold tracking-wider">SPANDAN'25</h1>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Home</Link>
              <a href="/" className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Theme</a>
              <a href="/events" className="text-[#ff7559] hover:text-white font-bold tracking-widest text-sm uppercase hover:scale-110 transition-transform">Events</a>
              {/*<button className="bg-[#a22a40] text-white px-6 py-2 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#E2725B] transition-all hover:scale-110 transform">
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
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 max-w-8xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
        {/* Left Section */}
        <div>
          <div className="flex items-center mb-6">
            <img src={event.image} alt={event.title} className="w-64 h-80 object-contain" />
            <h2 className="text-6xl font-bold font-serif text-[#ff7559] ml-8 -mt-48">{event.title}</h2>
          </div>
          <div className="text-white/80 leading-relaxed whitespace-pre-line ml-4">{event.description}</div>
        </div>

        {/* Right Section: Form */}
        {isLoggedIn && (<>
          <div className="bg-white/10 p-8 rounded-xl shadow-lg ml-32 mr-20">
            <h3 className="text-2xl text-[#ff7559] font-bold mb-6">Register Now</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isGroup ? (
                <>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Team Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md bg-black/50 text-white border border-white/20"
                      required
                    />
                  </div>
                  {/*<div>
                  <label className="block text-sm text-white/70 mb-1">College Name</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-black/50 text-white border border-white/20"
                    required
                  />
                </div>*/}

                  {pids.map((pid, index) => (
                    <div key={index}>
                      <label className="block text-sm text-white/70 mb-1">PID {index + 1}</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name={`pid${index + 1}`}
                          value={pid}
                          onChange={(e) => handlePidChange(index, e.target.value)}
                          className="w-full px-4 py-2 rounded-md bg-black/50 text-white border border-white/20"
                          required
                        />
                        {index >= minPIDs && (
                          <button
                            type="button"
                            onClick={() => removePid(index)}
                            className="text-red-400 hover:text-red-200 text-sm"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}


                  {pids.length < maxPIDs && (
                    <button
                      type="button"
                      onClick={addMorePid}
                      className="w-full mt-2 text-sm text-[#ff7559] underline hover:text-white transition-all"
                    >
                      + Add More PID
                    </button>
                  )}
                </>
              ) : (
                soloFields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm text-white/70 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md bg-black/50 text-white border border-white/20"
                      required
                    />
                  </div>
                ))
              )}

              <button
                type="submit"
                className="w-full bg-[#ff7559] text-white py-3 rounded-md font-bold tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </>)}
      </div>
    </div>
  );
}

export default RegisterEvent;
