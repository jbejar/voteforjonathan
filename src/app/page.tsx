import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
        <>
            <Container>
                <Row className="mx-5">
                    <Col lg={4} md={5} sm={12} className="text-center">
                        <h1>JONATHAN</h1>
                        <h2>BEJARANO</h2>
                        <p>DISTRICT 3</p>
                        <p>FOR SCHOOL BOARD</p>
                        <div className="image-container">
                            <img src="/images/jonathan.webp" alt="Jonathan Bejarano" />
                        </div>
                        <p>www.voteforjonathan.com</p>
                    </Col>

                    <Col>
                        <h2>Proven Leader</h2>
                        <ul>
                            <li>Former Highland Elementary SCC Chair</li>
                            <li>Web & Software Educator</li>
                            <li>Masters of Business Administration</li>
                            <li>Lead Software Engineer</li>
                        </ul>
                        <h2>Priorities for the New District</h2>
                        <ul>
                            <li>Make Wise Investments for Our Future</li>
                            <li>Retain High Qualified Teachers and Staff</li>
                            <li>Select a highly qualified Superintendant</li>
                        </ul>
                        <h2>Election Details</h2>
                        <p>Primary Election: August 12, 2025<br />
                            General Election: November 4, 2025</p>

                        <h2>Get Involved</h2>
                        <p>We need your help to make a difference in our community. Join us in our campaign to elect Jonathan Bejarano for School Board.</p>
                        <Button
                            href="https://docs.google.com/forms/d/e/1FAIpQLScLZHkqp8857N5KkSeSMbBIhP3QXi3dEvbR7OBD-Gb3i3bRXg/viewform?usp=header"
                            variant="danger"
                            size="lg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-3"
                        >
                            Volunteer
                        </Button>
                        <p>Join our campaign to make a difference in our community. We need volunteers to help with canvassing, phone banking, and more.</p>

                    </Col>
                </Row>
            </Container>
            <div className="container">

            </div>
        </>
    );
};

export default HomePage;