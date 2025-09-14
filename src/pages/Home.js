import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb } from 'react-icons/si';

const projects = [
  {
    title: 'Project One',
    description: 'A modern web application built with React and Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Project Two',
    description: 'A responsive dashboard with real-time data visualization',
    tags: ['TypeScript', 'D3.js', 'Express'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Project Three',
    description: 'An AI-powered application using Python and TensorFlow',
    tags: ['Python', 'TensorFlow', 'Flask'],
    github: '#',
    demo: '#',
  },
];

const skills = [
  { name: 'React', icon: <FaReact className="w-8 h-8 text-blue-500" /> },
  { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 text-blue-600" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-8 h-8 text-green-500" /> },
  { name: 'Python', icon: <FaPython className="w-8 h-8 text-yellow-500" /> },
  { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 text-green-600" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8 text-cyan-400" /> },
];

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    // Animate elements in sequence when component mounts
    const sequence = async () => {
      await controls.start('visible');
      // Additional animations can be chained here
    };
    sequence();
  }, [controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="pt-28 md:pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <motion.div 
              className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Avinash</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
                Full Stack Developer & Tech Enthusiast
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                I build exceptional digital experiences with modern web technologies. 
                Currently focused on creating accessible, human-centered products.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start space-x-4">
                <motion.a
                  href="/contact"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="/projects"
                  className="px-8 py-3 border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light rounded-lg font-medium hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <FiCode className="w-20 h-20 mx-auto text-primary dark:text-primary-light mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">NoHaxJustCode</h3>
                    <p className="text-gray-600 dark:text-gray-300">Crafting Digital Experiences</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={container}
            initial="hidden"
            animate={controls}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={item}
                whileHover={{ y: -5 }}
              >
                {skill.icon}
                <span className="mt-3 font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <FiCode className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
                      aria-label="View on GitHub"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
                      aria-label="View Live Demo"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a 
              href="/projects" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              View All Projects
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Have a project in mind?</h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
              I'm currently available for freelance work. Let's build something amazing together!
            </p>
            <motion.a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
