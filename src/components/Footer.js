import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-700 text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:your.email@example.com">
            <FaEnvelope size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Avinash Paluri. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
