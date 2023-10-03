import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-6 absolute w-full mt-32">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">SoccerSleuth</h2>
          <p className="text-sm">
            Welcome to SoccerSleuth, the new face of scouting 
          </p>
        </div>
        <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-sm">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-gray-300">
                  Players
                </Link>
              </li>
              <li>
                <Link to="/gamess" className="hover:text-gray-300">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SoccerSleuth. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
