import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Settings } from '@/components/Settings'
import Agents from '@/pages/Agents'

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

        <Settings 
          language={selectedLanguage} 
          onLanguageChange={(lang) => {
            setSelectedLanguage(lang);
            localStorage.setItem('preferredLanguage', lang);
          }} 
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <Agents />
      </main>
    </div>
  )
}

export default App
