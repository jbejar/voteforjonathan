'use client'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { usePathname } from 'next/navigation'
import './globals.scss'

import SEO from './next-seo.config';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const pathname = usePathname()
  return (
    <html lang="en">
      <head>
<title>{SEO.title}</title>
<meta name="description" content={SEO.description} />

        <meta property="og:url" content="https://www.voteforjonathan.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.openGraph.title} />
        <meta property="og:description" content={SEO.openGraph.description} />
        <meta property="og:image" content={SEO.openGraph.images[0].url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="voteforjonathan.com" />
        <meta property="twitter:url" content="https://www.voteforjonathan.com/" />
        <meta name="twitter:title" content={SEO.twitter.title} />
        <meta name="twitter:description" content={SEO.twitter.description} />
        <meta name="twitter:image" content={SEO.twitter.images[0]} />

      </head>
      <body>
        <div className="bg-light d-flex flex-column min-vh-100">
          <Navbar data-bs-theme="dark" bg="secondary" expand="lg" className="shadow-sm border-bottom sticky-top">
            <Container>
              <Navbar.Brand href="/">Vote for Jonathan</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLScLZHkqp8857N5KkSeSMbBIhP3QXi3dEvbR7OBD-Gb3i3bRXg/viewform?usp=header" target="_blank" rel="noopener noreferrer">Volunteer</Nav.Link>
                    <Nav.Link href="https://account.venmo.com/u/Jonathan-Bejarano-2" target="_blank" rel="noopener noreferrer">Donate</Nav.Link>
                  <Nav.Link href="/contact">Contact</Nav.Link>
                  {/* <Nav.Link href="#about">About</Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <main className="flex-grow-1 pt-4">
            
              {children}
            
          </main>

          <footer className="bg-secondary border-top py-5">
            <Container data-bs-theme="dark">
              <div className="text-center text-muted">
                {pathname !== '/' && (
                  <Nav.Link href="/" className="text-light">Home</Nav.Link>
                )}
                  {pathname !== '/contact' && (
                    <Nav.Link href="/contact" className="text-light">Contact Us</Nav.Link>
                  )}
                  <p className="mb-0">&copy; {new Date().getFullYear()} Campaign to Elect Jonathan</p>
              </div>
            </Container>
          </footer>
        </div>
      </body>
    </html>
  )
}
