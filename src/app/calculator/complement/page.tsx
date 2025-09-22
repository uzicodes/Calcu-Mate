'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComplementConverter() {
  const [number, setNumber] = useState<string>('01001010101111');
  const [fromType, setFromType] = useState<string>('twos-complement');
  const [toType, setToType] = useState<string>('decimal');
  const [bitLength, setBitLength] = useState<number>(16);
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(false);

  const padBinary = (binary: string, length: number): string => {
    return binary.padStart(length, '0');
  };

  const decimalToBinary = (num: number, bits: number): string => {
    if (num >= 0) {
      return padBinary(num.toString(2), bits);
    } else {
      // For negative numbers, get positive binary and apply 2's complement
      const positive = Math.abs(num);
      const binary = padBinary(positive.toString(2), bits);
      return twosComplement(binary);
    }
  };

  const onesComplement = (binary: string): string => {
    return binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
  };

  const twosComplement = (binary: string): string => {
    const ones = onesComplement(binary);
    let carry = 1;
    let result = '';
    
    for (let i = ones.length - 1; i >= 0; i--) {
      const sum = parseInt(ones[i]) + carry;
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);
    }
    
    return result;
  };

  const binaryToDecimal = (binary: string, isComplement: boolean = false): number => {
    if (!isComplement) {
      return parseInt(binary, 2);
    }
    
    // Check if it's a negative number (MSB is 1)
    if (binary[0] === '1') {
      // Convert back from 2's complement
      const inverted = twosComplement(binary);
      return -parseInt(inverted, 2);
    } else {
      return parseInt(binary, 2);
    }
  };

  const convert = (): void => {
    if (!number.trim()) {
      alert('Please enter a number');
      return;
    }

    const maxValue = Math.pow(2, bitLength - 1) - 1;
    const minValue = -Math.pow(2, bitLength - 1);
    let conversionSteps: string[] = [];
    let convertedResult = '';

    try {
      if (fromType === 'decimal') {
        const num = parseInt(number);
        
        if (num > maxValue || num < minValue) {
          alert(`Number out of range for ${bitLength}-bit representation. Range: ${minValue} to ${maxValue}`);
          return;
        }

        if (toType === 'binary') {
          const binary = padBinary(Math.abs(num).toString(2), bitLength);
          convertedResult = binary;
          conversionSteps = [
            `Converting decimal ${num} to binary:`,
            `${Math.abs(num)}₁₀ = ${binary}₂`
          ];
        } else if (toType === 'ones-complement') {
          if (num >= 0) {
            const binary = padBinary(num.toString(2), bitLength);
            convertedResult = binary;
            conversionSteps = [
              `Converting positive decimal ${num} to 1's complement:`,
              `${num}₁₀ = ${binary}₂ (positive numbers are the same)`
            ];
          } else {
            const posBinary = padBinary(Math.abs(num).toString(2), bitLength);
            const complement = onesComplement(posBinary);
            convertedResult = complement;
            conversionSteps = [
              `Converting negative decimal ${num} to 1's complement:`,
              `Step 1: Get binary of ${Math.abs(num)}: ${posBinary}`,
              `Step 2: Invert all bits: ${complement}`
            ];
          }
        } else if (toType === 'twos-complement') {
          if (num >= 0) {
            const binary = padBinary(num.toString(2), bitLength);
            convertedResult = binary;
            conversionSteps = [
              `Converting positive decimal ${num} to 2's complement:`,
              `${num}₁₀ = ${binary}₂ (positive numbers are the same)`
            ];
          } else {
            const posBinary = padBinary(Math.abs(num).toString(2), bitLength);
            const onesComp = onesComplement(posBinary);
            const twosComp = twosComplement(posBinary);
            convertedResult = twosComp;
            conversionSteps = [
              `Converting negative decimal ${num} to 2's complement:`,
              `Step 1: Get binary of ${Math.abs(num)}: ${posBinary}`,
              `Step 2: Get 1's complement: ${onesComp}`,
              `Step 3: Add 1 to get 2's complement: ${twosComp}`
            ];
          }
        }
      } else {
        // From binary to decimal
        if (!/^[01]+$/.test(number)) {
          alert('Please enter a valid binary number (0s and 1s only)');
          return;
        }

        const paddedBinary = padBinary(number, bitLength);
        
        if (fromType === 'binary') {
          const decimal = binaryToDecimal(paddedBinary);
          convertedResult = decimal.toString();
          conversionSteps = [
            `Converting binary to decimal:`,
            `${paddedBinary}₂ = ${decimal}₁₀`
          ];
        } else if (fromType === 'ones-complement') {
          let decimal;
          if (paddedBinary[0] === '0') {
            decimal = binaryToDecimal(paddedBinary);
            conversionSteps = [
              `Converting 1's complement to decimal:`,
              `MSB is 0, so it's positive: ${paddedBinary}₂ = ${decimal}₁₀`
            ];
          } else {
            const inverted = onesComplement(paddedBinary);
            decimal = -binaryToDecimal(inverted);
            conversionSteps = [
              `Converting 1's complement to decimal:`,
              `MSB is 1, so it's negative`,
              `Step 1: Invert bits: ${inverted}`,
              `Step 2: Convert to decimal and negate: -${binaryToDecimal(inverted)} = ${decimal}`
            ];
          }
          convertedResult = decimal.toString();
        } else if (fromType === 'twos-complement') {
          const decimal = binaryToDecimal(paddedBinary, true);
          convertedResult = decimal.toString();
          if (paddedBinary[0] === '0') {
            conversionSteps = [
              `Converting 2's complement to decimal:`,
              `MSB is 0, so it's positive: ${paddedBinary}₂ = ${decimal}₁₀`
            ];
          } else {
            const inverted = twosComplement(paddedBinary);
            conversionSteps = [
              `Converting 2's complement to decimal:`,
              `MSB is 1, so it's negative`,
              `Step 1: Get 2's complement: ${inverted}`,
              `Step 2: Convert to decimal and negate: -${binaryToDecimal(inverted)} = ${decimal}`
            ];
          }
        }
      }

      setResult(convertedResult);
      setSteps(conversionSteps);
    } catch (error) {
      alert('Invalid input. Please check your number format.');
    }
  };

  const clear = (): void => {
    setNumber('');
    setResult('');
    setSteps([]);
    setShowSteps(false);
  };

  const sampleProblems = [
    { binary: '01001010101111', decimal: '?', note: '2s' },
    { binary: '10101010100001', decimal: '?', note: '10' },
    { binary: '01001010101111', decimal: '?', note: '16' },
    { binary: '10101010100001', decimal: '?', note: '16' }
  ];

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>1's & 2's Complement Converter</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator Section - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="calculator">
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block mb-2.5 font-semibold text-white">From</label>
                  <select 
                    value={fromType} 
                    onChange={(e) => setFromType(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-gray-800 border-2 border-gray-600 text-white text-base focus:border-calc-gold"
                  >
                    <option value="decimal">Decimal</option>
                    <option value="binary">Binary</option>
                    <option value="ones-complement">Binary (1's comp)</option>
                    <option value="twos-complement">Binary (2's comp)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2.5 font-semibold text-white">To</label>
                  <select 
                    value={toType} 
                    onChange={(e) => setToType(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-gray-800 border-2 border-gray-600 text-white text-base focus:border-calc-gold"
                  >
                    <option value="decimal">Decimal</option>
                    <option value="binary">Binary</option>
                    <option value="ones-complement">Binary (1's comp)</option>
                    <option value="twos-complement">Binary (2's comp)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2.5 font-semibold text-white">Bit Length</label>
                  <select 
                    value={bitLength} 
                    onChange={(e) => setBitLength(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-gray-800 border-2 border-gray-600 text-white text-base focus:border-calc-gold"
                  >
                    <option value={4}>4 bits</option>
                    <option value={8}>8 bits</option>
                    <option value={16}>16 bits</option>
                    <option value={32}>32 bits</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2.5 font-semibold text-white">Number</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder={fromType === 'decimal' ? 'Enter decimal number' : 'Enter binary number'}
                  className="w-full p-4 rounded-lg bg-gray-800 border-2 border-gray-600 text-white text-xl focus:border-calc-gold"
                />
              </div>

              <div className="flex gap-4 mb-5 justify-center">
                <button className="px-6 py-3 bg-calc-gold text-gray-900 rounded-lg font-medium hover:bg-calc-gold-light transition-colors" onClick={convert}>
                  Convert
                </button>
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors" onClick={clear}>
                  Clear
                </button>
              </div>

              <div className="display mt-5">
                <div className="current-operand">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-calc-gold mb-3">Conversion Output</h3>
                    <div className="flex gap-2 mb-4">
                      <button 
                        className={`px-4 py-2 rounded text-sm font-medium ${!showSteps ? 'bg-calc-gold text-gray-900' : 'bg-gray-700 text-white'}`}
                        onClick={() => setShowSteps(false)}
                      >
                        Result
                      </button>
                      <button 
                        className={`px-4 py-2 rounded text-sm font-medium ${showSteps ? 'bg-calc-gold text-gray-900' : 'bg-gray-700 text-white'}`}
                        onClick={() => setShowSteps(true)}
                      >
                        Steps
                      </button>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      {!result ? (
                        <div className="text-gray-400 text-center">
                          No conversion yet. Enter data and click "Convert."
                        </div>
                      ) : !showSteps ? (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-calc-gold">{result}</div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {steps.map((step, index) => (
                            <div key={index} className="text-sm text-gray-300 border-b border-gray-700 pb-2 last:border-0">
                              {step}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Resources Section - Takes 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 h-fit">
              <h3 className="text-xl font-bold text-calc-gold mb-4">📚 Learning Resources</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Sample Problems</h4>
                <ul className="space-y-2">
                  {sampleProblems.map((problem, index) => (
                    <li key={index} className="text-gray-300">
                      ({problem.binary})<sub>2</sub> ⇒ ({problem.decimal})<sub>10</sub>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 mt-3 text-sm">
                  For these, pick "From=Binary (2's comp)" or "From=Binary (1's comp)" 
                  and "To=Decimal," paste the bits, then click "Convert."
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Decimal → Complement</h4>
                <p className="text-gray-400 text-sm">
                  Enter a decimal number (e.g. -23) then choose "To=Binary (2's comp)" 
                  or "To=Binary (1's comp)." Specify the bit length (8, 16, etc.) to see how 
                  negative values are stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}