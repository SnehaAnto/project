'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HRGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Decode JWT to check role
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'hr') {
        router.push('/timesheet');
      }
    } catch (error) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
} 