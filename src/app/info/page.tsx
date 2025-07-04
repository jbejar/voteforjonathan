'use client'
import { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import * as d3 from 'd3'

interface ClassSizeData {
  [district: string]: {
    [subject: string]: number
  }
}

const classSizeData: ClassSizeData = {
  "Alpine District": {
    "Kindergarten": 23,
    "Grade 1": 24,
    "Grade 2": 25,
    "Grade 3": 27.5,
    "Grade 4": 27.5,
    "Grade 5": 29,
    "Grade 6": 30,
    "Language Arts 7": 33,
    "Language Arts 8": 32.5,
    "Language Arts 9": 31,
    "Language Arts 10": 31,
    "Language Arts 11": 31.5,
    "Math 7": 32,
    "Math 8": 30,
    "Secondary Math I": 29,
    "Secondary Math II": 30,
    "Secondary Math III": 31,
    "Science 7": 33,
    "Science 8": 33.5,
    "Earth Science": 31,
    "Biology": 32,
    "Chemistry": 29.5,
    "Physics": 28.5
  },
  "State": {
    "Kindergarten": 21,
    "Grade 1": 22,
    "Grade 2": 23,
    "Grade 3": 24,
    "Grade 4": 25,
    "Grade 5": 25,
    "Grade 6": 26,
    "Language Arts 7": 25,
    "Language Arts 8": 26,
    "Language Arts 9": 26,
    "Language Arts 10": 26,
    "Language Arts 11": 25,
    "Math 7": 24,
    "Math 8": 25,
    "Secondary Math I": 23,
    "Secondary Math II": 24,
    "Secondary Math III": 25,
    "Science 7": 29,
    "Science 8": 24,
    "Earth Science": 27,
    "Biology": 24,
    "Chemistry": 27,
    "Physics": 27
  }
}

export default function ClassSizeInfoPage() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Clear any existing chart
    d3.select(chartRef.current).selectAll("*").remove()

    // Prepare data for D3
    const subjects = Object.keys(classSizeData["State"])
    const data = subjects.map(subject => ({
      subject,
      state: classSizeData["State"][subject],
      alpine: classSizeData["Alpine District"][subject]
    }))

    // Chart dimensions
    const margin = { top: 60, right: 40, bottom: 120, left: 120 }
    const width = Math.min(950, window.innerWidth - 83) - margin.left - margin.right
    const height = 1000 - margin.bottom - margin.top

    // Create SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const reversedSubjects = [...subjects].reverse() // Reverse to match the image order
    const yScale = d3.scaleBand()
      .domain(reversedSubjects)
      .range([0, height])
      .padding(0.1)

    const xScale = d3.scaleLinear()
      .domain([0, 40])
      .range([0, width])

    // Add title
    svg.append("text")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-family", "Open Sans, sans-serif")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#666")
      .text("ASD Median Class Sizes vs State Median")

    // Create bars for State (darker bars)
    g.selectAll(".bar-state")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-state")
      .attr("y", d => yScale(d.subject) || 0)
      .attr("height", yScale.bandwidth() / 2)
      .attr("x", 0)
      .attr("width", 0)
      .style("fill", "#444444")
      .transition()
      .duration(1500)
      .delay((d, i) => i * 50)
      .attr("width", d => xScale(d.state))

    // Create bars for Alpine District (red bars)
    g.selectAll(".bar-alpine")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-alpine")
      .attr("y", d => (yScale(d.subject) || 0) + yScale.bandwidth() / 2)
      .attr("height", yScale.bandwidth() / 2)
      .attr("x", 0)
      .attr("width", 0)
      .style("fill", "#B22222")
      .transition()
      .duration(1500)
      .delay((d, i) => i * 50)
      .attr("width", d => xScale(d.alpine))

    // Add state value circles
    g.selectAll(".circle-state")
      .data(data)
      .enter().append("circle")
      .attr("class", "circle-state")
      .attr("cy", d => (yScale(d.subject) || 0) + yScale.bandwidth() / 4)
      .attr("cx", 0)
      .attr("r", 4)
      .style("fill", "#87ceeb")
      .style("stroke", "#4682b4")
      .style("stroke-width", 2)
      .transition()
      .duration(1500)
      .delay((d, i) => i * 50)
      .attr("cx", d => xScale(d.state))

    // Add alpine value circles  
    g.selectAll(".circle-alpine")
      .data(data)
      .enter().append("circle")
      .attr("class", "circle-alpine")
      .attr("cy", d => (yScale(d.subject) || 0) + (3 * yScale.bandwidth()) / 4)
      .attr("cx", 0)
      .attr("r", 4)
      .style("fill", "#87ceeb")
      .style("stroke", "#4682b4")
      .style("stroke-width", 2)
      .transition()
      .duration(1500)
      .delay((d, i) => i * 50)
      .attr("cx", d => xScale(d.alpine))

    // Y axis (subjects)
    g.append("g")
      .call(d3.axisLeft(yScale))
      .style("font-size", "12px")

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale)
        .ticks(8)
        .tickFormat((d: d3.NumberValue) => d.valueOf().toString()))
      .style("font-size", "12px")

    // X axis grid lines
    g.selectAll(".grid-line")
      .data(xScale.ticks(8))
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#e0e0e0")
      .style("stroke-width", 1)

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left + 50}, ${height + margin.top + 40})`)

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", "#555")

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("State")
      .style("font-size", "14px")

    legend.append("rect")
      .attr("x", 80)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", "#d32f2f")

    legend.append("text")
      .attr("x", 100)
      .attr("y", 12)
      .text("Alpine District")
      .style("font-size", "14px")

  }, [])

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Class Size Information</h1>
          <p className="lead text-center mb-5">
            Understanding the impact of class sizes on student learning and teacher effectiveness
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Why Class Size Matters</h3>
              <p>
                Research consistently shows that smaller class sizes lead to better educational outcomes. 
                When teachers have fewer students, they can provide more individualized attention, 
                create stronger relationships, and implement more effective teaching strategies.
              </p>
              <ul className="mb-0">
                <li><strong>Improved Academic Performance:</strong> Students in smaller classes show greater gains in reading and math</li>
                <li><strong>Better Classroom Management:</strong> Teachers can maintain a more focused learning environment</li>
                <li><strong>Increased Engagement:</strong> Students participate more actively in discussions and activities</li>
                <li><strong>Enhanced Support:</strong> Teachers can identify and address learning challenges more quickly</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Alpine School District vs. State Median Class Sizes</h3>
            </Card.Header>
            <Card.Body className="text-center">
              <div ref={chartRef} className="d-flex justify-content-center"></div>
                <footer className="pt-1 border-top">
                <p className="text-muted small mb-0" style={{ fontSize: '1.2rem' }}>
                  <strong>Source:</strong> Utah State Board of Education - {' '}
                  <a 
                  href="https://schools.utah.gov/datastatistics/reports" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                  >
                  schools.utah.gov/datastatistics/reports
                  </a>
                </p>
                </footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h4 className="text-danger mb-3">The Challenge</h4>
              <p>
                As shown in the chart above, Aspen Peaks School District consistently has 
                larger class sizes than the state median across nearly every grade level and subject area. 
                This means our students are not receiving the same level of individual attention 
                as their peers in other districts.
              </p>
              <p className="mb-0">
                <strong>Average difference:</strong> Our classes are typically 2-4 students larger 
                than the state median, which can significantly impact the learning environment.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h4 className="text-success mb-3">My Commitment</h4>
              <p>
                As your school board representative, I am committed to working toward 
                smaller class sizes that benefit both students and teachers. This includes:
              </p>
              <ul className="mb-0">
                <li>Advocating for strategic hiring to reduce student-teacher ratios</li>
                <li>Supporting efficient resource allocation to maximize classroom impact</li>
                <li>Exploring innovative solutions to optimize learning environments</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-primary">
            <Card.Body className="text-center">
              <h4 className="text-primary mb-3">Every Student Deserves Individual Attention</h4>
              <p className="lead mb-4">
                Together, we can work toward smaller class sizes that enable our teachers 
                to provide the personalized education every child deserves.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}