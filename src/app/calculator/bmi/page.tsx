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
  
  // Height converter state
  const [converterValue, setConverterValue] = useState<string>('');
  const [convertedValue, setConvertedValue] = useState<string>('');

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
      // Convert height from cm to meters
      const heightInMeters = h / 100;
      bmi = w / (heightInMeters * heightInMeters);
    } else {
      // Imperial: weight in lbs, height in inches
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

  const convertHeight = (): void => {
    const value = parseFloat(converterValue);
    if (isNaN(value) || value <= 0) {
      setConvertedValue('');
      return;
    }

    // Convert feet to cm
    const converted = value * 30.48;
    setConvertedValue(`${Math.round(converted * 100) / 100} cm`);
  };

  const clearConverter = (): void => {
    setConverterValue('');
    setConvertedValue('');
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>BMI Calculator</h1>
        </div>
        
        <div className="flex gap-8 max-w-6xl mx-auto">
          {/* Calculator Section */}
          <div className="calculator flex-1">
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
          </div>

          {/* BMI Range Information Box */}
          <div className="w-80 bg-gray-800 border border-gray-600 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4">BMI Categories</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6' }}>
                <span className="text-white">Underweight</span>
                <span className="text-blue-400 font-semibold">&lt; 18.5</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981' }}>
                <span className="text-white">Normal</span>
                <span className="text-green-400 font-semibold">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b' }}>
                <span className="text-white">Overweight</span>
                <span className="text-yellow-400 font-semibold">25 - 29.9</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444' }}>
                <span className="text-white">Obese</span>
                <span className="text-red-400 font-semibold">≥ 30</span>
              </div>
            </div>
            
            {/* Height Converter */}
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <h4 className="text-white font-semibold mb-2 text-sm">foot → cm</h4>
              <div className="space-y-2">
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={converterValue}
                    onChange={(e) => setConverterValue(e.target.value)}
                    placeholder="Enter feet"
                    className="flex-1 p-1.5 rounded border border-gray-600 bg-gray-800 text-white text-xs focus:border-calc-gold focus:outline-none"
                  />
                  <span className="p-1.5 text-gray-400 text-xs flex items-center">feet</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={convertHeight}
                    className="flex-1 px-2 py-1.5 bg-calc-gold text-gray-900 rounded text-xs font-medium hover:bg-calc-gold-light transition-colors"
                  >
                    Convert
                  </button>
                  <button
                    onClick={clearConverter}
                    className="px-2 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                {convertedValue && (
                  <div className="p-1.5 bg-gray-600 rounded text-center">
                    <span className="text-calc-gold font-semibold text-xs">{convertedValue}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* BMI Result Display */}
            {result && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg border-2" style={{ borderColor: result.color }}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2 text-white">
                    Your BMI: {result.bmi}
                  </div>
                  <div className="text-lg font-semibold" style={{ color: result.color }}>
                    {result.category}
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}
