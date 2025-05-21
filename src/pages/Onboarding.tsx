
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, ArrowRight, Coins, Wallet, LeafyGreen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { completeOnboarding } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Track Spending and Income",
    description: "Easily log all your transactions to monitor where your money goes.",
    icon: Coins,
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Manage Multiple Wallets",
    description: "Keep track of different accounts and see your total balance.",
    icon: Wallet,
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Carbon Footprint Tracking",
    description: "Understand the environmental impact of your spending habits.",
    icon: LeafyGreen,
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "Mindful Spending Mode",
    description: "Get helpful prompts before making large purchases.",
    icon: MessageSquare, 
    color: "bg-purple-100 text-purple-700"
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const nextStep = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary rounded-full p-3 mb-4">
          <Sun className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Welcome to Trakr
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          Let's get you started
        </p>
      </div>
      
      <Card className="w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / features.length) * 100}%` }}
          />
        </div>
        
        <CardContent className="pt-8 pb-6 px-6">
          <div className="flex justify-center mb-6">
            <div className={`rounded-full p-4 ${features[currentStep].color}`}>
              {(() => {
                const Icon = features[currentStep].icon;
                return <Icon className="h-8 w-8" />;
              })()}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-3">
            {features[currentStep].title}
          </h2>
          
          <p className="text-center text-gray-600 mb-8">
            {features[currentStep].description}
          </p>
          
          <Button 
            onClick={nextStep} 
            className="w-full"
          >
            {currentStep < features.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
          
          <div className="flex justify-center mt-6">
            {features.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
