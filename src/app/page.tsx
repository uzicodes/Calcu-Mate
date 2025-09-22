'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculators: Calculator[] = [
    {
      id: 'basic',
      name: 'Basic Calculator',
      description: 'Simple arithmetic operations',
      icon: '🔢'
    },
    {
      id: 'scientific',
      name: 'Scientific Calculator',
      description: 'Advanced mathematical functions',
      icon: '🧮'
    },
    {
      id: 'cgpa',
      name: 'CGPA Calculator',
      description: 'Calculate Cumulative Grade Point Average',
      icon: '🎓'
    },
    {
      id: 'percentage',
      name: 'Percentage Calculator',
      description: 'Calculate percentages and ratios',
      icon: '📊'
    },
    {
      id: 'currency',
      name: 'Currency Calculator',
      description: 'Currency conversion and calculations',
      icon: '💰'
    },
    {
      id: 'unit',
      name: 'Unit Converter',
      description: 'Convert between different units',
      icon: '📏'
    },
    {
      id: 'age',
      name: 'Age Calculator',
      description: 'Calculate age and date differences',
      icon: '🎂'
    },
    {
      id: 'bmi',
      name: 'BMI Calculator',
      description: 'Body Mass Index calculator',
      icon: '🏃‍♂️'
    },
    {
      id: 'loan',
      name: 'Loan Calculator',
      description: 'Calculate loan payments and interest',
      icon: '🏦'
    },
    {
      id: 'base',
      name: 'Base Converter',
      description: 'Convert numbers between different bases',
      icon: '🔀'
    },
    {
      id: 'complement',
      name: 'Complement\'s Converter',
      description: '1s & 2s complement conversions',
      icon: '🔄'
    },
    {
      id: 'truth-table',
      name: 'Truth Table Generator',
      description: 'Create & analyze truth tables for boolean expressions',
      icon: '📊'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using a simple form submission service (you can replace with EmailJS or other service)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'utshozi11@gmail.com'
        }),
      });

      if (response.ok) {
        alert('Bug report submitted successfully!');
        setFormData({ name: '', email: '', subject: '', description: '' });
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      // Fallback: Create mailto link
      const mailtoLink = `mailto:utshozi11@gmail.com?subject=${encodeURIComponent(`Bug Report: ${formData.subject}`)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nDescription:\n${formData.description}`
      )}`;
      window.open(mailtoLink, '_blank');
      alert('Opening email client...');
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      {/* Navbar */}
      <nav className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Calcu-Mate Logo"
                width={32}
                height={32}
                className="drop-shadow-sm"
              />
              <span className="text-2xl text-calc-gold font-cinzel">
                CALCU-MATE
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/uzicodes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
                title="Visit GitHub Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* Bug Report Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
                title="Report a Bug"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.42.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
                </svg>
              </button>

              {/* Menu Toggle for Mobile */}
              <button 
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200 md:hidden"
                title="Menu"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-5 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-10 text-white">
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Calcu-Mate Logo"
              width={120}
              height={120}
              className="mx-auto drop-shadow-lg"
            />
          </div>
          <h1 className="text-7xl font-bold mb-2.5 drop-shadow-2xl bungee-spice-title">
            CALCU-MATE
          </h1>
          <p className="text-xl font-light opacity-90">Choose your calculator !</p>
        </header>

        <main className="flex-1 flex justify-center items-center">
          <div className="calculator-grid">
            {calculators.map((calculator) => (
              <Link
                key={calculator.id}
                href={`/calculator/${calculator.id}`}
                className="calculator-card"
              >
                <div className="calculator-icon text-6xl">{calculator.icon}</div>
                <h3 className="font-semibold">{calculator.name}</h3>
                <p>{calculator.description}</p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="text-center mt-10 text-calc-gold opacity-80 text-sm">
          <p>&copy; 2025 Calcu-Mate. © All rights Reserved </p>
        </footer>
      </div>

      {/* Bug Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Report an Issue</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              Help us improve our Digital Logic Tools by reporting any problems you encounter.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-calc-gold"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-calc-gold"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief issue summary"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-calc-gold"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about the issue"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-calc-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {isSubmitting ? 'Submitting...' : 'Submit Issue'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
