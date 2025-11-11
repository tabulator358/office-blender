import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blender Drink Ordering',
  description: 'Order your favorite healthy drinks from our futuristic blender service',
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

