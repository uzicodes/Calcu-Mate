'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [termType, setTermType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = (): void => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const t = parseFloat(loanTerm);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
      alert('Please enter valid values for all fields');
      return;
    }

    const monthlyRate = r / 100 / 12;
    const totalMonths = termType === 'years' ? t * 12 : t;

    const monthlyPayment = (p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - p;

    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100
    });
  };

  const clear = (): void => {
    setPrincipal('');
    setInterestRate('');
    setLoanTerm('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Loan Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="current-operand">
              {result ? (
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2.5">
                    Monthly Payment: ${result.monthlyPayment.toLocaleString()}
                  </div>
                  <div className="text-lg mb-1">
                    Total Payment: ${result.totalPayment.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-600">
                    Total Interest: ${result.totalInterest.toLocaleString()}
                  </div>
                </div>
              ) : 'Enter loan details to calculate payments'}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Loan Amount ($):
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2.5 font-semibold">
              Annual Interest Rate (%):
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              step="0.01"
              className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2.5 font-semibold">
                Loan Term:
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter term"
                className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
              />
            </div>
            
            <div>
              <label className="block mb-2.5 font-semibold">
                Term Type:
              </label>
              <select 
                value={termType} 
                onChange={(e) => setTermType(e.target.value as 'years' | 'months')}
                className="w-full p-4 rounded-lg border-2 border-gray-200 text-xl"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <div className="buttons">
            <button className="btn btn-equals" onClick={calculateLoan} style={{ gridColumn: 'span 2' }}>
              Calculate Loan
            </button>
            <button className="btn btn-clear" onClick={clear} style={{ gridColumn: 'span 2' }}>
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-5 p-4 bg-gray-50 rounded-lg text-sm leading-relaxed">
              <h4 className="mb-2.5 text-gray-800 font-semibold">Loan Summary:</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div>Principal: ${parseFloat(principal).toLocaleString()}</div>
                <div>Interest Rate: {interestRate}%</div>
                <div>Term: {loanTerm} {termType}</div>
                <div>Total Interest: ${result.totalInterest.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
