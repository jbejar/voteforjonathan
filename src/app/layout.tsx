import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vote for Jonathan',
  description: 'Election campaign website for Jonathan',
  viewport: 'width=device-width, initial-scale=1',
  keywords: 'election, campaign, jonathan, vote',
  authors: [{ name: 'Jonathan' }],
  openGraph: {
    title: 'Vote for Jonathan',
    description: 'Election campaign website for Jonathan',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
            <nav className="container mx-auto px-4 py-4">
              {/* Add your Navigation component here */}
            </nav>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="bg-gray-100 border-t">
            <div className="container mx-auto px-4 py-8">
              {/* Add your Footer component here */}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
