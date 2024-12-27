import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


interface SettingsProps {
  language: string;
  onLanguageChange: (value: string) => void;
}

export function Settings({ language, onLanguageChange }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="mt-auto w-full bg-brand-orange-600 text-white hover:bg-brand-orange-700 border-brand-orange-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        Settings
      </Button>
      {isOpen && (
        <div className="absolute bottom-full mb-2 w-full p-4 bg-white rounded-lg shadow-lg border border-brand-orange-200">
          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
