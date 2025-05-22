
import React from 'react';
import { Building2, Trophy, Gamepad2 } from 'lucide-react';

export const GamifiedFeatures = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Ultra Gamified Features</h2>
      <p>Making finance fun through interactive experiences</p>
      
      <div className="grid gap-4 mt-6">
        <div className="bg-background border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Build-a-City with Savings</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Save ₱500 to add a new building to your virtual town. Watch your savings transform into a thriving city!
              </p>
              <button className="mt-3 text-sm text-primary">Build Now →</button>
            </div>
          </div>
        </div>
        
        <div className="bg-background border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Level Up Your Avatar</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Hit financial goals to earn XP. Level up and unlock new badges or outfits for your character.
              </p>
              <button className="mt-3 text-sm text-primary">See Avatar →</button>
            </div>
          </div>
        </div>
        
        <div className="bg-background border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Gamepad2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Narrative Challenges</h3>
              <p className="text-sm text-muted-foreground mt-1">
                "You're stuck on a space station and need to save for repairs. Spend wisely!" Budgeting gamified like an RPG.
              </p>
              <button className="mt-3 text-sm text-primary">Start Adventure →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
