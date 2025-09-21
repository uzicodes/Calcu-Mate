'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ConversionStep {
  step: string;
  calculation: string;
  result: string;
}

export default function BaseConverter() {
  const router = useRouter();
  const [number, setNumber] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState<ConversionStep[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState('');

  const baseOptions = [2, 8, 10, 16];

  const isValidDigit = (digit: string, base: number): boolean => {
    const validChars = '0123456789ABCDEF';
    const maxIndex = base - 1;
    return validChars.indexOf(digit.toUpperCase()) <= maxIndex;
  };

  const validateNumber = (num: string, base: number): boolean => {
    if (!num || num === '') return false;
    
    for (let i = 0; i < num.length; i++) {
      if (!isValidDigit(num[i], base)) {
        return false;
      }
    }
    return true;
  };

  const convertToDecimal = (num: string, base: number): { decimal: number; steps: ConversionStep[] } => {
    const steps: ConversionStep[] = [];
    let decimal = 0;

    if (base === 10) {
      steps.push({
        step: 'Base 10 Recognition',
        calculation: `Number is already in decimal`,
        result: num
      });
      return { decimal: parseInt(num), steps };
    }

    steps.push({
      step: 'Conversion Setup',
      calculation: `Converting ${num} from base ${base} to decimal`,
      result: 'Starting conversion...'
    });

    for (let i = 0; i < num.length; i++) {
      const digit = num[num.length - 1 - i];
      const digitValue = parseInt(digit, 16); // handles A-F for hex
      const placeValue = Math.pow(base, i);
      const contribution = digitValue * placeValue;
      
      decimal += contribution;

      steps.push({
        step: `Position ${i}`,
        calculation: `${digit} × ${base}^${i} = ${digitValue} × ${placeValue}`,
        result: `${contribution}`
      });
    }

    steps.push({
      step: 'Final Sum',
      calculation: steps.slice(2, -1).map(s => s.result).join(' + '),
      result: decimal.toString()
    });

    return { decimal, steps };
  };

  const convertFromDecimal = (decimal: number, base: number): { result: string; steps: ConversionStep[] } => {
    const steps: ConversionStep[] = [];
    
    if (base === 10) {
      steps.push({
        step: 'Base 10 Output',
        calculation: `Number remains in decimal`,
        result: decimal.toString()
      });
      return { result: decimal.toString(), steps };
    }

    if (decimal === 0) {
      steps.push({
        step: 'Zero Case',
        calculation: `0 in any base is 0`,
        result: '0'
      });
      return { result: '0', steps };
    }

    const digits = '0123456789ABCDEF';
    let result = '';
    let current = decimal;
    let stepNum = 1;

    steps.push({
      step: 'Conversion Setup',
      calculation: `Converting ${decimal} from decimal to base ${base}`,
      result: 'Using repeated division method...'
    });

    while (current > 0) {
      const remainder = current % base;
      const quotient = Math.floor(current / base);
      const digit = digits[remainder];
      
      result = digit + result;
      
      steps.push({
        step: `Division ${stepNum}`,
        calculation: `${current} ÷ ${base} = ${quotient} remainder ${remainder}`,
        result: `Digit: ${digit}`
      });
      
      current = quotient;
      stepNum++;
    }

    steps.push({
      step: 'Final Result',
      calculation: `Reading remainders from bottom to top`,
      result: result
    });

    return { result, steps };
  };

  const handleConvert = () => {
    setError('');
    setSteps([]);
    setResult('');

    if (!validateNumber(number, fromBase)) {
      setError(`Invalid digits for base ${fromBase}. Please check your input.`);
      return;
    }

    try {
      // Convert to decimal first
      const { decimal, steps: toDecimalSteps } = convertToDecimal(number, fromBase);
      
      // Convert from decimal to target base
      const { result: finalResult, steps: fromDecimalSteps } = convertFromDecimal(decimal, toBase);
      
      // Combine steps with smart omissions
      let allSteps = [...toDecimalSteps];
      
      // Smart omission: if converting from base 10, skip the decimal conversion steps
      if (fromBase !== 10) {
        allSteps.push({
          step: 'Intermediate Result',
          calculation: `Decimal equivalent: ${decimal}`,
          result: decimal.toString()
        });
      }
      
      // Smart omission: if converting to base 10, we're done
      if (toBase !== 10) {
        allSteps = [...allSteps, ...fromDecimalSteps];
      }

      setSteps(allSteps);
      setResult(finalResult);
    } catch (err) {
      setError('Conversion failed. Please check your input.');
    }
  };

  const handleClear = () => {
    setNumber('');
    setResult('');
    setSteps([]);
    setError('');
  };

  const handleNumberChange = (value: string) => {
    // Only allow valid characters based on the from base
    const validChars = '0123456789ABCDEF'.slice(0, fromBase);
    const filtered = value.toUpperCase().split('').filter(char => 
      validChars.includes(char)
    ).join('');
    
    setNumber(filtered);
    setError('');
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <button 
          onClick={() => router.push('/')}
          className="back-btn"
        >
          ← Back
        </button>
        <h1>Base Converter</h1>
      </div>

      <div className="flex gap-6 flex-1">
        {/* Main Calculator */}
        <div className="flex-1">
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-semibold mb-6">Smart Base Converter</h2>
            
            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => handleNumberChange(e.target.value)}
                placeholder="Enter number..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Base Selection */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">From Base</label>
                <select
                  value={fromBase}
                  onChange={(e) => setFromBase(parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                >
                  {baseOptions.map(base => (
                    <option key={base} value={base}>{base}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">To Base</label>
                <select
                  value={toBase}
                  onChange={(e) => setToBase(parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                >
                  {baseOptions.map(base => (
                    <option key={base} value={base}>{base}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleClear}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleConvert}
                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>📋</span>
                Convert
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white mt-6">
            <h3 className="text-xl font-semibold mb-4">Conversion Output</h3>
            
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowSteps(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !showSteps 
                    ? 'bg-yellow-600 text-gray-900 font-semibold' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Result
              </button>
              <button
                onClick={() => setShowSteps(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showSteps 
                    ? 'bg-yellow-600 text-gray-900 font-semibold' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Step-by-Step
              </button>
            </div>

            {/* Output Content */}
            <div className="min-h-[100px] bg-gray-800 rounded-lg p-4">
              {!result && !showSteps && (
                <p className="text-gray-400">No conversion yet. Enter a number and click "Convert."</p>
              )}
              
              {result && !showSteps && (
                <div>
                  <p className="text-2xl font-mono text-yellow-400">{result}</p>
                  <p className="text-gray-400 mt-2">
                    {number} (base {fromBase}) = {result} (base {toBase})
                  </p>
                </div>
              )}
              
              {showSteps && steps.length > 0 && (
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div key={index} className="border-l-2 border-yellow-500 pl-3">
                      <p className="font-semibold text-yellow-400">{step.step}</p>
                      <p className="text-gray-300">{step.calculation}</p>
                      <p className="text-green-400 font-mono">{step.result}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {showSteps && steps.length === 0 && (
                <p className="text-gray-400">No steps available. Perform a conversion to see the process.</p>
              )}
            </div>
          </div>
        </div>

        {/* Learning Resources Sidebar */}
        <div className="w-80">
          <div className="bg-gray-900 rounded-2xl p-6 text-white sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">📚</span>
              <h3 className="text-xl font-semibold">Learning Resources</h3>
            </div>

            {/* Digit Validation */}
            <div className="mb-6">
              <h4 className="font-semibold text-yellow-400 mb-2">Digit Validation</h4>
              <p className="text-sm text-gray-300 mb-2">
                Before any conversion, we ensure each digit is valid for your "From Base." For instance, base-2 only accepts "0" and "1." Entering "2" triggers an error.
              </p>
            </div>

            {/* Smart Omissions */}
            <div className="mb-6">
              <h4 className="font-semibold text-yellow-400 mb-2">Smart Omissions</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>If fromBase=10, no table parse steps (we already have decimal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>If toBase=10, skip repeated division steps; result is just decimal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>No fractional part, skip fraction logic.</span>
                </li>
              </ul>
            </div>

            {/* Typical Flow */}
            <div className="mb-6">
              <h4 className="font-semibold text-yellow-400 mb-2">Typical Flow</h4>
              <ol className="text-sm text-gray-300 space-y-2">
                <li>1. Check if digits fit the chosen base (0..base-1).</li>
                <li>2. If needed, parse to decimal showing digit×power breakdown.</li>
                <li>3. If needed, convert decimal to target base via repeated division/multiplication.</li>
              </ol>
            </div>

            {/* Tutorial Link */}
            <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors">
              View Full Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}