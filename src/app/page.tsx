import React from 'react';

const HomePage: React.FC = () => {
    return (
        <>
            <div className="container">
                <div className="side-by-side">
                    <div className="left-side">
                        <h1>JONATHAN</h1>
                        <h2>BEJARANO</h2>
                        <p>DISTRICT 3</p>
                        <p>FOR SCHOOL BOARD</p>
                        <div className="image-container">
                            <img src="/images/jonathan.webp" alt="Jonathan Bejarano" />
                        </div>
                        <p>www.voteforjonathan.com</p>
                    </div>

                    <div className="right-side">
                        <h2>Proven Leader</h2>
                        <ul>
                            <li>Highland Elementary SCC Chair</li>
                            <li>Web & Software Educator</li>
                            <li>Masters of Business Administration</li>
                            <li>Lead Software Engineer</li>
                        </ul>
                        <h2>Priorities for the New District</h2>
                        <ul>
                            <li>Make Wise Investments for Our Future</li>
                            <li>Retain High Qualified Teachers and Staff</li>
                            <li>Select a highly qualified superdintendant</li>
                        </ul>
                            <h2>Election Details</h2>
                            <p>Primary Election: </p>
                            <p>General Election: August 12, 2025</p>

                            <h2>Get Involved</h2>
                            <p>We need your help to make a difference in our community. Join us in our campaign to elect Jonathan Bejarano for School Board.</p>
                            <button className="cta">Volunteer</button>
                            <p>Join our campaign to make a difference in our community. We need volunteers to help with canvassing, phone banking, and more.</p>
                            <button className="cta">Donate Now</button>

                    </div>
                </div>
            </div>
            <div className="container">

            </div>
        </>
    );
};

export default HomePage;