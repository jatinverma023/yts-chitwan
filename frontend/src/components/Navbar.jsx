import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import ytsLogo from "../assets/yts-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // REMOVED ADMIN LINK - Only public pages
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Interactive Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={ytsLogo}
                alt="YTS Chitwan"
                className="h-10 w-10 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="flex flex-col">
              <motion.span
                className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                YTS Chitwan
              </motion.span>
              <motion.span
                className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                whileHover={{ x: 4 }}
                transition={{ delay: 0.1 }}
              >
                Youth Thinkers' Society
              </motion.span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                className="relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 py-2 px-1"
                >
                  {link.name}
                </Link>
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    layoutId="navbar-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center py-2 font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Dark Mode Button */}
            <motion.button
              onClick={toggleDarkMode}
              className="flex items-center w-full text-left py-2 mt-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? (
                <>
                  <Sun size={16} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2" />
                  Dark Mode
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
