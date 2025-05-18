'use client'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { usePathname } from 'next/navigation'

const Footer: React.FC = () => {
  const pathname = usePathname()
  
  return (
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
  )
}

export default Footer
