import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const allProjects = [
  {
    title: 'Portfolio Revamp',
    description: 'This very site: modern UI with React, Tailwind, and Framer Motion. Responsive, fast, accessible.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    repo: 'https://github.com/NoHaxJustCode/NoHaxJustCode.github.io',
    link: 'https://NoHaxJustCode.github.io/',
  },
  {
    title: 'Realtime Dashboard',
    description: 'Realtime metrics dashboard with websockets and server-sent events.',
    tags: ['TypeScript', 'React', 'Node.js'],
    repo: '#',
    link: '#',
  },
  {
    title: 'AI Notes Assistant',
    description: 'Intelligent note taking assistant with semantic search and tagging.',
    tags: ['Python', 'Vector DB', 'React'],
    repo: '#',
    link: '#',
  },
  {
    title: 'E-commerce Backend',
    description: 'Scalable REST APIs with authentication, carts, and orders.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    repo: '#',
    link: '#',
  },
];

const allTags = Array.from(new Set(allProjects.flatMap((p) => p.tags))).sort();

function Projects() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = useMemo(() => {
    if (activeTag === 'All') return allProjects;
    return allProjects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover a selection of my work. Each project is an opportunity to learn, build, and deliver value.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {['All', ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeTag === tag
                  ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent'
                  : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
