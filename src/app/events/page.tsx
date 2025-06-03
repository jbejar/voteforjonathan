'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function EventCalendarPage() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Upcoming Events</h1>
      
      {/* Event 1 */}
      <Row className="border-bottom py-4 mb-4 bg-white rounded">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-secondary">5</span>
          </h1>
          <h2>JUN</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold">Highland Farmers Market</h3>
          <ul className="list-inline">
            <li className="list-inline-item">
              <i className="bi bi-calendar" aria-hidden="true"></i> Thursday
            </li>
            <li className="list-inline-item">
              <i className="bi bi-clock" aria-hidden="true"></i> 4:00 PM - 8:00 PM
            </li>
            <li className="list-inline-item">
              <i className="bi bi-geo-alt" aria-hidden="true"></i>
                 &nbsp;<a href="https://maps.app.goo.gl/a52uyST37agxgmgW6" target="_blank" rel="noopener noreferrer">Heritage Park
                </a>
            </li>
          </ul>
          <p>
            Join me at the Highland Farmers Market! I&apos;ll be there to meet with community members and discuss the issues that matter to you. There will be carnival games for kids, making it a perfect family-friendly event. Come say hello and share your thoughts on how we can improve our community together!
          </p>
        </Col>
      </Row>

      {/* Event 2 */}
      <Row className="border-bottom py-4 mb-4">
        <Col xs={2} className="text-end">
          <h1 className="display-4">
            <span className="badge bg-secondary">26</span>
          </h1>
          <h2>JUN</h2>
        </Col>
        <Col xs={10}>
          <h3 className="text-uppercase fw-bold">Highland Farmers Market</h3>
          <ul className="list-inline">
            <li className="list-inline-item">
              <i className="bi bi-calendar" aria-hidden="true"></i> Thursday
            </li>
            <li className="list-inline-item">
              <i className="bi bi-clock" aria-hidden="true"></i> 4:00 PM - 8:00 PM
            </li>
            <li className="list-inline-item">
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                 &nbsp;<a href="https://maps.app.goo.gl/a52uyST37agxgmgW6" target="_blank" rel="noopener noreferrer">Heritage Park
                </a>
            </li>
          </ul>
          <p>
            Another great opportunity to connect at the Highland Farmers Market! This week we&apos;ll have patriotic crafts for families to enjoy as we approach Independence Day. Stop by to discuss community priorities while your kids create something special to celebrate our great nation.
          </p>
        </Col>
      </Row>

      {/* Event 3 */}
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
              <i className="bi bi-geo-alt" aria-hidden="true"></i>
                 &nbsp;<a href="https://maps.app.goo.gl/a52uyST37agxgmgW6" target="_blank" rel="noopener noreferrer">Heritage Park
                </a>
            </li>
          </ul>
          <p>
            Join us for Highland&apos;s biggest community celebration! I&apos;ll be participating in the Highland Fling Parade and spending Family Day at Heritage Park. This is Highland&apos;s signature event celebrating our community spirit - come enjoy the festivities and let&apos;s talk about building an even stronger future for our city.
          </p>
        </Col>
      </Row>
    </Container>
  )
}