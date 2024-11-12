import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PT_Mono } from 'next/font/google';
import { ConvexClientProvider } from './ConvexClientProvider';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const ptMono = PT_Mono({
  subsets: ['latin'],
  variable: '--font-pt-mono',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Subconscious Systems',
  description: 'Asynchronous AI Inference at a Fraction of the Cost',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ptMono.className} antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
