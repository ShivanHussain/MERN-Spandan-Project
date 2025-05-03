import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';


function ContactFooter() {
  return (
    <footer className="bg-black/90 text-white py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#ff7559] mb-4">Contact Us</h2>
          <p className="text-white/80">📍 Shri Ram Murti Smarak College of Engineering, Technology and Research, Bareilly</p>
          <p className="text-white/80 mt-1">✉️ cetr@srms.ac.in</p>
          <p className="text-white/80 mt-1">📞 +91-581-2582701, 2582702, 2582703, 2582704</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-[#ff7559] mb-4">Quick Links</h2>
          <ul className="space-y-2 text-white/80">
            <li><a href="/" className="hover:text-[#ff7559] transition">Home</a></li>
            <li><a href="#events" className="hover:text-[#ff7559] transition">Events</a></li>
            <li><a href="#theme" className="hover:text-[#ff7559] transition">Theme</a></li>
            {/* <li><a href="/register/group-dance" className="hover:text-[#ff7559] transition">Register</a></li> */}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-2xl font-bold text-[#ff7559] mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/srmstrust/" className="hover:text-[#ff7559] text-white/80 text-xl"><i className="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/SRMSCETRBLY" className="hover:text-[#ff7559] text-white/80 text-xl"><i className="fab fa-facebook"></i></a>
            <a href="https://www.youtube.com/channel/UCvrVqixPOd3mnetEGBlMhzA" className="hover:text-[#ff7559] text-white/80 text-xl"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-white/50 text-sm border-t border-white/10 pt-4">
        © {new Date().getFullYear()} SPANDAN'25. All Rights Reserved.
      </div>
    </footer>
  );
}

export default ContactFooter;
