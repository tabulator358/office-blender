import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Office Blender 🍹',
  description: 'Objednejte si čerstvé a chutné drinky přímo do vaší kanceláře! Zdravé smoothie a bulletproof káva plné energie.',
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

