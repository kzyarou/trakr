
import React from 'react';
import { Calendar } from 'lucide-react';

export const BehavioralStreaks = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Behavioral Streaks Tracker</h2>
      <p>Build long-term positive financial habits</p>
      
      <div className="mt-6 space-y-4">
        <div className="bg-background border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">No Impulse Spending</h3>
              <p className="text-sm text-muted-foreground">Current streak: 5 days 🔥</p>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          
          <div className="mt-4 flex space-x-1">
            {Array(7).fill(null).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full ${i < 5 ? 'bg-primary' : 'bg-muted'}`} 
              />
            ))}
          </div>
        </div>
        
        <div className="bg-background border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Daily Budget Check</h3>
              <p className="text-sm text-muted-foreground">Current streak: 12 days 🚀</p>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          
          <div className="mt-4 flex space-x-1">
            {Array(7).fill(null).map((_, i) => (
              <div 
                key={i}
                className="h-2 flex-1 rounded-full bg-primary" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
