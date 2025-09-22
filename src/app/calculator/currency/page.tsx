'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fallback static rates (backup if API fails)
  const fallbackRates: ExchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 75,
    BRL: 5.2,
    BDT: 110
  };

  // Fetch real-time exchange rates
  const fetchExchangeRates = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      if (data && data.rates) {
        setExchangeRates({ USD: 1, ...data.rates });
        setLastUpdated(new Date().toLocaleString());
      } else {
        // Use fallback rates if API response is invalid
        setExchangeRates(fallbackRates);
        setLastUpdated('Using fallback rates');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Use fallback rates if API fails
      setExchangeRates(fallbackRates);
      setLastUpdated('Using fallback rates');
    } finally {
      setIsLoading(false);
    }
  };

  // Load rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, []);

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

  // Get available currencies (use fallback if rates not loaded)
  const currencies = Object.keys(exchangeRates).length > 0 
    ? Object.keys(exchangeRates).sort() 
    : Object.keys(fallbackRates).sort();
  
  const currencyNames: { [key: string]: string } = {
    USD: 'USD (United States)',
    EUR: 'EUR (European Union)',
    GBP: 'GBP (United Kingdom)',
    JPY: 'JPY (Japan)',
    CAD: 'CAD (Canada)',
    AUD: 'AUD (Australia)',
    CHF: 'CHF (Switzerland)',
    CNY: 'CNY (China)',
    INR: 'INR (India)',
    BRL: 'BRL (Brazil)',
    BDT: 'BDT (Bangladesh)'
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Currency Calculator</h1>
        </div>
        
        {/* Exchange Rate Status */}
        <div className="mb-4 p-3 bg-gray-800 border border-gray-600 rounded-lg flex justify-between items-center">
          <div className="text-sm text-gray-300">
            <span className="font-semibold">Rates: </span>
            {isLoading ? (
              <span className="text-yellow-400">Updating...</span>
            ) : (
              <span className="text-green-400">{lastUpdated}</span>
            )}
          </div>
          <button
            onClick={fetchExchangeRates}
            disabled={isLoading}
            className="px-3 py-1.5 bg-calc-gold text-gray-900 rounded text-sm font-medium hover:bg-calc-gold-light transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Refresh Rates'}
          </button>
        </div>
        
        <div className="calculator">
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
                  <option key={currency} value={currency}>{currencyNames[currency]}</option>
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
                  <option key={currency} value={currency}>{currencyNames[currency]}</option>
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

          <div className="flex gap-4 mb-5 justify-center">
            <button className="px-6 py-3 bg-calc-gold text-gray-900 rounded-lg font-medium hover:bg-calc-gold-light transition-colors" onClick={calculateCurrency}>
              Convert
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
