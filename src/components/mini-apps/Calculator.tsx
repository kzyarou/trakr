
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    
    if (currentValue === null) {
      setCurrentValue(display);
    } else if (operator) {
      const result = calculate(parseFloat(currentValue), inputValue, operator);
      setDisplay(String(result));
      setCurrentValue(String(result));
    }
    
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (currentValue === null || operator === null) return;
    
    const inputValue = parseFloat(display);
    const result = calculate(parseFloat(currentValue), inputValue, operator);
    
    setDisplay(String(result));
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Input 
        className="text-right text-xl p-4 h-14 mb-2 font-mono" 
        value={display}
        readOnly
      />
      
      <div className="grid grid-cols-4 gap-1">
        {/* First row */}
        <Button 
          variant="secondary" 
          className="w-full h-12" 
          onClick={clearAll}
        >
          AC
        </Button>
        <Button 
          variant="secondary" 
          className="w-full h-12"
          onClick={handlePlusMinus}
        >
          +/-
        </Button>
        <Button 
          variant="secondary" 
          className="w-full h-12"
          onClick={handlePercentage}
        >
          %
        </Button>
        <Button 
          variant="secondary" 
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => performOperation('÷')}
        >
          ÷
        </Button>
        
        {/* Second row */}
        {[7, 8, 9].map((num) => (
          <Button 
            key={num} 
            variant="outline" 
            className="w-full h-12"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="secondary" 
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => performOperation('×')}
        >
          ×
        </Button>
        
        {/* Third row */}
        {[4, 5, 6].map((num) => (
          <Button 
            key={num} 
            variant="outline" 
            className="w-full h-12"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="secondary" 
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => performOperation('-')}
        >
          -
        </Button>
        
        {/* Fourth row */}
        {[1, 2, 3].map((num) => (
          <Button 
            key={num} 
            variant="outline" 
            className="w-full h-12"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="secondary" 
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => performOperation('+')}
        >
          +
        </Button>
        
        {/* Fifth row */}
        <Button 
          variant="outline" 
          className="w-full h-12 col-span-2"
          onClick={() => inputDigit('0')}
        >
          0
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-12"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button 
          variant="secondary" 
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleEquals}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
