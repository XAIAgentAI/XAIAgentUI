import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Settings } from '@/components/Settings'
import { NavBar } from '@/components/NavBar'
import Agents from '@/pages/Agents'
import { FeaturedAgents } from '@/components/FeaturedAgents'
import { Training } from '@/pages/Training'
import { AgentDetail } from '@/pages/AgentDetail'

const SUPPORTED_LANGUAGES = ['en', 'zh', 'es', 'ja', 'ko'];

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Check for saved preference in localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
    return 'en'; // Default fallback
  });

  // Detect browser language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (!savedLanguage) {
      // For testing: allow override of browser language
      const testLang = localStorage.getItem('testBrowserLanguage');
      // Get browser language and normalize to just the language code
      const browserLang = (testLang || navigator.language).split('-')[0].toLowerCase();
      console.log('Detected browser language:', browserLang);
      
      if (SUPPORTED_LANGUAGES.includes(browserLang)) {
        console.log('Setting language to:', browserLang);
        setSelectedLanguage(browserLang);
        localStorage.setItem('preferredLanguage', browserLang);
      } else {
        console.log('Browser language not supported, defaulting to en');
      }
    } else {
      console.log('Using saved language:', savedLanguage);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-neutral-50">
        {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-brand-orange-500">XAIAgent</h1>
            </div>

            {/* Categories Navigation */}
            <div className="ml-6">
              <NavBar />
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                <Input 
                  placeholder="Search conversations..." 
                  className="w-full pl-10 bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus:border-brand-orange-500 focus:ring-brand-orange-500"
                />
              </div>
            </div>

            {/* Right Section - New Chat & Settings */}
            <div className="flex items-center gap-4">
              <Button 
                variant="secondary"
                className="hidden sm:flex items-center gap-2 bg-brand-orange-500 text-white hover:bg-brand-orange-600"
              >
                <span>New Chat</span>
              </Button>

              <Settings 
                language={selectedLanguage} 
                onLanguageChange={(lang) => {
                  setSelectedLanguage(lang);
                  localStorage.setItem('preferredLanguage', lang);
                }} 
              />
            </div>
          </div>

          {/* Mobile Search (visible on small screens) */}
          <div className="sm:hidden py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
              <Input 
                placeholder="Search conversations..." 
                className="w-full pl-10 bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus:border-brand-orange-500 focus:ring-brand-orange-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<FeaturedAgents />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/training" element={<Training />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
        </Routes>
      </main>
      </div>
    </BrowserRouter>
  )
}

export default App
