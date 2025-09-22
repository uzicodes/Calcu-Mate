'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) {
      return { category: 'Underweight', color: '#3b82f6' };
    } else if (bmi < 25) {
      return { category: 'Normal weight', color: '#10b981' };
    } else if (bmi < 30) {
      return { category: 'Overweight', color: '#f59e0b' };
    } else {
      return { category: 'Obese', color: '#ef4444' };
    }
  };

  const calculateBMI = (): void => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert('Please enter valid weight and height values');
      return;
    }

    let bmi: number;

    if (unit === 'metric') {
      bmi = w / (h * h);
    } else {
      bmi = (w / (h * h)) * 703;
    }

    const { category, color } = getBMICategory(bmi);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color
    });
  };

  const clear = (): void => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>BMI Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="mb-5">
            <label className="block mb-2.5 font-semibold text-white">
              Unit System:
            </label>
            <select 
              value={unit} 
              onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
              className="w-full p-2.5 rounded-lg border-2 border-gray-600 bg-gray-800 text-white text-base focus:border-calc-gold focus:outline-none"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, inches)</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold text-white">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'}):
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-800 text-white text-xl placeholder-gray-400 focus:border-calc-gold focus:outline-none"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold text-white">
              Height ({unit === 'metric' ? 'cm' : 'inches'}):
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
              className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-800 text-white text-xl placeholder-gray-400 focus:border-calc-gold focus:outline-none"
            />
          </div>

          <div className="flex gap-4 mb-5 justify-center">
            <button className="px-6 py-3 bg-calc-gold text-gray-900 rounded-lg font-medium hover:bg-calc-gold-light transition-colors" onClick={calculateBMI}>
              Calculate BMI
            </button>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors" onClick={clear}>
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-5 p-4 bg-gray-800 border border-gray-600 rounded-lg text-sm leading-relaxed">
              <h4 className="mb-2.5 text-white font-semibold">BMI Categories:</h4>
              <div className="grid grid-cols-2 gap-2.5 text-gray-300">
                <div>Underweight: &lt; 18.5</div>
                <div>Normal: 18.5 - 24.9</div>
                <div>Overweight: 25 - 29.9</div>
                <div>Obese: ≥ 30</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
