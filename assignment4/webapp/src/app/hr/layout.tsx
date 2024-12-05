import HRGuard from '../ui/guards/hr-guard';

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HRGuard>{children}</HRGuard>;
} 