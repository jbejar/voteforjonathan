'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function ContactPage() {
  return (
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
  )
}