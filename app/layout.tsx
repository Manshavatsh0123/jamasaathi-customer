import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/components/providers/ReduxProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'BharosaSaathi — Your Trusted Financial Companion',
    template: '%s | BharosaSaathi',
  },
  description:
    'BharosaSaathi helps you manage your customer accounts, track collections, view payment records, and monitor account details securely in one place.',

  applicationName: 'BharosaSaathi',
  generator: 'Next.js',

  keywords: [
    'BharosaSaathi',
    'customer accounts',
    'account management',
    'payment records',
    'collection tracking',
  ],

  icons: {
    icon: '/images/LogoImage.png',
    apple: '/images/LogoImage.png',
  },

  openGraph: {
    title: 'BharosaSaathi — Your Trusted Financial Companion',
    description:
      'Manage your accounts, track collections, and view payment records with BharosaSaathi.',
    siteName: 'BharosaSaathi',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f4f4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <body className="bg-[#e9e9e9] font-sans text-ink antialiased">
        <ReduxProvider>{children}</ReduxProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

