'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'next/image';

export default function ContactPage() {
  return (
    <>
    <Container className="py-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <p className="mb-4">
          We&apos;d love to hear from you! Here&apos;s how you can reach me:
              </p>
              
              <h3 className="h5 mb-2">Email</h3>
              <p className="mb-3">
          <a href="mailto:info@voteforjonathan.com">
            info@voteforjonathan.com
          </a>
              </p>

              <h3 className="h5 mb-2">Phone</h3>
              <p className="mb-3">
          <a href="tel:+18019010154">(801) 901-0154</a>
              </p>

              <h3 className="h5 mb-2">Social Media</h3>
              <p className="mb-3">
          Follow us on social media for the latest updates:
              </p>
              <div className="social-icons d-flex">
          <a href="https://www.instagram.com/voteforjonathan_official" className="text-decoration-none me-3">
            <i className="bi bi-instagram"></i>
            <span className="ms-2">Instagram</span>
          </a>
          <a href="https://www.facebook.com/jbejaran" className="text-decoration-none me-3">
            <i className="bi bi-facebook"></i>
            <span className="ms-2">Facebook</span>
          </a>
          <a href="https://www.linkedin.com/in/jonathan-bejarano-27320840/" className="text-decoration-none">
            <i className="bi bi-linkedin"></i>
            <span className="ms-2">LinkedIn</span>
          </a>
              </div>
            </Card.Body>
            
          </Card>
          
        </Col>
      </Row>
    </Container>
    <Container fluid className="py-5 bg-white">
<div className="text-center bg">
            <Image src="/images/sign/sign.webp"
                  alt="Jonathan Bejarano Campaign Sign"
                  width={303}
                  height={228}
                  className="img-fluid shadow"
                    />
          </div>
                                  <div className="text-center">
                                    <Button
                                      href="https://docs.google.com/forms/d/e/1FAIpQLScLZHkqp8857N5KkSeSMbBIhP3QXi3dEvbR7OBD-Gb3i3bRXg/viewform?usp=header"
                                      variant="primary"
                                      size="lg"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mb-3 mt-5"
                                    >
                                      Request a Yard Sign
                                    </Button>
                                  </div>
    </Container>
    </>
  )
}