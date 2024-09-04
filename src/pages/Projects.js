import React from 'react';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'Project One',
    description: 'Description of Project One.',
    link: 'https://example.com/project-one',
    repo: 'https://github.com/<your-username>/project-one',
  },
  {
    title: 'Project Two',
    description: 'Description of Project Two.',
    link: 'https://example.com/project-two',
    repo: 'https://github.com/<your-username>/project-two',
  },
  // Add more projects as needed
];

function Projects() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            link={project.link}
            repo={project.repo}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
