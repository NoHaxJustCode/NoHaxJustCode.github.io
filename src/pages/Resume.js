import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';
import resumePDF from './AvinashPaluri_Resume.pdf';

const Resume = () => {
  // Default content (fallback if JSON not available)
  const [summary, setSummary] = useState(
    'Software Engineer at Amazon Web Services (AWS). I build performant, scalable systems and intuitive product experiences across the stack. Passionate about developer experience, cloud-native architecture, and shipping delightful interfaces.'
  );

  const [experience, setExperience] = useState([
    {
      role: 'Software Development Engineer',
      company: 'Amazon Web Services (AWS)',
      location: 'Seattle, WA',
      period: 'Feb 2025 – Present',
      bullets: [
        'Reduced infrastructure costs by 20% by migrating simulation workloads from ECS to a serverless architecture leveraging AWS Lambda and EC2.',
        'Integrated generative AI with Bedrock, SageMaker, and Anthropic models to enable text-driven simulation creation, increasing customer adoption by 30%.',
        'Delivered a production-ready Simulation Console that empowers customers to build and manage simulations through a no-code interface.',
      ],
    },
    {
      role: 'Software Engineer Intern',
      company: 'Amazon Web Services (AWS)',
      location: 'Seattle, WA',
      period: 'May 2024 – Aug 2024',
      bullets: [
        'Developed a website using React, JavaScript, and AWS Cloudscape to enable customers to create and execute custom simulations for their AWS bills.',
        'Integrated REST APIs with AWS S3 and DynamoDB, streamlining data operations and enhancing simulation functionality.',
        'Collaborated with customers and PMs to deliver a solution that significantly improved usability.',
      ],
    },
    {
      role: 'Software Engineer Intern',
      company: 'Amazon Web Services (AWS)',
      location: 'Seattle, WA',
      period: 'Jun 2023 – Aug 2023',
      bullets: [
        'Engineered a REST API using Java, Smithy, AWS Lambda, API Gateway, and S3, boosting bill computation efficiency by 50%.',
        'Automated 85% of regression testing by developing a Validation class in Java, reducing manual QA workload.',
        'Implemented an extensible validator to reduce processing time by 60% while maintaining high-quality standards.',
      ],
    },
  ]);

  const [skills, setSkills] = useState([
    { name: 'Java, Python, C/C++, SQL' },
    { name: 'JavaScript, TypeScript, HTML/CSS, R, Go, Swift, Kotlin' },
    { name: 'React, Node.js, Flask, JUnit, Spring Boot, Material-UI, SwiftUI, GSAP, Framer Motion, Unity' },
    { name: 'AWS, GCP, Azure, Docker, Kubernetes, Jenkins, Terraform, GitHub Pages' },
    { name: 'PyTorch, TensorFlow, Keras, scikit-learn, Pandas, NumPy, Matplotlib, Jupyter' },
    { name: 'Android Studio, Roblox Studio, ARKit, Firebase, DynamoDB, S3' },
  ]);

  const [education, setEducation] = useState([
    {
      school: 'Georgia Institute of Technology',
      degree: 'Master of Science in Computer Science',
      period: 'Spring 2026',
      details: [],
    },
    {
      school: 'Rutgers University – New Brunswick',
      degree: 'Bachelor of Science in Computer Science, Bachelor of Arts in Data Science',
      period: 'Sept 2021 – Jan 2025',
      details: [],
    },
  ]);

  const [awards, setAwards] = useState([]);

  // Projects (from resume) – displayed as a section in this page
  const [resumeProjects] = useState([
    {
      title: 'Barcode Scanner App',
      tech: 'Swift, SwiftUI, AVFoundation, UPCItemDB API',
      period: 'Sep 2024 – Present',
      bullets: [
        'iOS app to scan barcodes, fetch product details via UPCItemDB, and display pricing and offers.',
        'SwiftUI-based interface with real-time scanning feedback and product details view.',
        'Implemented pagination for product offers and AVFoundation for high-performance scanning.',
      ],
    },
    {
      title: 'AI-Driven AR Tower Defense Game',
      tech: 'Unity, C#, AR Foundation, Machine Learning',
      period: 'Aug 2024 – Present',
      bullets: [
        'AR tower defense game; players place towers to defend resources against waves of enemies.',
        'Integrated ML for difficulty prediction; dynamically adjusted spawns to match player skill with ~85% accuracy.',
        'Applied CV to detect and align real-world surfaces, improving AR placement accuracy by ~40%.',
      ],
    },
    {
      title: 'Minesweeper AI',
      tech: 'Python, PyTorch, scikit-learn',
      period: 'Jan 2024 – Apr 2024',
      bullets: [
        'CNN that achieved ~95% accuracy in predicting mine locations.',
        'Optimized training pipeline using scikit-learn and TensorDataset for efficiency.',
      ],
    },
    {
      title: 'Dagger Dash (Blade Ball Clone)',
      tech: 'Roblox Studio, Lua',
      period: 'Aug 2025 – Present',
      bullets: [
        'Developing a full-featured Roblox game clone with Lua scripts, UI, monetization, and analytics.',
        'Implemented core mechanics, asset management, and player progression systems.',
      ],
    },
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

        {/* Projects */}
        <section className="mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Projects
          </motion.h2>
          <div className="space-y-6">
            {resumeProjects.map((p, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{p.title}</h3>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{p.period}</div>
                </div>
                <p className="text-primary font-medium mb-2">{p.tech}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
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
