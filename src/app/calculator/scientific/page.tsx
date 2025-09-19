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
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Scientific Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="previous-operand">
              {operation ? `${previousOperand} ${getOperationSymbol(operation)}` : ''}
            </div>
            <div className="current-operand">{currentOperand}</div>
          </div>
          
          <div className="scientific-buttons">
            <button className="scientific-btn" onClick={() => performScientificFunction('sin')}>sin</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('cos')}>cos</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('tan')}>tan</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('log')}>log</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('ln')}>ln</button>
            
            <button className="scientific-btn" onClick={() => performScientificFunction('sqrt')}>√</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('square')}>x²</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('pi')}>π</button>
            <button className="scientific-btn" onClick={() => performScientificFunction('e')}>e</button>
            <button className="scientific-btn" onClick={() => chooseOperation('^')}>x^y</button>
          </div>
          
          <div className="buttons">
            <button className="btn btn-clear" onClick={clear}>C</button>
            <button className="btn btn-operator" onClick={deleteLast}>⌫</button>
            <button className="btn btn-operator" onClick={() => chooseOperation('/')}>/</button>
            <button className="btn btn-operator" onClick={() => chooseOperation('*')}>×</button>
            
            <button className="btn btn-number" onClick={() => appendNumber('7')}>7</button>
            <button className="btn btn-number" onClick={() => appendNumber('8')}>8</button>
            <button className="btn btn-number" onClick={() => appendNumber('9')}>9</button>
            <button className="btn btn-operator" onClick={() => chooseOperation('-')}>-</button>
            
            <button className="btn btn-number" onClick={() => appendNumber('4')}>4</button>
            <button className="btn btn-number" onClick={() => appendNumber('5')}>5</button>
            <button className="btn btn-number" onClick={() => appendNumber('6')}>6</button>
            <button className="btn btn-operator" onClick={() => chooseOperation('+')}>+</button>
            
            <button className="btn btn-number" onClick={() => appendNumber('1')}>1</button>
            <button className="btn btn-number" onClick={() => appendNumber('2')}>2</button>
            <button className="btn btn-number" onClick={() => appendNumber('3')}>3</button>
            <button className="btn btn-equals" onClick={calculate} style={{ gridRow: 'span 2' }}>=</button>
            
            <button className="btn btn-number btn-zero" onClick={() => appendNumber('0')}>0</button>
            <button className="btn btn-number" onClick={appendDecimal}>.</button>
          </div>
        </div>
      </div>
    </div>
  );
}
