import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SuggestedPrompt {
  title: string;
  description: string;
}

function App() {
  const [selectedModel, setSelectedModel] = useState('Default Model')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  
  const suggestedPrompts: SuggestedPrompt[] = [
    { title: 'Grammar check', description: 'rewrite it for better readability' },
    { title: 'Tell me a fun fact', description: 'about the Roman Empire' },
    { title: 'Help me study', description: 'vocabulary for a college entrance exam' },
    { title: 'Overcome procrastination', description: 'give me tips' },
  ]

  return (
    <div className="flex h-screen bg-brand-orange-50">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-orange-500 text-white p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-xl font-bold">XAIAgent</h1>
        </div>
        
        {/* New Chat Button */}
        <Button 
          variant="secondary" 
          className="mb-4 w-full bg-white text-brand-orange-500 hover:bg-brand-orange-50 flex items-center gap-2"
        >
          <span className="flex-1">New Chat</span>
        </Button>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-brand-orange-300" size={18} />
          <Input 
            placeholder="Search conversations..." 
            className="w-full pl-8 bg-brand-orange-600/50 border-brand-orange-400 text-white placeholder:text-brand-orange-200"
          />
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Model</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full bg-brand-orange-600 text-white border-brand-orange-400">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default Model">Default Model</SelectItem>
              <SelectItem value="GPT-4">GPT-4</SelectItem>
              <SelectItem value="Claude">Claude</SelectItem>
              <SelectItem value="Llama-2">Llama-2</SelectItem>
              <SelectItem value="Mixtral">Mixtral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Language</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full bg-brand-orange-600 text-white border-brand-orange-400">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Korean">Korean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Settings Button */}
        <Button 
          variant="outline" 
          className="mt-auto w-full bg-brand-orange-600 text-white hover:bg-brand-orange-700 border-brand-orange-400"
        >
          Settings
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Initial State with Suggested Prompts */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Suggested</h2>
            <div className="grid grid-cols-2 gap-4">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="p-4 text-left rounded-lg border border-brand-orange-200 hover:border-brand-orange-500 transition-colors group"
                >
                  <h3 className="font-medium text-gray-900 group-hover:text-brand-orange-500">{prompt.title}</h3>
                  <p className="text-sm text-gray-500">{prompt.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-brand-orange-200 p-4">
          <div className="relative">
            <Textarea
              className="w-full pr-24 border-brand-orange-200 focus:border-brand-orange-500 focus:ring-brand-orange-200 resize-none"
              placeholder="Type your message..."
              rows={3}
            />
            <Button 
              className="absolute right-2 bottom-2 bg-brand-orange-500 text-white hover:bg-brand-orange-600"
            >
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
