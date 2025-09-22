'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = (): void => {
    if (!birthDate) {
      alert('Please enter your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth > current) {
      alert('Birth date cannot be in the future');
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays
    });
  };

  const clear = (): void => {
    setBirthDate('');
    setCurrentDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Age Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="current-operand">
              {result ? (
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2.5">
                    Age: {result.years} years, {result.months} months, {result.days} days
                  </div>
                  <div className="text-lg">
                    Total days: {result.totalDays.toLocaleString()}
                  </div>
                </div>
              ) : 'Enter your birth date to calculate age'}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Birth Date:
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Current Date (optional):
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="flex gap-4 mb-5 justify-center">
            <button className="px-6 py-3 bg-calc-gold text-gray-900 rounded-lg font-medium hover:bg-calc-gold-light transition-colors" onClick={calculateAge}>
              Calculate Age
            </button>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors" onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
