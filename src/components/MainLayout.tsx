import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Settings } from '@/components/Settings'
import { Link } from "react-router-dom"

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold text-brand-orange-500">
                XAIAgent
              </Link>
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
                asChild
              >
                <Link to="/chat">New Chat</Link>
              </Button>

              <Settings 
                language="en"
                onLanguageChange={(lang) => {
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
        <Outlet />
      </main>
    </div>
  )
}
