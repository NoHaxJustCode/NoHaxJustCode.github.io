import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';
import resumePDF from './AvinashPaluri_Resume.pdf';

const Resume = () => {
  // Default content (fallback if JSON not available)
  const [summary, setSummary] = useState(
    'Full-stack engineer specializing in building scalable web apps with React, Node.js, and cloud-native services. Passionate about developer experience, performance, and crafting elegant UI/UX.'
  );

  const [experience, setExperience] = useState([
    {
      role: 'Software Development Engineer Intern',
      company: 'Amazon Web Services (AWS)',
      location: 'Seattle, WA',
      period: 'May 2024 – Aug 2024',
      bullets: [
        'Built features for a distributed internal platform, reducing workflow latency by 25% via service-level optimizations.',
        'Designed and implemented REST APIs and Lambda-based workflows; improved reliability with robust observability.',
        'Collaborated with cross-functional teams to deliver secure, scalable solutions with clear documentation.',
      ],
    },
    {
      role: 'Software Development Engineer Intern',
      company: 'Amazon Web Services (AWS)',
      location: 'Seattle, WA',
      period: 'Jun 2023 – Aug 2023',
      bullets: [
        'Developed UI components in React and integrated with backend services to enable new customer-facing capabilities.',
        'Improved page performance and load times by leveraging code-splitting and caching strategies.',
        'Wrote unit and integration tests to ensure reliability and maintainability.',
      ],
    },
  ]);

  const [skills, setSkills] = useState([
    { name: 'JavaScript / TypeScript' },
    { name: 'React, Tailwind CSS, Framer Motion' },
    { name: 'Node.js, Express' },
    { name: 'Python' },
    { name: 'AWS, Docker' },
    { name: 'MongoDB, Postgres' },
  ]);

  const [education, setEducation] = useState([
    {
      school: 'Rutgers University – New Brunswick',
      degree: 'B.S. Computer Science, B.A. Data Science',
      period: '2021 – 2024',
      details: ['Graduated with strong focus on systems, data, and full-stack development.'],
    },
  ]);

  const [awards, setAwards] = useState([
    { title: 'Dean’s List (multiple semesters)' },
    { title: 'Hackathon finalist (selected events)' },
  ]);

  // Try loading parsed resume data if available
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/resume-data.json', { cache: 'no-store' });
        if (!res.ok) return; // no JSON present yet
        const data = await res.json();

        if (data.summary) setSummary(data.summary);

        // Heuristic mapping from extracted text to structured objects
        if (Array.isArray(data.skills) && data.skills.length) {
          setSkills(
            data.skills.map((s) => ({ name: typeof s === 'string' ? s : String(s) }))
          );
        }

        if (Array.isArray(data.education) && data.education.length) {
          // Merge lines belonging to same school heuristically is hard; keep as flat entries
          setEducation(
            data.education.map((line) => ({
              school: String(line),
              degree: '',
              period: '',
              details: [],
            }))
          );
        }

        if (Array.isArray(data.awards) && data.awards.length) {
          setAwards(data.awards.map((t) => ({ title: String(t) })));
        }

        if (Array.isArray(data.experience) && data.experience.length) {
          const mapped = data.experience.map((item) => {
            // Try to split a title like "Software Engineer at Company" or similar
            const title = item.title || '';
            let role = title;
            let company = '';
            const atIdx = title.toLowerCase().indexOf(' at ');
            if (atIdx > -1) {
              role = title.slice(0, atIdx).trim();
              company = title.slice(atIdx + 4).trim();
            }
            return {
              role,
              company,
              location: item.meta?.find?.((m) => /city|wa|usa|remote|ny|nj|ca|tx|seattle|new york|san/i.test(m)) || '',
              period: item.meta?.find?.((m) => /(\d{4}|\bjan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(m)) || '',
              bullets: Array.isArray(item.bullets) ? item.bullets : [],
            };
          });
          setExperience(mapped);
        }
      } catch (e) {
        // Silently ignore if file not found or JSON invalid
        console.warn('resume-data.json not loaded:', e);
      }
    };
    load();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {summary}
          </p>
          <div className="mt-6">
            <a
              href={resumePDF}
              download="Avinash_Paluri_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <FiDownload className="w-5 h-5" /> Download PDF
            </a>
          </div>
        </motion.div>

        {/* Experience */}
        <section className="mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <FiBriefcase className="w-6 h-6 text-primary" /> Experience
          </motion.h2>
          <div className="space-y-6">
            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.role} · <span className="text-primary">{item.company}</span>
                  </h3>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="inline-flex items-center gap-1"><FiMapPin /> {item.location}</span>
                    <span>{item.period}</span>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {item.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-gray-800 dark:text-gray-200">{s.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Education
          </motion.h2>
          <div className="space-y-6">
            {education.map((e, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {e.school}
                </h3>
                <p className="text-primary font-medium">{e.degree}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{e.period}</p>
                {e.details && (
                  <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300">
                    {e.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards / Certifications */}
        <section>
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <FiAward className="w-6 h-6 text-primary" /> Awards & Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((a, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-gray-800 dark:text-gray-200">{a.title}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
