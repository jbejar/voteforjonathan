'use client'
import { useEffect, useRef, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import Fuse from 'fuse.js'
import { TaxProperty } from '../../types'
import taxData from './district3.json'
import asdRates from './rates.json'

// Type the imported data
const typedTaxData: TaxProperty[] = taxData as TaxProperty[]

interface AddressSearchProps {
    onAddressSelect: (property: TaxProperty) => void
}

function AddressSearch({ onAddressSelect }: AddressSearchProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<TaxProperty[]>([])
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    // Configure Fuse.js for fuzzy searching
    const fuse = useRef(
        new Fuse(typedTaxData, {
            keys: ['address'],
            threshold: 0.3, // Lower threshold = more strict matching
            minMatchCharLength: 2,
            includeScore: true,
            findAllMatches: false,
        })
    )

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const results = fuse.current.search(searchTerm)
            setSearchResults(results.map(result => result.item).slice(0, 10)) // Limit to 10 results
            setShowResults(true)
        } else {
            setSearchResults([])
            setShowResults(false)
        }
    }, [searchTerm])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleAddressSelect = (property: TaxProperty) => {
        setSearchTerm(property.address)
        setShowResults(false)
        onAddressSelect(property)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleInputFocus = () => {
        if (searchResults.length > 0) {
            setShowResults(true)
        }
    }

    return (
        <div ref={searchRef} style={{ position: 'relative' }}>
            <Form.Group className="mb-3">
                <Form.Label>Search Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Start typing your address..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
            </Form.Group>
            
            {showResults && searchResults.length > 0 && (
                <ListGroup 
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #dee2e6',
                        borderRadius: '0.375rem'
                    }}
                >
                    {searchResults.map((property) => (
                        <ListGroup.Item
                            key={property.parcel}
                            action
                            onClick={() => handleAddressSelect(property)}
                            style={{ cursor: 'pointer' }}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <span>{property.address}</span>
                            <small className="text-muted">Parcel: {property.parcel}</small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    )
}

function TaxesContent() {
    const [selectedProperty, setSelectedProperty] = useState<TaxProperty | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const parcelId = searchParams.get('parcel')
        if (parcelId) {
            const property = typedTaxData.find(p => p.parcel.toString() === parcelId)
            if (property) {
                setSelectedProperty(property)
            }
        }
    }, [searchParams])

    const handleAddressSelect = (property: TaxProperty) => {
        setSelectedProperty(property)
        router.push(`/taxes?parcel=${property.parcel}`, { scroll: false })
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const getYearlyData = (property: TaxProperty) => {
        const years = Object.keys(property.marketValue)
            .filter(year => parseInt(year) >= 2003)
            .sort((a, b) => parseInt(a) - parseInt(b))
        return years.map(year => ({
            year,
            marketValue: property.marketValue[year],
            taxableValue: property.marketValue[year] * 0.55, // Assuming 60% of market value is taxable
            asdTaxRate: asdRates[year] || 0, // Get the tax rate for the year, default to 0 if not found
            asdTax: (property.marketValue[year] * 0.55 * (asdRates[year] || 0)).toFixed(0), // Calculate tax based on taxable value and rate
        }))
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Property Tax Information - District 3</h1>
                    <p className="lead">
                        Search for your property to see historical market values and tax information.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h5>Address Search</h5>
                        </Card.Header>
                        <Card.Body>
                            <AddressSearch onAddressSelect={handleAddressSelect} />
                            <p className="text-muted small mt-2">
                                Start typing to search through {typedTaxData.length} properties in District 3.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {selectedProperty && (
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h5>Property Details</h5>
                            </Card.Header>
                            <Card.Body>
                                <h6>{selectedProperty.address}</h6>
                                <p><strong>Parcel Number:</strong> <a target="_blank" rel="noopener noreferrer" href={`https://www.utahcounty.gov/LandRecords/property.asp?av_serial=${selectedProperty.parcel}002`}>{selectedProperty.parcel}</a></p>
                                <p>
                                    <strong>Current Market Value (2025):</strong>{' '}
                                    {formatCurrency(selectedProperty.marketValue[2025] || 0)}
                                </p>
                                <p>
                                    <strong>Previous Year (2024):</strong>{' '}
                                    {formatCurrency(selectedProperty.marketValue[2024] || 0)}
                                </p>
                                <p>
                                    <strong>Without Truth In Taxation:</strong>{' '}
                                    {formatCurrency(selectedProperty.marketValue[2025] *  0.55 * 0.005674 || 0)}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>

            {selectedProperty && (
                <Row className="mt-4">
                    <Col>
                        <Card>
                            <Card.Header>
                                <h5>Historical Tax Information</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Market Value</th>
                                            <th>ASD Tax Rate</th>
                                            <th>Total Tax Paid</th>
                                            <th>Year-over-Year Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getYearlyData(selectedProperty)
                                            .reverse()
                                            .slice(0, 10)
                                            .map((data, index, array) => {
                                                const prevValue = array[index + 1]?.asdTax
                                                const change = prevValue ? 
                                                    ((data.asdTax - prevValue) / prevValue * 100) : null
                                                
                                                return (
                                                    <tr key={data.year}>
                                                        <td>{data.year}</td>
                                                        <td>{formatCurrency(data.marketValue)}</td>
                                                        <td>{(data.asdTaxRate).toFixed(6)}</td>
                                                        <td>{formatCurrency(parseInt(data.asdTax))}</td>
                                                        <td>
                                                            {change !== null ? (
                                                                <span className={change >= 0 ? 'text-success' : 'text-danger'}>
                                                                    {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                                                                </span>
                                                            ) : (
                                                                <span className="text-muted">-</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default function TaxesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TaxesContent />
        </Suspense>
    )
}


