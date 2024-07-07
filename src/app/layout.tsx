import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crypto Key Generator',
  description: 'Generate a secure crypto key for your application',  
}

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
