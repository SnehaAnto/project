import Timesheet from '../ui/timesheet/timesheet';
import { Metadata } from 'next';

export default function TimesheetPage() {
  return <Timesheet />;
} 
export const metadata: Metadata = {
  title: 'Timesheet',
}; 