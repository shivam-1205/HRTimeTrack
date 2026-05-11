// app/(landing)/layout.tsx
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Enterprise HRMS Portal',
  description: 'The modern, intuitive HRMS platform designed to streamline payroll, enhance employee wellness, and ensure global compliance for enterprise teams.',
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.className} bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased gb-white`}>
      {children}
    </div>
  );
}