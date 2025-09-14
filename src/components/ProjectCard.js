import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

function ProjectCard({
  title,
  description,
  tags = [],
  link,
  repo,
  image,
  delay = 0,
}) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="h-44 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <FiCode className="w-12 h-12 text-gray-400" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-700 dark:text-gray-300">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-4">
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
              aria-label="GitHub Repository"
            >
              <FiGithub className="w-5 h-5" />
              <span className="text-sm">Code</span>
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
              aria-label="Live Demo"
            >
              <FiExternalLink className="w-5 h-5" />
              <span className="text-sm">Live</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
