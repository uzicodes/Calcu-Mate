'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const [rate, setRate] = useState<string>('');

  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 75,
    BRL: 5.2
  };

  const calculateCurrency = (): void => {
    const amt = parseFloat(amount);
    const customRate = parseFloat(rate);

    if (isNaN(amt)) {
      alert('Please enter a valid amount');
      return;
    }

    let calculatedResult: number;

    if (customRate && customRate > 0) {
      calculatedResult = amt * customRate;
    } else {
      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      
      if (!fromRate || !toRate) {
        alert('Currency not supported');
        return;
      }
      
      calculatedResult = (amt / fromRate) * toRate;
    }

    setResult(calculatedResult.toFixed(2));
  };

  const clear = (): void => {
    setAmount('');
    setRate('');
    setResult('');
  };

  const currencies = Object.keys(exchangeRates);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Currency Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="current-operand">
              {result ? `${amount} ${fromCurrency} = ${result} ${toCurrency}` : 'Enter amount to convert'}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Amount:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2.5 font-semibold">
                From:
              </label>
              <select 
                value={fromCurrency} 
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2.5 font-semibold">
                To:
              </label>
              <select 
                value={toCurrency} 
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Custom Exchange Rate (optional):
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter custom rate"
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="buttons">
            <button className="btn btn-equals" onClick={calculateCurrency} style={{ gridColumn: 'span 2' }}>
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
