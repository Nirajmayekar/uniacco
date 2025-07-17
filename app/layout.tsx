import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Uniaccodata',
  description: 'niraj mayekar',
  generator: 'niraj mayekar @nerajmayekar@gmail.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
