'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BasicCalculator() {
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
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setOperation(null);
    setPreviousOperand('');
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
      default: return op;
    }
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Basic Calculator</h1>
        </div>
        
        <div className="calculator">
          <div className="display">
            <div className="previous-operand">
              {operation ? `${previousOperand} ${getOperationSymbol(operation)}` : ''}
            </div>
            <div className="current-operand">{currentOperand}</div>
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
