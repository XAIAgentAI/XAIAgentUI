import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send } from 'lucide-react'

interface Message {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: Date;
}

interface ChatViewProps {
  agentName?: string;
  onBack?: () => void;
}

export default function ChatView({ agentName = 'AI Assistant', onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      text: '你好！我是你的AI助手，有什么我可以帮你的吗？',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate system response
    setTimeout(() => {
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        text: '这是一个模拟的回复。稍后将连接到实际的AI服务。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, systemMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mr-4 hover:bg-orange-50"
        >
          ←
        </Button>
        <h1 className="text-lg font-semibold">{agentName}</h1>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-black border border-neutral-200 shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg bg-white text-black border border-neutral-200 shadow-sm">
                正在输入...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="max-w-3xl mx-auto flex items-center space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
