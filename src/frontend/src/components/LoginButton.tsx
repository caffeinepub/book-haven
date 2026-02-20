import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      size="lg"
      className={
        isAuthenticated 
          ? 'border-2 border-warm-brown bg-cream text-warm-brown hover:bg-warm-brown hover:text-cream font-bold text-base px-6 py-3 shadow-md transition-all' 
          : 'bg-[oklch(0.28_0.12_35)] hover:bg-[oklch(0.22_0.13_32)] text-white font-bold text-base px-6 py-3 shadow-lg hover:shadow-xl transition-all ring-2 ring-[oklch(0.28_0.12_35)]/30'
      }
      variant={isAuthenticated ? 'outline' : 'default'}
    >
      {loginStatus === 'logging-in' ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Logging in...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-5 w-5" />
          Login / Sign Up
        </>
      )}
    </Button>
  );
}
