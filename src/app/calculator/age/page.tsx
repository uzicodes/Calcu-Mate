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
      <div className="max-w-md mx-auto p-4 min-h-screen flex flex-col">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Age Calculator</h1>
        </div>
        
        <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl flex-1 text-white">
          {result && (
            <div className="mb-4 p-3 bg-green-100 rounded-lg border-2 border-green-300">
              <div className="text-center">
                <div className="text-lg font-bold mb-2 text-green-800">
                  Age: {result.years} years, {result.months} months, {result.days} days
                </div>
                <div className="text-sm text-green-700">
                  Total days: {result.totalDays.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm">
              Birth Date:
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm">
              Current Date (optional):
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base text-gray-900"
            />
          </div>

          <div className="flex gap-3 mb-4 justify-center">
            <button className="px-4 py-2 bg-calc-gold text-gray-900 rounded-lg font-medium hover:bg-calc-gold-light transition-colors text-sm" onClick={calculateAge}>
              Calculate Age
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm" onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
