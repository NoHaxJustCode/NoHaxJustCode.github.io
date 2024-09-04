import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-gray-800 dark:bg-gray-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold">
          Avinash Paluri
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/resume" className="hover:underline">Resume</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
