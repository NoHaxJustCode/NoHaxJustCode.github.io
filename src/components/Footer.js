import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub', 
    url: 'https://github.com/NoHaxJustCode',
    icon: <FiGithub className="w-5 h-5" />,
    color: 'hover:text-gray-800 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/avinash-paluri',
    icon: <FiLinkedin className="w-5 h-5" />,
    color: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  {
    name: 'Email',
    url: 'mailto:avinash.paluril@yahoo.com',
    icon: <FiMail className="w-5 h-5" />,
    color: 'hover:text-red-500 dark:hover:text-red-400',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/NoHaxJustCode',
    icon: <FiTwitter className="w-5 h-5" />,
    color: 'hover:text-blue-400 dark:hover:text-blue-300',
  },
  {
    name: 'Discord',
    url: 'https://discordapp.com/users/NoHaxJustCode',
    icon: <FaDiscord className="w-5 h-5" />,
    color: 'hover:text-indigo-500 dark:hover:text-indigo-400',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 dark:text-gray-400 hover:scale-110 transition-transform duration-300 ${link.color}`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.name}
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {currentYear} Avinash Paluri. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Built with React, Tailwind CSS, and ❤️
            </p>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
