
import React from 'react';
import { Heart, BookOpen } from 'lucide-react';

export const MindfulAddons = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Mindful & Spiritual Add-Ons</h2>
      <p>Connect finances with your well-being</p>
      
      <div className="grid gap-4 mt-6">
        <div className="bg-background border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Gratitude Spending Journal</h3>
              <p className="text-sm text-muted-foreground mt-1">
                After big purchases, reflect: "Was this worth it? What did it give you emotionally?" Encourage mindful consumption.
              </p>
              <button className="mt-3 text-sm text-primary">Open Journal →</button>
            </div>
          </div>
        </div>
        
        <div className="bg-background border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">"Future You" Mode</h3>
              <p className="text-sm text-muted-foreground mt-1">
                See simulated letters from your future self based on current habits. "Thanks for quitting impulse spending!"
              </p>
              <button className="mt-3 text-sm text-primary">Read Letter →</button>
            </div>
          </div>
        </div>
        
        <div className="bg-background border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Money + Meditation Integration</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Calm audio sessions that reflect on spending intentions, financial anxiety, or letting go of materialism.
              </p>
              <button className="mt-3 text-sm text-primary">Begin Session →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
