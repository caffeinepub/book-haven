import { useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AddBookForm() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  if (adminLoading || !isAdmin) {
    return null;
  }

  return (
    <Card className="border-2 border-warning bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-forest-green flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Add New Book (Not Available)
        </CardTitle>
        <CardDescription className="text-sage">
          This feature requires backend implementation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="default" className="border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-forest-green">Feature Not Available</AlertTitle>
          <AlertDescription className="text-sage">
            The ability to add books to the catalog requires the backend <code className="bg-sage-light px-1 rounded">addBook</code> method to be implemented. 
            Currently, the backend only supports viewing the book catalog.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
