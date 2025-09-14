import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' }); // company is honeypot
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!emailRe.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10) next.message = 'Please enter at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);
    if (!validate()) return;
    // Honeypot check
    if (form.company) {
      // likely a bot – pretend success
      setSuccess(true);
      setForm({ name: '', email: '', message: '', company: '' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/mwpezojv', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '', company: '' });
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data?.error || 'Something went wrong. Please try again later.');
      }
    } catch (err) {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question, collaboration idea, or just want to say hello? Drop me a message and I’ll get back to you.
          </p>
        </motion.div>

        {success && (
          <motion.div
            className="mb-6 rounded-lg border border-green-300/50 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200 px-4 py-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thanks! Your message has been sent.
          </motion.div>
        )}
        {serverError && (
          <motion.div
            className="mb-6 rounded-lg border border-red-300/50 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200 px-4 py-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {serverError}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          {/* Honeypot */}
          <input type="text" name="company" value={form.company} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent resize-y"
                placeholder="Tell me a bit about your project or message"
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 ${submitting ? 'opacity-70 cursor-not-allowed bg-gray-400 dark:bg-gray-700' : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl transform hover:-translate-y-0.5'}`}
            >
              <FiSend className="w-5 h-5" />
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export default Contact;
