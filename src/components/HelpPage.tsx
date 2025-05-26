
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Wallet, 
  PieChart, 
  BarChart2, 
  Lightbulb, 
  UserIcon, 
  Trophy, 
  Heart, 
  MessagesSquare,
  LeafyGreen,
  MessageSquare,
  Target,
  TrendingUp,
  Calculator,
  Settings
} from 'lucide-react';

const HelpPage = () => {
  const features = [
    {
      category: "Core Features",
      items: [
        {
          icon: <Wallet className="h-5 w-5" />,
          title: "Transaction Management",
          description: "Add, edit, and track all your income and expenses. Categorize transactions and add descriptions for better organization.",
          features: ["Income & expense tracking", "Category assignment", "Payment method selection", "Transaction descriptions", "Date selection"]
        },
        {
          icon: <PieChart className="h-5 w-5" />,
          title: "Budget Management",
          description: "Set monthly budgets for different categories and track your spending against them.",
          features: ["Category budgets", "Spending limits", "Budget progress tracking", "Overspending alerts"]
        },
        {
          icon: <BarChart2 className="h-5 w-5" />,
          title: "Reports & Analytics",
          description: "Visualize your financial data with comprehensive charts and reports.",
          features: ["Spending by category", "Income vs expenses", "Monthly trends", "Cash flow analysis", "Payment method breakdown"]
        },
        {
          icon: <Wallet className="h-5 w-5" />,
          title: "Multi-Wallet Support",
          description: "Manage multiple accounts like checking, savings, credit cards, and cash.",
          features: ["Multiple wallets", "Balance tracking", "Wallet-specific transactions", "Currency support"]
        }
      ]
    },
    {
      category: "Smart Features",
      items: [
        {
          icon: <MessagesSquare className="h-5 w-5" />,
          title: "AI Financial Advisor",
          description: "Get personalized financial advice and insights based on your spending patterns.",
          features: ["Spending analysis", "Budget recommendations", "Financial tips", "Goal suggestions"]
        },
        {
          icon: <MessageSquare className="h-5 w-5" />,
          title: "Mindful Spending",
          description: "Pause and reflect before making large purchases with built-in prompts.",
          features: ["Large purchase alerts", "Reflection questions", "Spending awareness", "Decision support"]
        },
        {
          icon: <LeafyGreen className="h-5 w-5" />,
          title: "Carbon Impact Tracking",
          description: "Track the environmental impact of your purchases, especially for travel and transportation.",
          features: ["Carbon footprint estimates", "Environmental awareness", "Sustainable spending insights"]
        }
      ]
    },
    {
      category: "Behavioral Features",
      items: [
        {
          icon: <UserIcon className="h-5 w-5" />,
          title: "Financial Personality Quiz",
          description: "Discover your financial personality type and get personalized recommendations.",
          features: ["Personality assessment", "Custom insights", "Tailored advice", "Behavior understanding"]
        },
        {
          icon: <Trophy className="h-5 w-5" />,
          title: "Behavioral Streaks",
          description: "Build positive financial habits with streak tracking and achievements.",
          features: ["Habit tracking", "Streak counters", "Achievement badges", "Progress motivation"]
        },
        {
          icon: <Heart className="h-5 w-5" />,
          title: "Shame-Free Mode",
          description: "Focus on positive financial growth without judgment or negative language.",
          features: ["Positive reinforcement", "Non-judgmental feedback", "Encouraging language", "Mental health focus"]
        },
        {
          icon: <Trophy className="h-5 w-5" />,
          title: "Gamified Features",
          description: "Make financial management fun with points, levels, and challenges.",
          features: ["Points system", "Level progression", "Financial challenges", "Leaderboards"]
        }
      ]
    },
    {
      category: "Tools & Utilities",
      items: [
        {
          icon: <Lightbulb className="h-5 w-5" />,
          title: "Mini Tools",
          description: "Quick access to useful financial calculators and utilities.",
          features: ["Basic calculator", "Tip calculator", "Currency converter", "Budget calculator"]
        },
        {
          icon: <Target className="h-5 w-5" />,
          title: "Goal Tracking",
          description: "Set and track financial goals like saving for vacation or paying off debt.",
          features: ["Savings goals", "Debt payoff tracking", "Progress visualization", "Timeline planning"]
        },
        {
          icon: <Heart className="h-5 w-5" />,
          title: "Mindful Add-Ons",
          description: "Connect your financial health with mental well-being and mindfulness.",
          features: ["Meditation reminders", "Gratitude practices", "Stress management", "Well-being tracking"]
        }
      ]
    },
    {
      category: "Customization",
      items: [
        {
          icon: <Settings className="h-5 w-5" />,
          title: "Settings & Preferences",
          description: "Customize your experience with themes, currencies, and personal preferences.",
          features: ["Dark/light theme", "Currency selection", "Language preferences", "Notification settings"]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Help & Features</h2>
        <p className="text-muted-foreground">
          Comprehensive guide to all Trakr features and how to use them effectively.
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-8">
          {features.map((category) => (
            <div key={category.category} className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{category.category}</h3>
                <Badge variant="secondary">{category.items.length} features</Badge>
              </div>
              
              <div className="grid gap-4">
                {category.items.map((feature) => (
                  <Card key={feature.title}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {feature.icon}
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Key Features:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-muted-foreground">
                          {feature.features.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {category.category !== "Customization" && <Separator />}
            </div>
          ))}

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Getting Started Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium">Quick Start Guide:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Set up your wallets (checking, savings, credit cards)</li>
                  <li>Create your first transaction using the + button</li>
                  <li>Set monthly budgets for your main spending categories</li>
                  <li>Take the personality quiz to get personalized insights</li>
                  <li>Enable mindful spending for better financial awareness</li>
                  <li>Check your reports weekly to track progress</li>
                </ol>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium">Pro Tips:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use tags to track specific projects or reimbursable expenses</li>
                  <li>• Enable shame-free mode if you struggle with financial anxiety</li>
                  <li>• Set up behavioral streaks to build positive money habits</li>
                  <li>• Review your AI advisor suggestions regularly for insights</li>
                  <li>• Use the mini tools for quick calculations while shopping</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpPage;
