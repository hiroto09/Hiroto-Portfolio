import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'INOUE PORTFOLIO',
  description: '井上翔人のポートフォリオサイトです。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
