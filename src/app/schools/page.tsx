'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import * as d3 from 'd3'
import { SchoolProjection, ProjectionDataPoint, SchoolType, ClassSizeData, ClassSizeStats } from '../../types'
import projectionsData from './projections.json'
import classSizesData from './classSizes.json'

export default function SchoolProjectionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chartRef = useRef<HTMLDivElement>(null)
  
  const [selectedSchoolType, setSelectedSchoolType] = useState<SchoolType>(() => {
    return (searchParams.get('schoolType') as SchoolType) || 'All'
  })
  
  const [selectedSchool, setSelectedSchool] = useState<string>(() => {
    return searchParams.get('school') || ''
  })

  // State for modified class data when FTE is added
  const [modifiedClassData, setModifiedClassData] = useState<ClassSizeData[]>([])
  const [fteCount, setFteCount] = useState(0)

  // Cast the imported data to the proper type
  const projections = projectionsData as SchoolProjection[]
  const classSizes = classSizesData as ClassSizeData[]

  // Helper function to calculate class size statistics
  const calculateStats = (classes: ClassSizeData[]): ClassSizeStats => {
    const sizes = classes.map(c => c["Class Size"]).sort((a, b) => a - b)
    const total = sizes.length
    const sum = sizes.reduce((acc, size) => acc + size, 0)
    const average = total > 0 ? sum / total : 0
    
    let median = 0
    if (total > 0) {
      if (total % 2 === 0) {
        median = (sizes[total / 2 - 1] + sizes[total / 2]) / 2
      } else {
        median = sizes[Math.floor(total / 2)]
      }
    }
    
    return {
      average: Math.round(average * 10) / 10,
      median,
      min: total > 0 ? Math.min(...sizes) : 0,
      max: total > 0 ? Math.max(...sizes) : 0,
      total
    }
  }

  // Function to add FTE and redistribute students
  const handleAddFTE = () => {
    if (originalClassData.length === 0) return

    // Find the class with the maximum students
    const currentClassData = fteCount > 0 ? modifiedClassData : originalClassData
    const maxClassSize = Math.max(...currentClassData.map(c => c["Class Size"]))
    const maxClass = currentClassData.find(c => c["Class Size"] === maxClassSize)
    
    if (!maxClass) return

    // Find all classes with the same name as the max class (excluding sections added by FTE)
    const baseClassName = maxClass["Class Name"].replace(/ \(Section \d+\)$/, '')
    const sameNameClasses = currentClassData.filter(c => 
      c["Class Name"] === baseClassName || c["Class Name"].startsWith(`${baseClassName} (Section`)
    )
    
    // Calculate total students across all sections of this class
    const totalStudents = sameNameClasses.reduce((sum, classData) => sum + classData["Class Size"], 0)
    
    // Calculate how many sections we'll have (existing + 1 new)
    const totalSections = sameNameClasses.length + 1
    
    // Calculate students per section
    const studentsPerSection = Math.floor(totalStudents / totalSections)
    const remainderStudents = totalStudents % totalSections

    // Create new class data with redistribution
    const newClassData = currentClassData.map(classData => {
      const classBaseName = classData["Class Name"].replace(/ \(Section \d+\)$/, '')
      if (classBaseName === baseClassName) {
        // Find the index of this section among same-name classes
        const sectionIndex = sameNameClasses.findIndex(c => 
          c["Class Name"] === classData["Class Name"] && 
          c["Class Size"] === classData["Class Size"]
        )
        
        // Distribute remainder students to the first few sections
        const extraStudent = sectionIndex < remainderStudents ? 1 : 0
        
        return {
          ...classData,
          "Class Size": studentsPerSection + extraStudent
        }
      }
      return classData
    })

    // Find the next section number
    const existingSections = sameNameClasses.filter(c => c["Class Name"].includes('(Section'))
    const nextSectionNumber = existingSections.length > 0 
      ? Math.max(...existingSections.map(c => {
          const regex = /\(Section (\d+)\)/
          const match = regex.exec(c["Class Name"])
          return match ? parseInt(match[1]) : 1
        })) + 1
      : 2

    // Add the new section of the same class
    const newSection: ClassSizeData = {
      School: maxClass.School,
      "Class Name": `${baseClassName} (Section ${nextSectionNumber})`,
      "Class Size": studentsPerSection + (sameNameClasses.length < remainderStudents ? 1 : 0)
    }

    setModifiedClassData([...newClassData, newSection])
    setFteCount(prev => prev + 1)
  }

  // Reset modified data when school changes
  useEffect(() => {
    setModifiedClassData([])
    setFteCount(0)
  }, [selectedSchool])

  // Function to reset to original data
  const handleReset = () => {
    setModifiedClassData([])
    setFteCount(0)
  }

  // Get unique school types
  const schoolTypes: SchoolType[] = ['All', ...Array.from(new Set(
    projections
      .filter(school => school["School Type"])
      .map(school => school["School Type"] as SchoolType)
  ))]

  // Filter schools based on selected type
  const filteredSchools = selectedSchoolType === 'All' 
    ? projections 
    : projections.filter(school => school["School Type"] === selectedSchoolType)

  // Get school names for dropdown
  const schoolNames = filteredSchools.map(school => school.School)

  // Find selected school data
  const selectedSchoolData = projections.find(school => school.School === selectedSchool)
  
  // Get class size data for selected school
  const originalClassData = classSizes
    .filter(classData => classData.School === selectedSchool)
    .sort(sortSchools())
  
  // Use modified data if FTE has been added, otherwise use original data
  const selectedSchoolClasses = fteCount > 0 
    ? [...modifiedClassData].sort(sortSchools()) 
    : originalClassData
  const hasClassSizeData = selectedSchoolClasses.length > 0

  // Update query string when selections change
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedSchoolType !== 'All') {
      params.set('schoolType', selectedSchoolType)
    }
    if (selectedSchool) {
      params.set('school', selectedSchool)
    }
    
    const queryString = params.toString()
    const newUrl = queryString ? `?${queryString}` : '/schools'
    router.replace(newUrl, { scroll: false })
  }, [selectedSchoolType, selectedSchool, router])

  // Reset school selection when school type changes
  useEffect(() => {
    if (selectedSchool && !schoolNames.includes(selectedSchool)) {
      setSelectedSchool('')
    }
  }, [selectedSchoolType, schoolNames, selectedSchool])

  // Create line chart with D3
  useEffect(() => {
    if (!chartRef.current || !selectedSchoolData) return

    // Clear any existing chart
    d3.select(chartRef.current).selectAll("*").remove()

    // Prepare data for D3
    const chartData: ProjectionDataPoint[] = [
      { year: '2024', enrollment: selectedSchoolData.fall2024 },
      { year: '2025', enrollment: selectedSchoolData.fall2025 },
      { year: '2026', enrollment: selectedSchoolData.fall2026 },
      { year: '2027', enrollment: selectedSchoolData.fall2027 },
      { year: '2028', enrollment: selectedSchoolData.fall2028 },
      { year: '2029', enrollment: selectedSchoolData.fall2029 }
    ]

    // Chart dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 80 }
    const width = Math.min(800, window.innerWidth - 100) - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    // Create SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3.scalePoint()
      .domain(chartData.map(d => d.year))
      .range([0, width])
      .padding(0.1)

    const yScale = d3.scaleLinear()
      .domain(d3.extent(chartData, d => d.enrollment) as [number, number])
      .nice()
      .range([height, 0])

    // Line generator
    const line = d3.line<ProjectionDataPoint>()
      .x(d => xScale(d.year) || 0)
      .y(d => yScale(d.enrollment))
      .curve(d3.curveMonotoneX)

    // Add grid lines
    g.selectAll(".grid-line")
      .data(yScale.ticks(6))
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .style("stroke", "#e0e0e0")
      .style("stroke-width", 1)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .style("font-size", "12px")

    g.append("g")
      .call(d3.axisLeft(yScale).ticks(6))
      .style("font-size", "12px")

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#666")
      .text("Enrollment")

    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 20})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#666")
      .text("Academic Year")

    // Add the line path
    const path = g.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#0d6efd")
      .attr("stroke-width", 3)
      .attr("d", line)

    // Animate the line
    const totalLength = path.node()?.getTotalLength() || 0
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    // Add data points with animation
    g.selectAll(".dot")
      .data(chartData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.year) || 0)
      .attr("cy", d => yScale(d.enrollment))
      .attr("r", 0)
      .style("fill", "#0d6efd")
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .transition()
      .duration(500)
      .delay((d, i) => 2000 + i * 100)
      .attr("r", 5)

    // Add value labels with animation
    g.selectAll(".label")
      .data(chartData)
      .enter().append("text")
      .attr("class", "label")
      .attr("x", d => xScale(d.year) || 0)
      .attr("y", d => yScale(d.enrollment) - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .style("opacity", 0)
      .text(d => d.enrollment.toLocaleString())
      .transition()
      .duration(500)
      .delay((d, i) => 2500 + i * 100)
      .style("opacity", 1)

  }, [selectedSchoolData])

  const handleSchoolTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchoolType(e.target.value as SchoolType)
  }

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool(e.target.value)
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">School Enrollment Projections</h1>
          <p className="lead text-center mb-5">
            Explore enrollment projections from 2024 to 2029 for schools in our district
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <Form.Group>
            <Form.Label>School Type</Form.Label>
            <Form.Select value={selectedSchoolType} onChange={handleSchoolTypeChange}>
              {schoolTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6} className="mb-3">
          <Form.Group>
            <Form.Label>School Name</Form.Label>
            <Form.Select value={selectedSchool} onChange={handleSchoolChange}>
              <option value="">Select a school...</option>
              {schoolNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {selectedSchoolData && (
        <Row className="mb-5">
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">
                  {selectedSchoolData.School} 
                  {selectedSchoolData["School Type"] && (
                    <span className="ms-2">
                      <small>({selectedSchoolData["School Type"]})</small>
                    </span>
                  )}
                </h3>
              </Card.Header>
              <Card.Body className="text-center">
                <div ref={chartRef} className="d-flex justify-content-center"></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {hasClassSizeData && (
        <Row className="mb-5">
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="bg-success">
                <h3 className="mb-0">Class Sizes for {selectedSchool} in 2024</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Class Name</th>
                      <th className="text-center">Class Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const maxClassSize = Math.max(...selectedSchoolClasses.map(c => c["Class Size"]))
                      let maxSizeFound = false
                      return selectedSchoolClasses.map((classData, index) => {
                        const isMaxSize = classData["Class Size"] === maxClassSize && !maxSizeFound
                        const isAdditionalSection = classData["Class Name"].includes("(Section")
                        if (isMaxSize) {
                          maxSizeFound = true
                        }
                        return (
                            <tr key={`${classData.School}-${classData["Class Name"]}-${index}`} className={`${isAdditionalSection ? "text-decoration-underline" : ""}`}>
                            <td className={isMaxSize ? "fw-bold" : ""}>{classData["Class Name"]}</td>
                            <td className={`text-center ${isMaxSize ? "fw-bold" : ""}`}>{classData["Class Size"]}</td>
                          </tr>
                        )
                      })
                    })()}
                  </tbody>
                </Table>
                
                {(() => {
                  const stats = calculateStats(selectedSchoolClasses)
                  return (
                    <div className="mt-4 p-3 bg-light rounded">
                      <h5 className="mb-3">Summary Statistics</h5>
                      <Row>
                        <Col sm={6} md={3} className="mb-2">
                          <strong>Average:</strong> {stats.average}
                        </Col>
                        <Col sm={6} md={3} className="mb-2">
                          <strong>Median:</strong> {stats.median}
                        </Col>
                        <Col sm={6} md={3} className="mb-2">
                          <strong>Min:</strong> {stats.min}
                        </Col>
                        <Col sm={6} md={3} className="mb-2">
                          <strong>Max:</strong> {stats.max}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          <strong>Total Classes:</strong> {stats.total}
                          {fteCount > 0 && (
                            <span className="text-success ms-2">
                              (+{fteCount}, {Math.round((fteCount / originalClassData.length) * 100)}% increase)
                            </span>
                          )}
                        </Col>
                      </Row>
                      {fteCount > 0 && (
                        <Row className="mt-2">
                          <Col>
                            <div className="alert alert-info mb-0">
                              <strong>Note:</strong> {fteCount} additional FTE{fteCount > 1 ? 's have' : ' has'} been added and students redistributed from the largest class{fteCount > 1 ? 'es' : ''}.
                            </div>
                          </Col>
                        </Row>
                      )}
                    </div>
                  )
                })()}
                
                <div className="mt-3 d-flex justify-content-center gap-2">
                  <Button 
                    variant="primary" 
                    onClick={handleAddFTE}
                    disabled={selectedSchoolClasses.length === 0}
                  >
                    Add 1 FTE / Teacher {fteCount > 0 && `(${fteCount} added)`}
                  </Button>
                  {fteCount > 0 && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleReset}
                    >
                      Reset to Original
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {!selectedSchoolData && selectedSchool === '' && (
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h4 className="text-muted mb-3">Select a School to View Projections</h4>
                <p className="text-muted">
                  Choose a school type and school name from the dropdowns above to see enrollment projections.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">About These Projections</h4>
              <p>
                These enrollment projections help us understand how school populations are expected to change over the coming years. 
                This data is crucial for planning:
              </p>
              <ul className="mb-4">
                <li><strong>Resource Allocation:</strong> Ensuring adequate staffing and materials for each school</li>
                <li><strong>Budget Planning:</strong> Preparing for changes in operational costs based on enrollment</li>
                <li><strong>Program Development:</strong> Adapting educational programs to serve projected student populations</li>
              </ul>
              <p className="mb-0">
                <strong>Data Source:</strong> Alpine School District <a href="https://www.youtube.com/watch?v=Lfe0Lr1tCCs" target="_blank" rel="noopener noreferrer">March 25th Study Session</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )

  function sortSchools(): (a: ClassSizeData, b: ClassSizeData) => number {
    return (a, b) => {
      // Special handling for Kindergarten to come before 1st grade
      if (a["Class Name"].includes("Kindergarten")) {
        return -1
      }
      if (b["Class Name"].includes("Kindergarten")) {
        return 1
      }
      // Default alphabetical sorting for other classes
      return a["Class Name"].localeCompare(b["Class Name"])
    }
  }
}