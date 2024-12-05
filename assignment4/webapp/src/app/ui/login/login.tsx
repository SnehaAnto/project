'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = loginMethod === 'email' 
        ? { email: identifier, password }
        : { username: identifier, password };

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        
        const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
        localStorage.setItem('userData', JSON.stringify({
          username: tokenPayload.username,
          email: tokenPayload.email,
          role: tokenPayload.role
        }));

        router.push('/timesheet');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/login-bg.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-8 p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="loginMethod" className="block text-sm font-medium text-gray-700">
              Login Method
            </label>
            <select
              id="loginMethod"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={loginMethod}
              onChange={(e) => setLoginMethod(e.target.value)}
            >
              <option value="" disabled>Select One</option>
              <option value="username">Login with Username</option>
              <option value="email">Login with Authorized Email</option>
            </select>
          </div>

          {loginMethod === 'username' ? (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          ) : loginMethod === 'email' ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          ) : null}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 