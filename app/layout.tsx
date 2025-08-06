import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stress Management Reynlab',
  description: 'A stress management application by Reynlab',
  generator: 'Divyaprakash',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
