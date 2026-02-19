import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { toast } from 'sonner';

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
}

export default function VoiceSearchButton({ onTranscript }: VoiceSearchButtonProps) {
  const { isListening, transcript, error, startListening, stopListening, isSupported } = useVoiceSearch();

  const handleClick = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        onTranscript(transcript);
      }
    } else {
      if (!isSupported) {
        toast.error('Voice search is not supported in your browser');
        return;
      }
      startListening();
    }
  };

  if (error) {
    toast.error(`Voice search error: ${error}`);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`${
        isListening
          ? 'text-leaf-green hover:text-forest-green animate-pulse'
          : 'text-sage hover:text-forest-green'
      }`}
      title={isListening ? 'Stop listening' : 'Start voice search'}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
}
