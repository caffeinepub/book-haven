import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SellBookFormProps {
  onSuccess?: () => void;
}

export default function SellBookForm({ onSuccess }: SellBookFormProps) {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="border-warning bg-warning/10">
        <AlertCircle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-forest-green">Feature Not Available</AlertTitle>
        <AlertDescription className="text-sage">
          The ability to submit books for sale requires the backend <code className="bg-sage-light px-1 rounded">submitSellRequest</code> method to be implemented. 
          This feature is currently unavailable.
        </AlertDescription>
      </Alert>
      
      <div className="text-center py-8 text-sage">
        <p className="mb-4">We're working on enabling this feature.</p>
        <p className="text-sm">Check back soon to sell your books!</p>
      </div>
      
      <Button
        type="button"
        disabled
        className="w-full bg-sage-light text-sage cursor-not-allowed"
      >
        Submit Book for Sale (Coming Soon)
      </Button>
    </div>
  );
}
