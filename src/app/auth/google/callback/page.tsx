'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { continueWithGoogle, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      continueWithGoogle(code);
    } else {
      toast({
          variant: 'destructive',
          title: 'Google Sign-In Failed',
          description: 'Could not get authorization code from Google.',
      });
      router.push('/auth');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-lg">Finalizing your sign-in...</p>
        </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="flex items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        }>
            <GoogleCallback />
        </Suspense>
    )
}
