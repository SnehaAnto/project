import HRDashboard from '../ui/hr/dashboard';
import { Metadata } from 'next';

export default function HRPage() {
  return <HRDashboard />;
}

export const metadata: Metadata = {
  title: 'HR Dashboard | Timesheet App',
}; 