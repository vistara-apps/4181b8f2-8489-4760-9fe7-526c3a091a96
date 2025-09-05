import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRights.cards',
  description: 'Your Pocket Guide to Legal Rights During Encounters',
  keywords: ['legal rights', 'police encounters', 'know your rights', 'civil rights'],
  authors: [{ name: 'KnowYourRights.cards Team' }],
  creator: 'KnowYourRights.cards',
  publisher: 'KnowYourRights.cards',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'KnowYourRights.cards',
    description: 'Your Pocket Guide to Legal Rights During Encounters',
    url: '/',
    siteName: 'KnowYourRights.cards',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KnowYourRights.cards - Your Pocket Guide to Legal Rights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KnowYourRights.cards',
    description: 'Your Pocket Guide to Legal Rights During Encounters',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(130, 70%, 45%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(130, 70%, 45%)' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KnowYourRights.cards',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KnowYourRights.cards" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="hsl(130, 70%, 45%)" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div id="root" className="min-h-screen bg-bg">
          {children}
        </div>
      </body>
    </html>
  );
}

