import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [MenuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white text-lg font-semibold">
            SoccerSleuth
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              className="text-white focus:outline-none hover:text-gray-300 focus:text-gray-300"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link
              to="/players"
              className="text-white block hover:text-gray-300"
            >
              Players
            </Link>
            <Link to="/games" className="text-white block hover:text-gray-300">
              Games
            </Link>
            <Link to="/tables/selection" className="text-white block hover:text-gray-300">
              Tables
            </Link>
            <Link to="about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link to="contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
            <Link to="/players/count_by_club" className="text-white hover:text-gray-300">
              Count by Club
            </Link>
            <Link to="/games/selection-query" className="text-white hover:text-gray-300">
              Selection
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${MenuOpen ? "" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-white block hover:text-gray-300">
            Home
          </Link>
          <Link to="/players" className="text-white block hover:text-gray-300">
            Players
          </Link>
          <Link to="/games" className="text-white block hover:text-gray-300">
            Games
          </Link>
          <Link to="/about" className="text-white block hover:text-gray-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
