import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { MessageSquarePlus } from "lucide-react"
import { Link } from "react-router-dom"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")

  const handleSend = () => {
    if (currentInput.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: currentInput,
      timestamp: new Date()
    }

    // Add assistant message (mock response)
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '这是一个模拟的助手回复。在实际应用中，这里将集成真实的AI响应。',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setCurrentInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex">
        <Sidebar>
          <SidebarHeader>
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <Link to="/chat">
                <MessageSquarePlus className="mr-2" />
                新对话
              </Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            {messages.length > 0 && (
              <div className="px-2 py-1">
                <div className="text-sm text-neutral-500 truncate">
                  当前对话 ({messages.length} 条消息)
                </div>
              </div>
            )}
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1">
          <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 sm:px-6">
            {/* Messages Area */}
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-6 py-4">
          {messages.length === 0 ? (
            <div className="text-center text-neutral-500 mt-12">
              <h2 className="text-2xl font-semibold mb-3 text-neutral-900 dark:text-white">欢迎使用 XAIAgent</h2>
              <p className="text-lg">开始一个新的对话吧！</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    message.role === 'assistant'
                      ? 'bg-white text-neutral-900 dark:bg-zinc-800 dark:text-white'
                      : 'bg-brand-orange-500 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'assistant'
                        ? 'text-neutral-500 dark:text-neutral-400'
                        : 'text-orange-100'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-neutral-50 dark:bg-zinc-900 pt-4 pb-6">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="flex-1">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入消息..."
              className="min-h-[2.75rem] bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700 shadow-sm"
            />
          </div>
          <Button
            onClick={handleSend}
            className="bg-brand-orange-500 text-white hover:bg-brand-orange-600 transition-colors duration-200 min-h-[2.75rem] px-6"
            disabled={!currentInput.trim()}
          >
            发送
          </Button>
        </div>
      </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
