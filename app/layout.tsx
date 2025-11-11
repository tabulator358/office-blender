import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Office Blender',
  description: 'Order your favorite healthy drinks from our futuristic office blender service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}

