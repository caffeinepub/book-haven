import { useState } from 'react';
import { useAddBook, useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, Plus } from 'lucide-react';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

export default function AddBookForm() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const addBook = useAddBook();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (adminLoading || !isAdmin) {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coverImage) {
      toast.error('Please select a cover image');
      return;
    }

    try {
      const imageBytes = new Uint8Array(await coverImage.arrayBuffer());
      const blob = ExternalBlob.fromBytes(imageBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const bookId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const priceInCents = Math.round(parseFloat(price) * 100);

      await addBook.mutateAsync({
        id: bookId,
        title,
        author,
        price: BigInt(priceInCents),
        coverImage: blob,
      });

      // Reset form
      setTitle('');
      setAuthor('');
      setPrice('');
      setCoverImage(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      
      toast.success('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book. Please try again.');
    }
  };

  return (
    <Card className="border-2 border-leaf-green bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-forest-green flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Book
        </CardTitle>
        <CardDescription className="text-sage">
          Add a new book to the catalog (Admin only)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-forest-green">Book Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-sage-light focus:border-leaf-green"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-forest-green">Author</Label>
              <Input
                id="author"
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="border-sage-light focus:border-leaf-green"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-forest-green">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border-sage-light focus:border-leaf-green"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover" className="text-forest-green">Cover Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="cover"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="border-sage-light focus:border-leaf-green"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-20 w-16 object-cover rounded border-2 border-sage-light"
                />
              )}
            </div>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-sage">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-sage-light rounded-full h-2">
                <div
                  className="bg-leaf-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={addBook.isPending}
            className="w-full bg-leaf-green hover:bg-forest-green text-white"
          >
            {addBook.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Book...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Add Book
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
