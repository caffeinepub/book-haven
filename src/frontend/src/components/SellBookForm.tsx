import { useState } from 'react';
import { useSubmitSellRequest } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '../backend';
import CameraCapture from './CameraCapture';

interface SellBookFormProps {
  onSuccess?: () => void;
}

export default function SellBookForm({ onSuccess }: SellBookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState<ExternalBlob | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const submitMutation = useSubmitSellRequest();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
      setUploadProgress(percentage);
    });
    setCoverImage(blob);
    setImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);
  };

  const handleCameraCapture = (blob: ExternalBlob, preview: string) => {
    setCoverImage(blob);
    setImagePreview(preview);
    setShowCamera(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !price || !coverImage) {
      toast.error('Please fill in all fields and upload a book cover');
      return;
    }

    const priceNum = parseInt(price);
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      await submitMutation.mutateAsync({
        title,
        author,
        price: BigInt(priceNum),
        coverImage,
      });
      toast.success('Book submitted successfully! We will review it soon.');
      setTitle('');
      setAuthor('');
      setPrice('');
      setCoverImage(null);
      setImagePreview(null);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to submit book');
    }
  };

  if (showCamera) {
    return (
      <CameraCapture
        onCapture={handleCameraCapture}
        onCancel={() => setShowCamera(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title" className="text-forest-green font-semibold">
          Book Title *
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          className="mt-2 border-sage-light focus:border-leaf-green"
          required
        />
      </div>

      <div>
        <Label htmlFor="author" className="text-forest-green font-semibold">
          Author *
        </Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          className="mt-2 border-sage-light focus:border-leaf-green"
          required
        />
      </div>

      <div>
        <Label htmlFor="price" className="text-forest-green font-semibold">
          Price (₹) *
        </Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price in rupees"
          className="mt-2 border-sage-light focus:border-leaf-green"
          min="0"
          required
        />
      </div>

      <div>
        <Label className="text-forest-green font-semibold mb-2 block">
          Book Cover Image *
        </Label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            className="flex-1 border-2 border-sage-light hover:border-leaf-green"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCamera(true)}
            className="flex-1 border-2 border-sage-light hover:border-leaf-green"
          >
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <div className="w-full bg-sage-light rounded-full h-2">
              <div
                className="bg-leaf-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-sage mt-1">Uploading: {uploadProgress}%</p>
          </div>
        )}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Book cover preview"
              className="w-32 h-40 object-cover rounded border-2 border-sage-light"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-forest-green hover:bg-forest-green/90 text-white font-semibold"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Book for Sale'
        )}
      </Button>
    </form>
  );
}
