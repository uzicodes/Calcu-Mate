'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ScientificCalculator() {
  const [currentOperand, setCurrentOperand] = useState<string>('0');
  const [previousOperand, setPreviousOperand] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);

  const appendNumber = (number: string): void => {
    if (shouldResetDisplay) {
      setCurrentOperand(number);
      setShouldResetDisplay(false);
    } else {
      setCurrentOperand(prev => prev === '0' && number !== '.' ? number : prev + number);
    }
  };

  const appendDecimal = (): void => {
    if (shouldResetDisplay) {
      setCurrentOperand('0.');
      setShouldResetDisplay(false);
    } else if (currentOperand.indexOf('.') === -1) {
      setCurrentOperand(prev => prev + '.');
    }
  };

  const chooseOperation = (op: string): void => {
    if (currentOperand === '') return;

    if (previousOperand !== '') {
      calculate();
    }

    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  };

  const calculate = (): void => {
    if (previousOperand === '' || currentOperand === '' || !operation) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result: number;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('Cannot divide by zero!');
          return;
        }
        result = prev / current;
        break;
      case '^':
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setOperation(null);
    setPreviousOperand('');
    setShouldResetDisplay(true);
  };

  const performScientificFunction = (func: string): void => {
    const value = parseFloat(currentOperand);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setShouldResetDisplay(true);
  };

  const clear = (): void => {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const deleteLast = (): void => {
    if (currentOperand.length > 1) {
      setCurrentOperand(prev => prev.slice(0, -1));
    } else {
      setCurrentOperand('0');
    }
  };

  const getOperationSymbol = (op: string): string => {
    switch (op) {
      case '+': return '+';
      case '-': return '-';
      case '*': return '×';
      case '/': return '÷';
      case '^': return '^';
      default: return op;
    }
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="max-w-lg mx-auto p-4 min-h-screen flex flex-col">
        <div className="calculator-header mb-4">
          <Link href="/" className="back-btn text-base px-4 py-2">← Back</Link>
          <h1 className="text-2xl">Scientific Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg">
            <div className="previous-operand text-sm text-gray-400 h-5">
              {operation ? `${previousOperand} ${getOperationSymbol(operation)}` : ''}
            </div>
            <div className="current-operand text-2xl text-white font-bold">{currentOperand}</div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-3">
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('sin')}>sin</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('cos')}>cos</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('tan')}>tan</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('log')}>log</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('ln')}>ln</button>
            
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('sqrt')}>√</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('square')}>x²</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('pi')}>π</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => performScientificFunction('e')}>e</button>
            <button className="bg-blue-600 text-white text-sm py-2 px-2 rounded font-medium hover:bg-blue-700 transition-colors" onClick={() => chooseOperation('^')}>x^y</button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <button className="bg-red-600 text-white text-base py-3 rounded font-medium hover:bg-red-700 transition-colors" onClick={clear}>C</button>
            <button className="bg-orange-600 text-white text-base py-3 rounded font-medium hover:bg-orange-700 transition-colors" onClick={deleteLast}>⌫</button>
            <button className="bg-orange-600 text-white text-base py-3 rounded font-medium hover:bg-orange-700 transition-colors" onClick={() => chooseOperation('/')}>/</button>
            <button className="bg-orange-600 text-white text-base py-3 rounded font-medium hover:bg-orange-700 transition-colors" onClick={() => chooseOperation('*')}>×</button>
            
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('7')}>7</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('8')}>8</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('9')}>9</button>
            <button className="bg-orange-600 text-white text-base py-3 rounded font-medium hover:bg-orange-700 transition-colors" onClick={() => chooseOperation('-')}>-</button>
            
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('4')}>4</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('5')}>5</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('6')}>6</button>
            <button className="bg-orange-600 text-white text-base py-3 rounded font-medium hover:bg-orange-700 transition-colors" onClick={() => chooseOperation('+')}>+</button>
            
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('1')}>1</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('2')}>2</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={() => appendNumber('3')}>3</button>
            <button className="bg-calc-gold text-gray-900 text-base py-3 rounded font-medium hover:bg-calc-gold-light transition-colors row-span-2" onClick={calculate}>=</button>
            
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors col-span-2" onClick={() => appendNumber('0')}>0</button>
            <button className="bg-gray-700 text-white text-base py-3 rounded font-medium hover:bg-gray-600 transition-colors" onClick={appendDecimal}>.</button>
          </div>
        </div>
      </div>
    </div>
  );
}
