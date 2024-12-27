import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatDetailDialogProps {
  agentId: string;
  agentName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDetailDialog({ agentId, agentName, isOpen, onClose }: ChatDetailDialogProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat/${agentId}/messages`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data.messages);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        // Don't show error initially
        // setError('Failed to load chat history');
      }
    };
    fetchMessages();
  }, [agentId]);

  React.useEffect(() => {
    const scrollToBottom = () => {
      const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    };
    // Scroll when messages change or when typing status changes
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add optimistic update for user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      const response = await fetch(`/api/chat/${agentId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages(prev => [...prev, {
        ...data.message,
        timestamp: new Date(),
      }]);
      setNewMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-screen max-w-none m-0 p-0 rounded-none border-none bg-white">
        <DialogHeader className="px-4 py-3 bg-white flex items-center justify-between">
          <DialogTitle className="text-lg">
            Chat with {agentName}
          </DialogTitle>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto space-y-4 p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-end gap-2">
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-brand-orange-500 flex items-center justify-center text-white text-sm">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-3 text-base ${
                      message.role === 'user'
                        ? 'bg-brand-orange-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">
                      U
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 px-8">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-orange-500 flex items-center justify-center text-white text-xs">
                  AI
                </div>
                <div className="flex items-center gap-1 text-neutral-500 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {error && (
          <div className="px-4 py-2 text-xs sm:text-sm text-gray-500 text-center">
            {error}
          </div>
        )}

        <DialogFooter className="p-4 border-t bg-white sticky bottom-0">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex w-full gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter message..."
                className="flex-1 text-base py-4 px-4 rounded-2xl border-gray-200 focus:border-brand-orange-500 focus:ring-brand-orange-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !newMessage.trim()}
                className="bg-brand-orange-400 text-white hover:bg-brand-orange-500 rounded-2xl p-3 min-w-[48px] h-[48px] flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
