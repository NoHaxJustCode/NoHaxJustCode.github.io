import React from 'react';

function Resume() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Resume</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold">Experience</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Job Title</strong> at <em>Company Name</em> (Year - Year)
            </li>
            {/* Add more experiences */}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Education</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Degree</strong> in <em>Field of Study</em> from <em>University Name</em> (Year - Year)
            </li>
            {/* Add more education */}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Skills</h3>
          <ul className="list-disc list-inside">
            <li>JavaScript, React, Node.js</li>
            <li>HTML, CSS, Tailwind CSS</li>
            <li>Git, GitHub, CI/CD</li>
            {/* Add more skills */}
          </ul>
        </div>
        <div className="text-center mt-4">
          <a
            href="/resume.pdf"
            download
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
