
import React from 'react';

export const PersonalityQuiz = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Financial Personality Quiz</h2>
      <p>Discover if you're a Saver, Spender, Avoider, or Monk</p>
      
      <div className="space-y-6 mt-4">
        <div className="space-y-2">
          <h3 className="font-medium">Question 1</h3>
          <p>When you receive extra money unexpectedly, what do you typically do?</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <input type="radio" id="q1-save" name="q1" value="save" />
              <label htmlFor="q1-save">Save most or all of it</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="q1-spend" name="q1" value="spend" />
              <label htmlFor="q1-spend">Treat yourself to something nice</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="q1-avoid" name="q1" value="avoid" />
              <label htmlFor="q1-avoid">You're not sure where it went</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="q1-monk" name="q1" value="monk" />
              <label htmlFor="q1-monk">Donate it or use it minimally</label>
            </div>
          </div>
        </div>
        
        {/* More questions would go here */}
        
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          See Your Results
        </button>
      </div>
    </div>
  );
};
