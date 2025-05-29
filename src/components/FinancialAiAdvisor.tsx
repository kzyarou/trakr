import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FinancialAiAdvisorProps {
  onBack?: () => void;
}

// Initial welcome message from the AI
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi there! I'm your personal financial AI advisor. I can help you with budgeting, saving strategies, debt management, investment advice, and more. What financial questions can I help you with today?",
  timestamp: new Date()
};

// Sample financial topics for suggestions
const SUGGESTION_TOPICS = [
  "How can I create a monthly budget?",
  "What's the best way to start saving for retirement?",
  "How can I pay off credit card debt faster?",
  "Should I invest in stocks or mutual funds?",
  "How much emergency fund should I have?",
  "What's the 50/30/20 budget rule?"
];

export default function FinancialAiAdvisor({ onBack }: FinancialAiAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([...SUGGESTION_TOPICS]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAiResponse = async (userQuery: string) => {
    // Personalized AI responses based on common financial questions
    const financialResponses: Record<string, string> = {
      budget: "Creating a budget is a great first step! Start by tracking all your income and expenses for a month. Then categorize your spending into necessities (50%), wants (30%), and savings/debt repayment (20%). This is known as the 50/30/20 rule. Would you like me to help you set up a basic budget template?",
      debt: "When tackling debt, I recommend either the avalanche method (paying highest interest rates first) or the snowball method (paying smallest debts first for psychological wins). The avalanche method saves you more money, but the snowball method can be more motivating. Which approach sounds better for your situation?",
      invest: "Investment strategies should align with your risk tolerance and timeline. For beginners, I typically recommend starting with a diversified portfolio of low-cost index funds. If you're saving for retirement, consider tax-advantaged accounts like a 401(k) or IRA. What's your investment timeline and risk tolerance?",
      save: "Building savings is crucial for financial security. Start with an emergency fund covering 3-6 months of expenses in a high-yield savings account. After that, you can save for specific goals like a home down payment, vacation, or retirement. What are you currently saving for?",
      emergency: "An emergency fund is your financial safety net. Aim for 3-6 months of essential expenses in an easily accessible account. Start small - even $1,000 can help with minor emergencies while you build toward your full fund. How much do you currently have saved for emergencies?",
      retire: "Retirement planning depends on your current age and desired retirement lifestyle. A good rule of thumb is to save 15% of your income for retirement. Tax-advantaged accounts like 401(k)s and IRAs offer significant benefits. How old are you, and have you started saving for retirement yet?",
      credit: "Your credit score impacts your financial options significantly. To improve it: pay bills on time, reduce credit card balances, avoid opening too many new accounts, and regularly check your credit report for errors. Would you like specific steps to improve your score?",
      insure: "Insurance protects your financial future. Everyone needs health insurance, auto insurance (if you drive), and renter's/homeowner's insurance. As you build wealth or have dependents, consider life and disability insurance too. What types of insurance do you currently have?",
      tax: "Tax planning can save you significant money. Keep track of potential deductions throughout the year, consider tax-advantaged accounts for specific goals, and if your situation is complex, consult with a tax professional. What specific tax concerns do you have?",
      housing: "Housing costs should ideally be under 30% of your gross income. When deciding whether to rent or buy, consider not just the monthly payment, but also property taxes, insurance, maintenance, how long you plan to stay, and the real estate market in your area. Are you currently renting or owning?"
    };

    // Lowercase query for easier matching
    const query = userQuery.toLowerCase();
    let response = "";

    // Check if the query contains any keywords we can match
    for (const [keyword, answer] of Object.entries(financialResponses)) {
      if (query.includes(keyword)) {
        response = answer;
        break;
      }
    }

    // If no specific match found, provide a general helpful response
    if (!response) {
      const generalResponses = [
        `That's a great financial question! Based on best practices, I'd recommend starting by tracking your spending and creating a budget that aligns with your financial goals. Would you like more specific advice on this topic?`,
        `Thank you for your question about ${query.split(' ').slice(0, 3).join(' ')}... To give you personalized advice, could you share a bit more about your current financial situation and goals?`,
        `Financial decisions should always consider your specific circumstances. Some key factors to think about are your income, expenses, debt, savings goals, and risk tolerance. How would you describe your current financial priorities?`,
        `That's something many people wonder about! The general advice would be to ensure you have an emergency fund first, then tackle high-interest debt, and finally invest for your goals. Where are you in this financial journey?`,
        `Great question! There are multiple approaches to this, depending on your specific situation. To give you the most helpful advice, could you tell me a bit more about your current financial circumstances?`
      ];
      
      // Pick a random general response
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Generate AI response
      const aiResponseText = await generateAiResponse(input);
      
      // Add AI response with slight delay for natural feeling
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: aiResponseText,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        
        // Update suggestions based on conversation
        updateSuggestions(input);
      }, 800);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setIsLoading(false);
      
      toast({
        title: "Error",
        description: "Unable to generate a response. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Update suggestions based on conversation context
  const updateSuggestions = (lastQuery: string) => {
    const lowercaseQuery = lastQuery.toLowerCase();
    
    // If budget was mentioned, suggest budget-related questions
    if (lowercaseQuery.includes('budget')) {
      setSuggestions([
        "How do I stick to my budget?",
        "What budgeting apps do you recommend?",
        "What's a zero-based budget?",
        "How do I budget for irregular expenses?"
      ]);
    }
    // If investing was mentioned, suggest investing questions
    else if (lowercaseQuery.includes('invest') || lowercaseQuery.includes('stock')) {
      setSuggestions([
        "What's the difference between stocks and bonds?",
        "How do I start investing with little money?",
        "What are index funds?",
        "Should I invest in cryptocurrency?"
      ]);
    }
    // If debt was mentioned, suggest debt-related questions
    else if (lowercaseQuery.includes('debt') || lowercaseQuery.includes('loan') || lowercaseQuery.includes('credit')) {
      setSuggestions([
        "What's the avalanche method for debt repayment?",
        "Should I consolidate my debt?",
        "How can I improve my credit score?",
        "Should I pay off debt or invest first?"
      ]);
    }
    // If saving was mentioned, suggest saving-related questions
    else if (lowercaseQuery.includes('save') || lowercaseQuery.includes('saving')) {
      setSuggestions([
        "Where should I keep my emergency fund?",
        "How can I save for a down payment on a house?",
        "What's a high-yield savings account?",
        "How much should I save each month?"
      ]);
    }
    // Otherwise, rotate through general financial topics
    else {
      setSuggestions([...SUGGESTION_TOPICS].sort(() => Math.random() - 0.5).slice(0, 4));
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Financial Advisor</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Your personal financial assistant
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4 no-scrollbar">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'user' ? 'You' : 'Financial Advisor'}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted max-w-[80%] rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs font-medium">Financial Advisor</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Suggestions */}
      {!isLoading && suggestions.length > 0 && (
        <div className="px-4 py-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about budgeting, saving, debt..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
