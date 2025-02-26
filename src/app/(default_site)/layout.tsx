import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layouts/header/Header'
import '@/app/globals.scss'
import Footer from '@/components/layouts/footer/Footer'

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
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  )
}
