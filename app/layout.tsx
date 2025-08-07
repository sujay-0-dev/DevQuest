import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevQuest - The Ultimate Developer Roadmap & Resource Explorer',
  description: 'Navigate your coding journey with interactive roadmaps, daily quests, and a thriving community of developers.',
  keywords: 'developer, roadmap, learning, programming, coding, resources, community',
  authors: [{ name: 'DevQuest Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8b5cf6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
