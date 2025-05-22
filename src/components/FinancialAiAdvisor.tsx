
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: 'Hello! I\'m your financial advisor. I\'m here to help you manage your money better. What financial questions do you have today?',
  timestamp: new Date(),
};

export default function FinancialAiAdvisor({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Mock AI response function - in a real app, this would be a call to an API
  const generateAiResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          "Based on your financial situation, I'd recommend creating a budget that follows the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt payments.",
          "Looking at your expenses, I notice you might be spending more than average on dining out. Consider cooking at home more often to save money.",
          "For your savings goal, try setting up automatic transfers to a separate account right after payday. You won't miss what you don't see!",
          "Remember to build an emergency fund that covers 3-6 months of expenses before focusing on other financial goals.",
          "When tackling debt, you might want to try either the avalanche method (highest interest first) or the snowball method (smallest balance first).",
          "I see you're interested in investing. For beginners, index funds are a great low-cost way to get started with diversification.",
          "That's a great question! To improve your credit score, focus on paying bills on time, keeping credit card balances low, and avoiding opening too many new accounts at once."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1500); // Simulating API delay
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const aiResponse = await generateAiResponse(input);
      
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        }
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">Financial AI Advisor</h2>
        <div className="w-8" /> {/* Empty div for spacing */}
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-200px)] p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center absolute -left-4 -top-2">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <CardContent className="p-3">
                    <p>{message.content}</p>
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-end space-x-2">
          <Textarea
            placeholder="Ask me anything about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-center mt-2 text-muted-foreground">
          Tip: Press Enter to send, Shift+Enter for a new line
        </div>
      </div>
    </div>
  );
}
