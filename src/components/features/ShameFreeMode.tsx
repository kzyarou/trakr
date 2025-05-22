
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ShameFreeMode = () => {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Shame-Free Mode</h2>
      <p>Positive, non-judgmental language for your financial journey</p>
      
      <div className="mt-6 space-y-6">
        <div className="flex items-center space-x-2">
          <Switch id="shame-free" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="shame-free">Enable Shame-Free Mode</Label>
        </div>
        
        <div className="space-y-4 mt-4">
          <h3 className="font-medium">When enabled:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>No red warnings or negative language</li>
            <li>Supportive framing of financial setbacks</li>
            <li>Progress-focused notifications</li>
            <li>Recovery-friendly terminology</li>
          </ul>
          
          <div className="p-4 bg-muted rounded-lg mt-4">
            <h4 className="font-medium mb-2">Example:</h4>
            <p className="text-muted-foreground mb-2">
              <strong>Instead of:</strong> "You overspent by $50! Budget violated."
            </p>
            <p className="text-muted-foreground">
              <strong>You'll see:</strong> "Budget adjusted. Next week brings new opportunities to align spending with your goals."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
