'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PercentageCalculator() {
  const [value, setValue] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'basic' | 'increase' | 'decrease' | 'of'>('basic');

  const calculatePercentage = (): void => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);

    if (isNaN(val) || isNaN(perc)) {
      alert('Please enter valid numbers');
      return;
    }

    let calculatedResult: number;

    switch (calculationType) {
      case 'basic':
        calculatedResult = (val * perc) / 100;
        break;
      case 'increase':
        calculatedResult = val + (val * perc) / 100;
        break;
      case 'decrease':
        calculatedResult = val - (val * perc) / 100;
        break;
      case 'of':
        calculatedResult = (perc / 100) * val;
        break;
      default:
        calculatedResult = 0;
    }

    setResult(calculatedResult.toString());
  };

  const clear = (): void => {
    setValue('');
    setPercentage('');
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Percentage Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="current-operand">
              {result ? `Result: ${result}` : 'Enter values to calculate'}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Calculation Type:
            </label>
            <select 
              value={calculationType} 
              onChange={(e) => setCalculationType(e.target.value as any)}
              className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
            >
              <option value="basic">X% of Y</option>
              <option value="increase">X increased by Y%</option>
              <option value="decrease">X decreased by Y%</option>
              <option value="of">What is X% of Y?</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Value:
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Percentage:
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="buttons">
            <button className="btn btn-equals" onClick={calculatePercentage} style={{ gridColumn: 'span 2' }}>
              Calculate
            </button>
            <button className="btn btn-clear" onClick={clear} style={{ gridColumn: 'span 2' }}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
