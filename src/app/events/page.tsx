'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function EventCalendarPage() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Upcoming Events</h1>
      



      {/* Event 4 */}
      <Row className="border-bottom py-4 mb-4 bg-white rounded">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-secondary">2</span>
          </h1>
          <h2>AUG</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold">Highland Fling Parade/Family Day</h3>
          <ul className="list-inline">
            <li className="list-inline-item">
              <i className="bi bi-calendar" aria-hidden="true"></i> Saturday
            </li>
            <li className="list-inline-item">
              <i className="bi bi-geo-alt" aria-hidden="true"></i> <a href="https://maps.app.goo.gl/a52uyST37agxgmgW6" target="_blank" rel="noopener noreferrer">Heritage Park</a>
            </li>
          </ul>
          <p>
            Join us for Highland&apos;s biggest community celebration! I&apos;ll be participating in the Highland Fling Parade and spending Family Day at Heritage Park. This is Highland&apos;s signature event celebrating our community spirit - come enjoy the festivities and let&apos;s talk about building an even stronger future for our city.
          </p>
        </Col>
      </Row>



      {/* Past Events Section */}
      
      <div className="mt-5 pt-4 border-top">
        <h2 className="text-center mb-4 text-muted">Past Events</h2>
              {/* Event - Meet the School Board Candidates */}
      <Row className="py-4 mb-4 bg-light rounded opacity-75">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
        <span className="badge bg-light text-muted border">21</span>
          </h1>
          <h2 className="text-muted">JUL</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold text-muted">Meet the School Board Candidates</h3>
          <ul className="list-inline">
        <li className="list-inline-item text-muted">
          <i className="bi bi-calendar" aria-hidden="true"></i> Monday
        </li>
        <li className="list-inline-item text-muted">
          <i className="bi bi-clock" aria-hidden="true"></i> 6:15 PM - 8:15 PM
        </li>
        <li className="list-inline-item text-muted">
          <i className="bi bi-geo-alt" aria-hidden="true"></i> Lone Peak High School
        </li>
          </ul>
          <p className="text-muted">
        <strong>Event completed!</strong> Thank you to everyone who joined the Lone Peak Council PTA for the school board candidate event. It was a valuable opportunity to discuss my vision for Aspen Peaks School District and answer your questions.
          </p>
          <div className="ratio ratio-16x9 mb-3 shadow rounded overflow-hidden">
        <iframe 
          src="https://www.youtube.com/embed/s1tj2h-5lUQ?autoplay=1&mute=1&cc_load_policy=1" 
          title="Meet the School Board Candidates Event"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          className="rounded"
        ></iframe>
          </div>
        </Col>
      </Row>
      {/* Event - Meet the Candidates Open House */}
      <Row className="py-4 mb-4 bg-light rounded opacity-75">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-light text-muted border">17</span>
          </h1>
          <h2 className="text-muted">JUL</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold text-muted">Meet the Candidates Open House</h3>
          <ul className="list-inline">
            <li className="list-inline-item text-muted">
              <i className="bi bi-calendar" aria-hidden="true"></i> Thursday
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-clock" aria-hidden="true"></i> 6:00 PM - 8:00 PM
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-geo-alt" aria-hidden="true"></i> Highland City Hall
            </li>
          </ul>
          <p className="text-muted">
            <strong>Event completed!</strong> Thank you to everyone who joined us for the informal open house to meet the candidates running for Highland City elected positions. It was a great opportunity for voters to speak individually with each candidate and learn about important issues in Highland City.
          </p>
        </Col>
      </Row>  
        {/* Event 5 */}
        <Row className="py-4 mb-4 bg-light rounded opacity-75">
          <Col xs={2} className="text-end">
        <h1 className="display-4">
          <span className="badge bg-light text-muted border">7</span>
        </h1>
        <h2 className="text-muted">JUL</h2>
          </Col>
          <Col xs={10}>
        <h3 className="text-uppercase fw-bold text-muted">Open House / Endorsement Convention</h3>
        <ul className="list-inline">
          <li className="list-inline-item text-muted">
            <i className="bi bi-calendar" aria-hidden="true"></i> Monday
          </li>
          <li className="list-inline-item text-muted">
            <i className="bi bi-clock" aria-hidden="true"></i> 6:00 PM - 9:00 PM
          </li>
          <li className="list-inline-item text-muted">
            <i className="bi bi-geo-alt" aria-hidden="true"></i> Skyridge High School
          </li>
        </ul>
        <p className="text-muted">
          <strong>Event completed!</strong> Thank you to everyone who joined us for the Open House and Endorsement Convention at Skyridge High School. It was a great opportunity to connect with community members and discuss important issues affecting our district.
        </p>
          </Col>
        </Row>
{/* Event 3 */}
  <Row className="py-4 mb-4 bg-light rounded opacity-75">
    <Col xs={2} className="text-end">
      <h1 className="display-4">
    <span className="badge bg-light text-muted border">30</span>
      </h1>
      <h2 className="text-muted">JUN</h2>
    </Col>
    <Col xs={10}>
      <h3 className="text-uppercase fw-bold text-muted">Meet the Candidates for Utah County Republican Party</h3>
      <ul className="list-inline">
    <li className="list-inline-item text-muted">
      <i className="bi bi-calendar" aria-hidden="true"></i> Monday
    </li>
    <li className="list-inline-item text-muted">
      <i className="bi bi-clock" aria-hidden="true"></i> 6:00 PM - 8:00 PM
    </li>
    <li className="list-inline-item text-muted">
      <i className="bi bi-geo-alt" aria-hidden="true"></i> <span>Lehi High School</span>
    </li>
      </ul>
      <p className="text-muted">
    <strong>Event completed!</strong> Thank you to everyone who attended the Utah County Republican Party candidate event at Lehi High School. It was a great opportunity to meet with community members and discuss important issues affecting our district and county.
      </p>
    </Col>
  </Row>
{/* Event 3 */}
      <Row className="py-4 mb-4 bg-light rounded opacity-75">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-light text-muted border">26</span>
          </h1>
          <h2 className="text-muted">JUN</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold text-muted">Highland Farmers Market</h3>
          <ul className="list-inline">
            <li className="list-inline-item text-muted">
              <i className="bi bi-calendar" aria-hidden="true"></i> Thursday
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-clock" aria-hidden="true"></i> 4:00 PM - 8:00 PM
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-geo-alt" aria-hidden="true"></i> <span>Heritage Park</span>
            </li>
          </ul>
          <p className="text-muted">
            <strong>Event completed!</strong> Thank you to everyone who joined me at the Highland Farmers Market! The patriotic crafts for families were a huge success as we approached Independence Day. It was wonderful connecting with community members and discussing priorities while kids created something special to celebrate our great nation.
          </p>
        </Col>
      </Row>


        <Row className="py-4 mb-4 bg-light rounded opacity-75">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-light text-muted border">25</span>
          </h1>
          <h2 className="text-muted">JUN</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold text-muted">Meet the Candidates for Utah County Republican Party</h3>
          <ul className="list-inline">
            <li className="list-inline-item text-muted">
              <i className="bi bi-calendar" aria-hidden="true"></i> Wednesday
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-clock" aria-hidden="true"></i> 6:30 PM - 8:00 PM
            </li>
            <li className="list-inline-item text-muted">
              
              <i className="bi bi-geo-alt" aria-hidden="true"></i> Timberline Middle School
            </li>
            
          </ul>
          <p className="text-muted">
            <strong>Event completed!</strong> Join us for a special meet and greet with candidates for Utah County Republican Party for District 3 and District 4. The public is welcome to attend this important community event where you can meet multiple candidates and learn about their platforms. This is your chance to engage with local leaders and make informed decisions for our community&apos;s future.
          </p>
        </Col>
            </Row>
        {/* Event 1 */}
            <Row className="py-4 mb-4 bg-light rounded opacity-75">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-light text-muted border">24</span>
          </h1>
          <h2 className="text-muted">JUN</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold text-muted">Come Meet Jonathan!</h3>
          <p className="mb-2 text-muted"><strong>Candidate for Aspen Peaks School Board, Seat 3</strong></p>
          <ul className="list-inline">
            <li className="list-inline-item text-muted">
              <i className="bi bi-calendar" aria-hidden="true"></i> Tuesday
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-clock" aria-hidden="true"></i> 7:00 PM - 8:30 PM
            </li>
            <li className="list-inline-item text-muted">
              <i className="bi bi-geo-alt" aria-hidden="true"></i> 6341 W 10890 N, Highland
            </li>
          </ul>
          <p className="text-muted">
            <strong>Event completed!</strong> Bring your family for root beer floats and to chat about the new Aspen Peaks School District! This is a wonderful opportunity to have a personal conversation about education and the issues that matter most to our community. Come enjoy refreshments while we discuss how we can build a strong foundation for our new school district together.
          </p>
        </Col>
            </Row>

      {/* Event 2 */}
      
        
        {/* Past Event 1 */}
        <Row className="py-4 mb-4 bg-light rounded opacity-75">
          <Col xs={2} className="text-end">
            <h1 className="display-4">
              <span className="badge bg-light text-muted border">5</span>
            </h1>
            <h2 className="text-muted">JUN</h2>
          </Col>
          <Col xs={10}>
            <h3 className="text-uppercase fw-bold text-muted">Highland Farmers Market</h3>
            <ul className="list-inline">
              <li className="list-inline-item text-muted">
                <i className="bi bi-calendar" aria-hidden="true"></i> Thursday
              </li>
              <li className="list-inline-item text-muted">
                <i className="bi bi-clock" aria-hidden="true"></i> 4:00 PM - 8:00 PM
              </li>
              <li className="list-inline-item text-muted">
                <i className="bi bi-geo-alt" aria-hidden="true"></i> <span>Heritage Park</span>
              </li>
            </ul>
            <p className="text-muted">
              <strong>Event completed!</strong> Thank you to everyone who joined me at the Highland Farmers Market. It was wonderful meeting with community members and discussing the issues that matter to you. The carnival games for kids were a hit, making it a perfect family-friendly event.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  )
}