import React from 'react';
import Image from 'next/image';
import { Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
        <>
            <Container>
                <Row>

                    <h1 className="display-2 text-center mb-4 px-4">Jonathan Bejarano for
                        Aspen Peaks School Board</h1>


                </Row>
                <Row className="mx-5">
                    <Col lg={8} className="mx-auto">
                        <div className="lead my-4 text-center">
                            <p>Hello!
                                My name is Jonathan Bejarano and I
                                would be honored to represent the
                                citizens of district 3 (includes all of
                                Highland and parts of Lehi) in the
                                new Aspen Peaks School District.</p>
                        </div>
                        
                        <h2 className="display-6 text-center mb-4">Meet Jonathan - A Message to Our Community</h2>
                        <p className="lead text-center mb-4">
                            Watch my vision for the future of education in our district and learn why your support matters.
                        </p>
                        <div className="ratio ratio-16x9 mb-4 shadow rounded overflow-hidden">
                            <iframe 
                                src="https://www.youtube.com/embed/RbF4gqY7XlY" 
                                title="Jonathan Bejarano - Your Voice for Aspen Peaks School Board"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="rounded"
                            ></iframe>
                        </div>
                    </Col>
                    <Col lg={12} data-bs-theme="dark">
                                <a href="https://experience.arcgis.com/experience/22f54c8c0566415787aaea15dd0e0c5f" target="_blank" rel="noopener noreferrer">
                        <Card bg="primary" className="my-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div className="card-body p-0">
                                    <Image
                                        src="/images/District3Map.webp"
                                        alt="Aspen Peaks School District"
                                        width={800}
                                        height={558}
 loading="lazy"
                                        className="img-fluid"
                                    />
                            </div>
                            <CardFooter className="p-3 text-center">
                                District 3
                            </CardFooter>
                        </Card>
                                    </a>
                    </Col>


                </Row>
                <Row className='my-4'>
                    <p>I grew up in Utah, and my children currently attend Alpine School District
                        public schools. I know that our public schools are an important part of Utah’s
                        society, culture, and economy.</p>
                    <p className='my-4'>
                        I also know that the coming school district split is going to present a unique
                        set of challenges. As your representative, I will come to the new school board
                        with a vision for the future and the necessary skills to put the students of the
                        new Aspen Peaks School District in a position to succeed.</p>
                </Row>
            </Container>
            <Container fluid className="bg-white pt-5 pb-3">
                <Container>
                    <Row>
                        <h1 className="display-4 text-center">Why should you vote for Jonathan?</h1>
                        <Col className="mt-5 d-flex flex-column justify-content-center">
                            <ul>
                                <li className='mb-3'><h3 className="fw-bold">I am a proven leader</h3>
                                    <ul>
                                        <li>I have leadership experience in the tech world, both as a lead
                                            software engineer and also as a web and software educator.</li>
                                    </ul></li>
                                <li className='mb-3'><h3 className="fw-bold">I have experience with education policy</h3>
                                    <ul>
                                        <li>I routinely attend local and state school board meetings and state
                                            legislative sessions to provide public comment on education
                                            policy. I have also served on the SCC (Student Community
                                            Council) for Highland Elementary School, where I helped shape
                                            school policies to better our communities.</li>
                                    </ul></li>
                                <li className='mb-3'><h3 className="fw-bold">I have a Masters of Business Administration</h3>
                                    <ul>
                                        <li>I appreciate the importance of fiscal responsibility, and I have
                                            experience reading and understanding legal policy.</li>
                                    </ul></li>
                            </ul>
                            <p className='text-center'>
                            <i className="bi bi-mortarboard-fill me-2 my-2 fs-1"></i><br />
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container className=" p-5 py-5">
                <Row>
                    <h1 className="my-5 display-4 text-center">What are Jonathan’s priorities for the new
                        school district?</h1>
                    <Col>
                        <p className="lead">Starting the new Aspen Peaks School district is going to be a challenge,
                            and it is important that our representatives be up to the task.</p>
                        <ul className='my-4'>
                            <li className='mb-3'><h3 className="fw-bold">Make wise investments for our future</h3>
                                <div className="text-center image-container m-4">
                                    <Image
                                        src="/images/boy-reading-with-mom.webp"
                                        alt="Boy Reading with Mom"
                                        loading="lazy"
                                        width={400}
                                        height={400}
                                        style={{ maxWidth: '400px' }}
                                        className="img-fluid"
                                    />
                                </div>
                                <p>The process of splitting away from Alpine School District will involve
                                    creating a realistic strategic plan. There will be many tough decisions, but my background gives me the skills
                                    necessary to make decisions driven on data. Our goal should be to grow
                                    in efficiency through wise investments in our teachers, technology and our school buildings.
                                     I believe we should enter into shared service agreements with other districts. 
                                     I will ensure that negotiations are fair, that the school
                                    districts remain on good terms, and that our students continue to have access to programs they had under the old district.</p>
                            </li>
                            <li className='mb-3'><h3 className="fw-bold">Retain our highly qualified teachers and staff</h3>
                                <div className="text-center image-container m-4">
                                    <Image
                                        src="/images/teacher.webp"
                                        alt="Math Teacher"
                                        loading="lazy"
                                        width={400}
                                        height={400}
                                        style={{ maxWidth: '400px' }}
className="img-fluid"
                                    />
                                </div>
                                <p>I want to ensure that the transition from Alpine to Aspen Peaks is as
                                    seamless as possible for our students. In order to reach that goal, it is
                                    important that we keep the teachers, administrators, and staff who are
                                    serving our children on a daily basis.</p>
                            </li>
                            <li className='mb-3'><h3 className="fw-bold">Select a highly qualified superintendent</h3>
                                <div className="text-center image-container m-4">
                                    <Image
                                        src="/images/super-interview.webp"
                                        alt="Inteview for Superintendent"
                                        loading="lazy"
                                        width={400}
                                        height={400}
                                        style={{ maxWidth: '400px' }}className="img-fluid"
                                    />
                                </div>
                                <p>Choosing the new superintendent of the Aspen Peaks School District is
                                    probably the most important thing that the new school board will do. I
                                    intend to find an experienced superintendent who is a good listener and
                                    who will align our new district with the goals and vision of its citizens.</p>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Card bg="primary" text="white" className="my-4 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <CardBody>
                        <CardTitle className="h2">Election Details</CardTitle>
                        <CardText className="text-center">
                            <i className="bi bi-calendar-event me-2 my-2 fs-1"></i><br />
                            <span className='text-start'>
                                Primary: August 12, 2025<br />
                                General: November 4, 2025<br />
                            </span>
                        </CardText>
                    </CardBody>
                </Card>

            </Container>
            <Container fluid className="bg-white p-5">
                <h2 data-bs-theme="dark">Get Involved</h2>
                <Row><Col className="px-">
                    <p>We need your help to make a difference in our community. Join us in our campaign to elect Jonathan Bejarano for School Board.</p>
                </Col></Row>
                
                <Row className="my-4">
                    <Col lg={6} className="text-center mb-4">
                        <div className="mb-3">
                            <Image
                                src="/images/sign/sign.webp"
                                alt="Jonathan Bejarano Campaign Sign"
                                width={303}
                                height={228}
                                className="img-fluid shadow"
                            />
                        </div>
                        <Button
                            href="https://docs.google.com/forms/d/e/1FAIpQLScLZHkqp8857N5KkSeSMbBIhP3QXi3dEvbR7OBD-Gb3i3bRXg/viewform?usp=header"
                            variant="primary"
                            size="lg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-3"
                        >
                            Request a Yard Sign
                        </Button>
                    </Col>
                    <Col lg={6} className="text-center">
                        <div className="text-center mb-4">
                            <h4 className="mb-3">Volunteer with Us</h4>
                            <p className="my-5" >Help spread the word and make a difference in our community. There are many ways to help, whether it be making phone calls or helping knock doors.</p>
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
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default HomePage;