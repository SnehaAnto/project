import Register from '../ui/register/register';
import { Metadata } from 'next';

export default function RegisterPage() {
  return <Register />;
}

export const metadata: Metadata = {
  title: 'Register| Timesheet App',
};