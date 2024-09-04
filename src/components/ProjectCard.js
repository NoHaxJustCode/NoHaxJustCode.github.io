import React from 'react';

function ProjectCard({ title, description, link, repo }) {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex space-x-4">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Live Demo
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub Repo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
