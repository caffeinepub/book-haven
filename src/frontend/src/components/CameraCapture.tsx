import { useCamera } from '../camera/useCamera';
import { Button } from '@/components/ui/button';
import { Camera, X, SwitchCamera, Loader2 } from 'lucide-react';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

interface CameraCaptureProps {
  onCapture: (blob: ExternalBlob, preview: string) => void;
  onCancel: () => void;
}

export default function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const {
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    retry,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: 'environment',
    quality: 0.9,
    format: 'image/jpeg',
  });

  const handleCapture = async () => {
    const file = await capturePhoto();
    if (!file) {
      toast.error('Failed to capture photo');
      return;
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes);
    const preview = URL.createObjectURL(file);
    onCapture(blob, preview);
  };

  const handleSwitchCamera = async () => {
    const newMode = currentFacingMode === 'user' ? 'environment' : 'user';
    await switchCamera(newMode);
  };

  if (isSupported === false) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">Camera is not supported on this device</p>
        <Button onClick={onCancel} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-2">Camera Error: {error.message}</p>
        <p className="text-sm text-sage mb-4">
          {error.type === 'permission' && 'Please allow camera access in your browser settings'}
          {error.type === 'not-found' && 'No camera found on this device'}
          {error.type === 'not-supported' && 'Camera is not supported on this device'}
          {error.type === 'unknown' && 'An unknown error occurred'}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={retry} variant="outline">
            Retry
          </Button>
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ minHeight: '400px', aspectRatio: '4/3' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ display: isActive ? 'block' : 'none' }}
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {!isActive && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-sage-light/20">
            <Button onClick={startCamera} size="lg" className="bg-forest-green hover:bg-forest-green/90">
              <Camera className="mr-2 h-5 w-5" />
              Start Camera
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-sage-light/20">
            <Loader2 className="h-12 w-12 animate-spin text-leaf-green" />
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleCapture}
          disabled={!isActive || isLoading}
          className="bg-leaf-green hover:bg-forest-green text-white"
        >
          <Camera className="mr-2 h-4 w-4" />
          Capture Photo
        </Button>
        
        <Button
          onClick={handleSwitchCamera}
          disabled={!isActive || isLoading}
          variant="outline"
          className="border-sage-light"
        >
          <SwitchCamera className="mr-2 h-4 w-4" />
          Switch
        </Button>

        <Button onClick={onCancel} variant="outline" className="border-sage-light">
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
