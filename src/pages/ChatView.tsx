import * as React from "react";
import { useParams } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Network, FolderPlus, Wallet } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatView() {
  const { agentId } = useParams();
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
      }
    };
    fetchMessages();
  }, [agentId]);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Column (Sidebar) */}
      <div className="hidden md:block w-64 border-r border-gray-200 flex flex-col h-full">
        {/* Logo Area */}
        <div className="flex items-center justify-center py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-brand-orange-500">XAIAgent</h1>
        </div>

        {/* Function Modules */}
        <div className="p-4">
          <ul>
            <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span>探索AI Agent</span>
            </li>
          </ul>
        </div>

        {/* Today's Content */}
        <div className="p-4">
          <h3 className="font-semibold mb-2">今天</h3>
          <ul>
            <li className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm">
              xxxxxx
            </li>
          </ul>
        </div>

        {/* Last 7 Days */}
        <div className="p-4">
          <h3 className="font-semibold mb-2">前7天</h3>
          <div className="overflow-y-auto max-h-32">
            <ul className="space-y-1">
              <li className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm">
                xxxxxx
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm">
                xxxxxx
              </li>
            </ul>
          </div>
        </div>

        {/* Wallet Management */}
        <div className="mt-auto flex flex-col gap-2 p-4 border-t border-gray-200">
          <button className="flex items-center gap-2 hover:scale-105 transition-transform p-2 text-sm">
            <Network className="h-4 w-4" />
            <span>连接钱包</span>
          </button>
          <button className="flex items-center gap-2 hover:scale-105 transition-transform p-2 text-sm">
            <FolderPlus className="h-4 w-4" />
            <span>创建钱包</span>
          </button>
          <button className="flex items-center gap-2 hover:scale-105 transition-transform p-2 text-sm">
            <Wallet className="h-4 w-4" />
            <span>打开钱包</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <button className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetContent side="left" className="w-64 p-0 block md:hidden">
          {/* Mobile Sidebar - Same content as desktop */}
          <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="flex items-center justify-center py-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-brand-orange-500">XAIAgent</h1>
            </div>

            {/* Function Modules */}
            <div className="p-4">
              <ul>
                <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span>探索AI Agent</span>
                </li>
              </ul>
            </div>

            {/* Today's Content */}
            <div className="p-4">
              <h3 className="font-semibold mb-2">今天</h3>
              <ul>
                <li className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm">
                  xxxxxx
                </li>
              </ul>
            </div>

            {/* Last 7 Days */}
            <div className="p-4">
              <h3 className="font-semibold mb-2">前7天</h3>
              <div className="overflow-y-auto max-h-32">
                <ul className="space-y-1">
                  <li className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm">
                    xxxxxx
                  </li>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm">
                    xxxxxx
                  </li>
                </ul>
              </div>
            </div>

            {/* Wallet Management */}
            <div className="mt-auto flex flex-col gap-2 p-4 border-t border-gray-200">
              <button className="flex items-center gap-2 hover:scale-105 transition-transform p-2 text-sm">
                <Network className="h-4 w-4" />
                <span>连接钱包</span>
              </button>
              <button className="flex items-center gap-2 hover:scale-105 transition-transform p-2 text-sm">
                <FolderPlus className="h-4 w-4" />
                <span>创建钱包</span>
              </button>
              <button className="flex items-center gap-2 hover:scale-105 transition-transform p-2 text-sm">
                <Wallet className="h-4 w-4" />
                <span>打开钱包</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Right Column (Main chat content) */}
      <div className="flex-1 flex flex-col">
        {/* Title and Creator Info */}
        <div className="p-6 border-b text-center">
          <h1 className="text-2xl font-semibold mb-2">xxxxxx</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">创建者：xxxxxx</span>
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <img src="/placeholder-avatar.png" alt="Creator" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto">xxxxxx</p>
        </div>

        {/* Function Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 p-4">
          <button className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:border-brand-orange-500 hover:shadow-md transition-all">
            xxxxxx
          </button>
          <button className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:border-brand-orange-500 hover:shadow-md transition-all">
            xxxxxx
          </button>
          <button className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:border-brand-orange-500 hover:shadow-md transition-all">
            xxxxxx
          </button>
          <button className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:border-brand-orange-500 hover:shadow-md transition-all">
            xxxxxx
          </button>
        </div>

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

        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto w-full">
            <div className="relative w-full md:w-4/5 mx-auto">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2h4.586A2 2 0 0112 3.586L15.414 7A2 2 0 0116 8.414V15a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 0v10h8V8.414L11.586 6H6V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </div>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="给'xxxxxx'发送消息"
                className="w-full pl-10 pr-10 py-4 rounded-2xl border-gray-200 focus:border-brand-orange-500 focus:ring-brand-orange-500"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-orange-400 text-white hover:bg-brand-orange-500 rounded-xl p-2 min-w-[40px] h-[40px] flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">AI Agent也可能会犯错，请核查重要信息。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
