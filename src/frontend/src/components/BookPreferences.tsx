import { useState, useEffect } from 'react';
import { useGetCallerBookPreferences, useSaveCallerBookPreferences } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const GENRE_OPTIONS = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  "Children's Books",
];

export default function BookPreferences() {
  const { data: preferences, isLoading } = useGetCallerBookPreferences();
  const saveMutation = useSaveCallerBookPreferences();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    if (preferences?.genres) {
      setSelectedGenres(preferences.genres);
    }
  }, [preferences]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync(selectedGenres);
      toast.success('Preferences saved successfully!');
    } catch (error) {
      toast.error('Failed to save preferences');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-leaf-green" />
      </div>
    );
  }

  return (
    <Card className="border-2 border-sage-light bg-cream/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest-green">
          <Sparkles className="h-5 w-5 text-leaf-green" />
          Your Book Preferences
        </CardTitle>
        <CardDescription>
          Select your favorite genres to get personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {GENRE_OPTIONS.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => handleGenreToggle(genre)}
                className="border-sage data-[state=checked]:bg-leaf-green data-[state=checked]:border-leaf-green"
              />
              <Label
                htmlFor={genre}
                className="text-sm font-medium text-sage cursor-pointer hover:text-forest-green transition-colors"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
        <Button
          onClick={handleSave}
          disabled={saveMutation.isPending || selectedGenres.length === 0}
          className="bg-leaf-green hover:bg-forest-green text-white"
        >
          {saveMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
