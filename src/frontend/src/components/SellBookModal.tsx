import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SellBookForm from './SellBookForm';

interface SellBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SellBookModal({ open, onOpenChange }: SellBookModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream border-2 border-sage-light">
        <DialogHeader>
          <DialogTitle className="text-2xl text-forest-green">
            Sell Your Book
          </DialogTitle>
          <DialogDescription className="text-sage">
            Fill in the details below and we'll review your book for listing on our platform.
          </DialogDescription>
        </DialogHeader>
        <SellBookForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
