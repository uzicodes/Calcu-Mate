'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UnitConverter() {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [category, setCategory] = useState<string>('length');
  const [result, setResult] = useState<string>('');

  const conversionFactors: { [key: string]: { [key: string]: number } } = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34
    },
    weight: {
      gram: 1,
      kilogram: 1000,
      pound: 453.592,
      ounce: 28.3495,
      ton: 1000000
    },
    temperature: {
      celsius: 1,
      fahrenheit: 1,
      kelvin: 1
    },
    area: {
      'square meter': 1,
      'square kilometer': 1000000,
      'square foot': 0.092903,
      'square inch': 0.00064516,
      acre: 4046.86,
      hectare: 10000
    },
    volume: {
      liter: 1,
      milliliter: 0.001,
      'cubic meter': 1000,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176,
      cup: 0.236588
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        return value;
    }
    
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convert = (): void => {
    const val = parseFloat(value);

    if (isNaN(val)) {
      alert('Please enter a valid number');
      return;
    }

    let calculatedResult: number;

    if (category === 'temperature') {
      calculatedResult = convertTemperature(val, fromUnit, toUnit);
    } else {
      const factors = conversionFactors[category];
      if (!factors || !factors[fromUnit] || !factors[toUnit]) {
        alert('Invalid conversion');
        return;
      }
      
      const baseValue = val * factors[fromUnit];
      calculatedResult = baseValue / factors[toUnit];
    }

    setResult(calculatedResult.toFixed(6));
  };

  const clear = (): void => {
    setValue('');
    setResult('');
  };

  const categories = Object.keys(conversionFactors);
  const units = conversionFactors[category] ? Object.keys(conversionFactors[category]) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Unit Converter</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="current-operand">
              {result ? `${value} ${fromUnit} = ${result} ${toUnit}` : 'Enter value to convert'}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Category:
            </label>
            <select 
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value);
                const newUnits = Object.keys(conversionFactors[e.target.value]);
                setFromUnit(newUnits[0]);
                setToUnit(newUnits[1] || newUnits[0]);
              }}
              className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
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

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2.5 font-semibold">
                From:
              </label>
              <select 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2.5 font-semibold">
                To:
              </label>
              <select 
                value={toUnit} 
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttons">
            <button className="btn btn-equals" onClick={convert} style={{ gridColumn: 'span 2' }}>
              Convert
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
