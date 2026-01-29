import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const faqs = [
  { question: 'How do I track my order?', answer: 'You can track your order from the Dashboard > My Orders section. Click on any order to see its current status and tracking information.' },
  { question: 'What is the return policy?', answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Visit our Returns page for more details.' },
  { question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery. Free shipping on orders over ৳5,000.' },
  { question: 'How can I contact support?', answer: 'You can reach us via this chat, email at info@saracodelabs.com.bd, or call us at +880-1234-567890 during business hours.' },
  { question: 'Do you offer international shipping?', answer: 'Currently, we ship within Bangladesh only. International shipping will be available soon!' },
  { question: 'How do I change my password?', answer: 'Go to Dashboard > Profile Settings and click on "Change Password" to update your password securely.' },
];

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to SaraCodeLabsShop support. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showFAQs, setShowFAQs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setShowFAQs(false);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! Our support team will get back to you shortly. In the meantime, feel free to check our FAQs below.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setShowFAQs(true);
    }, 1000);
  };

  const handleFAQClick = (faq: typeof faqs[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: faq.answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  return (
    <>
      {/* Chat Toggle Button - Hidden on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg items-center justify-center transition-all hover:scale-110 hidden lg:flex',
          isOpen && '!hidden'
        )}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-[400px] h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col animate-scale-in lg:bottom-6 lg:right-6">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">SaraCodeLabsShop Support</h3>
                <p className="text-xs opacity-80">We typically reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.isUser ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={cn(
                    'text-xs mt-1',
                    message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Quick FAQs */}
            {showFAQs && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <HelpCircle size={14} />
                  <span>Quick Questions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {faqs.slice(0, 4).map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleFAQClick(faq)}
                      className="text-xs bg-surface hover:bg-surface-hover text-foreground px-3 py-2 rounded-full border border-border transition-colors text-left"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
