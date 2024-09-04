import React, { useState } from 'react';

function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    const form = e.target;
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });
    if (response.ok) {
      setStatus('Message sent!');
      form.reset();
    } else {
      setStatus('Oops! Something went wrong.');
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>
      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/f/mwpezojv"
        method="POST"
        className="max-w-lg mx-auto space-y-4"
      >
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            required
            className="w-full border px-3 py-2 rounded"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
        {status && <p className="mt-2">{status}</p>}
      </form>
    </section>
  );
}

export default Contact;
