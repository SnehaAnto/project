import { Metadata } from 'next';
import Login from '../ui/login/login';

export default function LoginPage() {
  return <Login />;
}

export const metadata: Metadata = {
  title: 'Login',
}; 