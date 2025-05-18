import './globals.scss'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import BootstrapLoader from '../components/BootstrapLoader'
import { lora, openSans } from './fonts'
import SEO from './next-seo.config'
import Script from 'next/script'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${openSans.variable}`}>
      <head>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Open Graph metadata */}
        <meta property="og:url" content="https://www.voteforjonathan.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.openGraph.title} />
        <meta property="og:description" content={SEO.openGraph.description} />
        <meta property="og:image" content={SEO.openGraph.images[0].url} />

        {/* Twitter metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="voteforjonathan.com" />
        <meta property="twitter:url" content="https://www.voteforjonathan.com/" />
        <meta name="twitter:title" content={SEO.twitter.title} />
        <meta name="twitter:description" content={SEO.twitter.description} />
        <meta name="twitter:image" content={SEO.twitter.images[0]} />
      </head>
      <body>
        <div className="bg-light d-flex flex-column min-vh-100">
          <AppNavbar />

          <main className="flex-grow-1 pt-4">
            {children}
          </main>

          <Footer />
          <BootstrapLoader />
        </div>
        
        {/* Load Bootstrap JavaScript non-blocking */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-wwO+GKSjHRJV9F0iUxLqVgghDmTXUqxe726c+6CCi1H1jMBgGQHwL2v7R8EsSHh" 
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
