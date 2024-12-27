import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
}

export function ChatDetailDialog({ agentId, agentName }: ChatDetailDialogProps) {
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
        setError('Failed to load chat history');
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-xs sm:text-sm bg-brand-orange-500 text-white hover:bg-brand-orange-600">
          Chat with Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[600px] h-[80vh] sm:h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-brand-orange-500">
            Chat with {agentName}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="space-y-6 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-end gap-2">
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-brand-orange-500 flex items-center justify-center text-white text-xs">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-brand-orange-500 text-white'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-neutral-300 flex items-center justify-center text-white text-xs">
                      U
                    </div>
                  )}
                </div>
                <span className="text-xs text-neutral-500 mt-1 px-8">
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
          <div className="px-4 text-xs sm:text-sm text-red-500">
            {error}
          </div>
        )}

        <DialogFooter className="p-4 border-t">
          <div className="flex w-full gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-xs sm:text-sm"
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
              className="bg-brand-orange-500 text-white hover:bg-brand-orange-600"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
