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
import { MarketValueBoxPlot } from '../../components'
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
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

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
            setSelectedIndex(-1) // Reset selection when results change
        } else {
            setSearchResults([])
            setShowResults(false)
            setSelectedIndex(-1)
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
        onAddressSelect(property)
        setShowResults(false)
        setSelectedIndex(-1)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showResults || searchResults.length === 0) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev => 
                    prev < searchResults.length - 1 ? prev + 1 : 0
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : searchResults.length - 1
                )
                break
            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                    handleAddressSelect(searchResults[selectedIndex])
                    // Force blur to hide dropdown
                    inputRef.current?.blur()
                }
                break
            case 'Escape':
                setShowResults(false)
                setSelectedIndex(-1)
                break
        }
    }

    const handleInputFocus = () => {
        if (searchResults.length > 0) {
            setShowResults(true)
        }
    }

    const handleInputBlur = () => {
        // Use setTimeout to allow click events on dropdown items to fire first
        setTimeout(() => {
            setShowResults(false)
            setSelectedIndex(-1)
        }, 150)
    }

    return (
        <div ref={searchRef} style={{ position: 'relative' }}>
            <Form.Group className="mb-3">
                <Form.Label>Search Address</Form.Label>
                <Form.Control
                    ref={inputRef}
                    type="text"
                    placeholder="Start typing your address..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
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
                    {searchResults.map((property, index) => (
                        <ListGroup.Item
                            key={property.parcel}
                            action
                            onClick={() => handleAddressSelect(property)}
                            style={{ 
                                cursor: 'pointer',
                                backgroundColor: index === selectedIndex ? '#e9ecef' : '#ffffff'
                            }}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <span>{property.address}</span>
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
        router.push(`/tax?parcel=${property.parcel}`, { scroll: false })
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
            asdTax: (property.marketValue[year] * 0.55 * (asdRates[year] || 0)), // Calculate tax based on taxable value and rate
        }))
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Alpine School District Property Taxes</h1>
                    <p className="lead">
                        Search for your property to see historical market values and school tax information.
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
                                Start typing to search through {typedTaxData.length} properties in Highland and Portions of Lehi in District 3.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {selectedProperty && (
                    <Col md={6} className="mt-3 mt-md-0">
                        <Card>
                            <Card.Header>
                                <h5>Property Details</h5>
                            </Card.Header>
                            <Card.Body>
                                <h6>{selectedProperty.address}</h6>
                                <p><strong>Parcel Number:</strong> <a target="_blank" rel="noopener noreferrer" href={`https://www.utahcounty.gov/LandRecords/property.asp?av_serial=${selectedProperty.parcel}002`}>{selectedProperty.parcel}</a></p>
                                <p>
                                    <strong>2025 Market Value Change:</strong>{' '}
                                    {formatCurrency(selectedProperty.marketValue[2025] - selectedProperty.marketValue[2024])}
                                </p>
                                <p>
                                    <strong>2025 ASD Tax Change:</strong>{' '}
                                    {(() => {
                                        const taxChange = selectedProperty.marketValue[2025] * 0.55 * asdRates[2025] - 
                                                                            selectedProperty.marketValue[2024] * 0.55 * asdRates[2024];
                                        return (
                                            <span className={`fw-bold`} style={{fontSize: '1.1em'}}>
                                                {taxChange >= 0 ? '+' : ''}{formatCurrency(taxChange)}
                                            </span>
                                        );
                                    })()}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h5>Market Value Analysis: 2024 to 2025</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <MarketValueBoxPlot data={typedTaxData} selectedProperty={selectedProperty} />
                            </div>
                            <div className="alert alert-info">
                                <h6><strong>Understanding Your 2025 Property Tax Increase</strong></h6>
                                <p className="mb-2">
                                    The <a href="https://en.wikipedia.org/wiki/Box_plot" target="_blank" rel="noopener noreferrer">box plot</a> above shows the distribution of market value increases across all properties in District 3.&nbsp;
                                    {selectedProperty ? 'Your' : 'Property tax increases are'} {selectedProperty ? 'property tax increase is' : ''} driven by <strong>two main factors</strong>:
                                </p>
                                <ol className="mb-2">
                                    <li><strong>Market Value {selectedProperty && selectedProperty.marketValue[2025] > selectedProperty.marketValue[2024] ? 'Increase' : selectedProperty && selectedProperty.marketValue[2025] < selectedProperty.marketValue[2024] ? 'Decrease' : 'Change'}:</strong> {selectedProperty ? 
                                        `Your property at ${selectedProperty.address.split("-")[0]} ${selectedProperty.marketValue[2025] > selectedProperty.marketValue[2024] ? 'increased' : selectedProperty.marketValue[2025] < selectedProperty.marketValue[2024] ? 'decreased' : 'remained the same'} from ${formatCurrency(selectedProperty.marketValue[2024])} to ${formatCurrency(selectedProperty.marketValue[2025])} (${selectedProperty.marketValue[2025] >= selectedProperty.marketValue[2024] ? '+' : ''}${formatCurrency(selectedProperty.marketValue[2025] - selectedProperty.marketValue[2024])})` :
                                        'Utah County assessed properties at different values'}</li>
                                    <li><strong>Tax Rate Change:</strong> The Alpine School District rate changed from {asdRates[2024].toFixed(6)} to {asdRates[2025].toFixed(6)} 
                                &nbsp;(a {(((asdRates[2025] - asdRates[2024]) / asdRates[2024]) * 100).toFixed(1)}% {asdRates[2025] > asdRates[2024] ? 'increase' : 'decrease'})</li>
                                </ol>
                                <p className="mb-0">
                                    <strong>Important:</strong> {selectedProperty ? 
                                        selectedProperty.marketValue[2025] > selectedProperty.marketValue[2024] ? 
                                            `Even if the tax rate had remained exactly the same, you would still see an increase in your school taxes due to the rise in your property's assessed value (${formatCurrency(selectedProperty.marketValue[2025] * 0.55 * asdRates[2024] - selectedProperty.marketValue[2024] * 0.55 * asdRates[2024])}). The rate change represents an additional component beyond the market value-driven increase (${formatCurrency(selectedProperty.marketValue[2025] * 0.55 * (asdRates[2025] - asdRates[2024]))}).` :
                                        selectedProperty.marketValue[2025] < selectedProperty.marketValue[2024] ?
                                            `If the tax rate had remained exactly the same, you would have seen a decrease in your school taxes due to the decline in your property's assessed value (${formatCurrency(selectedProperty.marketValue[2025] * 0.55 * asdRates[2024] - selectedProperty.marketValue[2024] * 0.55 * asdRates[2024])}). The rate change represents an additional component that ${asdRates[2025] > asdRates[2024] ? 'partially offsets this decrease' : 'further reduces your taxes'} (${formatCurrency(selectedProperty.marketValue[2025] * 0.55 * (asdRates[2025] - asdRates[2024]))}).` :
                                            `Since your property's assessed value remained the same, any change in your school taxes is solely due to the tax rate change (${formatCurrency(selectedProperty.marketValue[2025] * 0.55 * (asdRates[2025] - asdRates[2024]))}).`
                                        : 'Property tax changes are driven by both market value changes and tax rate adjustments. Even if tax rates remain the same, property owners may see changes in their taxes due to assessed value fluctuations.'
                                    }
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h5>Understanding Bond Tax Changes</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="alert alert-warning">
                                <h6><strong>Important: Bond Taxes Are Not Included in District Levy Notices</strong></h6>
                                <p className="mb-2">
                                    Your property tax notice shows changes to the &quot;District Levy&quot; but <strong>excludes bond payments</strong>. 
                                    This can make your tax situation appear worse than it actually is because decreasing bond payments offset other increases.
                                </p>
                                <p className="mb-2">
                                    Utah law requires that as property values increase, tax rates must decrease proportionally to prevent automatic tax increases. 
                                    The <strong>certified tax rate formula</strong> (<a href="https://le.utah.gov/xcode/Title59/Chapter2/59-2-S924.html">Utah Code 59-2-924</a>) ensures that taxing entities receive the same property tax revenue 
                                    as the prior year plus revenue from new growth only.
                                </p>
                                <p className="mb-2">
                                    <strong>For Alpine School District in 2025:</strong> Following this formula strictly, the District Levy would have been 
                                    calculated at <strong>0.003458</strong> - resulting in a tax rate decrease from the previous year. 
                                    However, the actual adopted rate of 0.003858 represents an effort to maintain tax rates steady due to bond payments decreasing by 20.1% from 2024 to 2025.
                                </p>
                            </div>
                            
                            <Table striped bordered className="mb-3">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>District Levy</th>
                                        <th className="d-none d-md-table-cell">Certified Rate</th>
                                        <th className="d-none d-md-table-cell">Bond Tax Rate</th>
                                        <th className="d-none d-lg-table-cell">Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2025</td>
                                        <td>0.003858</td>
                                        <td className="d-none d-md-table-cell text-muted">0.003458</td>
                                        <td className="d-none d-md-table-cell">0.000744</td>
                                        <td className="d-none d-lg-table-cell">
                                            <div>
                                                <span className="text-danger fw-bold d-block">
                                                    Levy: +4.1% vs 2024 ({formatCurrency((0.003858 - 0.003707) * (selectedProperty?.marketValue[2025] || 100000) * 0.55)} more)
                                                </span>
                                                <span className="text-warning fw-bold d-block">
                                                    Tax Increase: +11.6% vs certified rate ({formatCurrency((0.003858 - 0.003458) * (selectedProperty?.marketValue[2025] || 100000) * 0.55)} more)
                                                </span>
                                                <span className="text-success fw-bold">
                                                    Bond: -20.1% ({formatCurrency((0.000931 - 0.000744) * (selectedProperty?.marketValue[2025] || 100000) * 0.55)} less)
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2024</td>
                                        <td>0.003707</td>
                                        <td className="text-muted d-none d-md-table-cell">-</td>
                                        <td className="d-none d-md-table-cell">0.000931</td>
                                        <td className="d-none d-lg-table-cell">-</td>
                                    </tr>
                                </tbody>
                            </Table>
                            
                            {selectedProperty && (
                                <div className="alert alert-info">
                                    <p className="mb-2">
                                        <strong>For your property:</strong> While your District Levy increased from 0.003707 to 0.003858 ({(((0.003858 - 0.003707) / 0.003707) * 100).toFixed(1)}% increase), 
                                        your bond payments decreased by <strong>{formatCurrency((0.000931 - 0.000744) * selectedProperty.marketValue[2025] * 0.55)}</strong>, 
                                        which helps offset the levy increase.
                                    </p>
                                    <p className="mb-2">
                                        <strong>Legislative Formula Impact:</strong> If Alpine School District had adopted the certified tax rate of 0.003458 
                                        (designed to generate the same revenue as 2024), your District Levy would have been <strong>{formatCurrency((0.003707 - 0.003458) * selectedProperty.marketValue[2025] * 0.55)} lower</strong>. 
                                        The difference between the certified rate and adopted rate represents a <strong>{formatCurrency((0.003858 - 0.003458) * selectedProperty.marketValue[2025] * 0.55)} tax increase</strong> above the no-increase baseline.
                                    </p>
                                    <p className="mb-0">
                                        This bond decrease is <strong>not shown on your tax notice</strong> because bonds are excluded from District Levy calculations, 
                                        even though they directly impact your total tax bill.
                                    </p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h5>District Levy Breakdown</h5>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-3">
                                The Alpine School District levy (0.003858 in 2025) is composed of three distinct components, 
                                each with different purposes and legal limits:
                            </p>
                            
                            <Table striped bordered className="mb-3">
                                <thead>
                                    <tr>
                                        <th>Levy Component</th>
                                        <th>2025 Rate</th>
                                        <th className="d-none d-lg-table-cell">Legal Limit</th>
                                        <th>% of Max</th>
                                        <th className="d-none d-md-table-cell">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Board-Approved Local Levy</strong></td>
                                        <td>0.000977</td>
                                        <td className="d-none d-lg-table-cell">0.0025</td>
                                        <td>{((0.000977 / 0.0025) * 100).toFixed(1)}%</td>
                                        <td className="d-none d-md-table-cell">General fund operations for minimum school program</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Voted Local Levy</strong></td>
                                        <td>0.001152</td>
                                        <td className="d-none d-lg-table-cell">0.002</td>
                                        <td>{((0.001152 / 0.002) * 100).toFixed(1)}%</td>
                                        <td className="d-none d-md-table-cell">Unrestricted revenue for general fund</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Capital Local Rate</strong></td>
                                        <td>0.001329</td>
                                        <td className="d-none d-lg-table-cell">0.003</td>
                                        <td>{((0.001329 / 0.003) * 100).toFixed(1)}%</td>
                                        <td className="d-none d-md-table-cell">Capital projects and facilities (board-approved)</td>
                                    </tr>
                                    <tr className="table-active">
                                        <td><strong>Total District Levy</strong></td>
                                        <td><strong>0.003458</strong></td>
                                        <td className="d-none d-lg-table-cell"><strong>0.0075</strong></td>
                                        <td><strong>{((0.003458 / 0.0075) * 100).toFixed(1)}%</strong></td>
                                        <td className="d-none d-md-table-cell">Combined levy for all district operations</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="alert alert-info">
                                <h6><strong>Key Points:</strong></h6>
                                <ul className="mb-0">
                                    <li><strong>Board-Approved Levy:</strong> School boards can impose up to 0.0025 to fund basic operations</li>
                                    <li><strong>Voted Levy:</strong> Provides flexible funding for district priorities (limited to 0.002)</li>
                                    <li><strong>Capital Rate:</strong> Dedicated to building and facility improvements, approved by the school board (limited to 0.003)</li>
                                    <li><strong>Current Usage:</strong> ASD is using {((0.003458 / 0.0075) * 100).toFixed(1)}% of its maximum allowable levy capacity</li>
                                </ul>
                            </div>

                            {selectedProperty && (
                                <div className="alert alert-success">
                                    <h6><strong>Impact on Your Property:</strong></h6>
                                    <Table size="sm" className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Board-Approved Levy:</td>
                                                <td>{formatCurrency(selectedProperty.marketValue[2025] * 0.55 * 0.000977)}</td>
                                            </tr>
                                            <tr>
                                                <td>Voted Levy:</td>
                                                <td>{formatCurrency(selectedProperty.marketValue[2025] * 0.55 * 0.001152)}</td>
                                            </tr>
                                            <tr>
                                                <td>Capital Rate:</td>
                                                <td>{formatCurrency(selectedProperty.marketValue[2025] * 0.55 * 0.001329)}</td>
                                            </tr>
                                            <tr className="table-active fw-bold">
                                                <td>Total District Levy:</td>
                                                <td>{formatCurrency(selectedProperty.marketValue[2025] * 0.55 * 0.003458)}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            )}

                            <div className="mt-3">
                                <small className="text-muted">
                                    <strong>Source:</strong> Utah State Tax Commission Property Tax Standards, Section 10 - 
                                    <a href="https://propertytax.utah.gov/standards/standard10.pdf" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       className="text-decoration-none">
                                        School District Levies and Rates
                                    </a>
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
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
                                            <th className="d-none d-lg-table-cell">Market Value</th>
                                            <th>ASD Tax Rate</th>
                                            <th>Total Tax Paid</th>
                                            <th className="d-none d-md-table-cell">Year-over-Year Change</th>
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
                                                        <td className="d-none d-lg-table-cell">{formatCurrency(data.marketValue)}</td>
                                                        <td>{(data.asdTaxRate).toFixed(6)}</td>
                                                        <td>{formatCurrency((data.asdTax))}</td>
                                                        <td className="d-none d-md-table-cell">
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
            <Row className="mt-4">
                <p> <strong>Please note:</strong> The tax notices you receive may not provide a complete picture of your Alpine School District tax situation.
                            They don&apos;t clearly show how decreasing bond payments offset other increases, 
                            which can make it appear that your tax burden is increasing more than it actually is.
                 </p>
            <p>
                            This tool helps you see the full historical context of your property values and taxes,
                            making it easier to understand the actual impact of tax changes over time.
                        </p>
            <p>
                            You can view your official property tax notice online at <a href="https://enoticesonline.com/utu" target="_blank" rel="noopener noreferrer" className="text-primary">enoticesonline.com/utu</a>.
                        </p>
                        </Row>
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


