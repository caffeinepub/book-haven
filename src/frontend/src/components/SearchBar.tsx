import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import VoiceSearchButton from './VoiceSearchButton';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sage" />
        <Input
          type="text"
          placeholder="Search for books by title or author..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-24 py-6 text-lg border-2 border-sage-light focus:border-leaf-green rounded-full shadow-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <VoiceSearchButton onTranscript={onChange} />
          {value && (
            <Button
              variant="ghost"
              size="icon"
              className="text-sage hover:text-forest-green"
              onClick={() => onChange('')}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
