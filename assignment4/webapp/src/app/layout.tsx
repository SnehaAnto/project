'use client';
import localFont from "next/font/local";
import "./globals.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('');

  const checkUserRole = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
      } catch (error) {
        setUserRole('');
      }
    } else {
      setUserRole('');
    }
  };

  useEffect(() => {
    checkUserRole();

    // Add event listener for storage changes
    window.addEventListener('storage', checkUserRole);
    
    // Custom event listener for auth changes
    window.addEventListener('authStateChange', checkUserRole);

    return () => {
      window.removeEventListener('storage', checkUserRole);
      window.removeEventListener('authStateChange', checkUserRole);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    setUserRole('');
    router.push('/login');
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 font-bold text-xl">Timesheet App</span>
                {userRole === 'hr' && (
                  <a
                    href="/hr"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    HR Dashboard
                  </a>
                )}
                {userRole && (
                  <a
                    href="/timesheet"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Timesheet
                  </a>
                )}
              </div>
              {userRole && (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
