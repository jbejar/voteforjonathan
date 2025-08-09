'use client'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { TaxProperty } from '../types'

interface MarketValueBoxPlotProps {
    data: TaxProperty[]
    selectedProperty?: TaxProperty | null
}

interface BoxPlotStats {
    min: number
    q1: number
    median: number
    q3: number
    max: number
}

export default function MarketValueBoxPlot({ data, selectedProperty }: MarketValueBoxPlotProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const [stats, setStats] = useState<BoxPlotStats | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(400)
     useEffect(() => {
            const updateWidth = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.getBoundingClientRect().width
                setWidth(Math.max(400, containerWidth) - 300)
            }
            }
            
            updateWidth()
            window.addEventListener('resize', updateWidth)
            return () => window.removeEventListener('resize', updateWidth)
        }, [])
    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current) return

        // Clear previous chart completely
        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        // Calculate percentage increases from 2024 to 2025
        const percentageIncreases = data
            .filter(property => 
                property.marketValue[2024] && 
                property.marketValue[2025] && 
                property.marketValue[2024] > 0
            )
            .map(property => {
                const increase = ((property.marketValue[2025] - property.marketValue[2024]) / property.marketValue[2024]) * 100
                return increase
            })
            .filter(increase => !isNaN(increase))

        if (percentageIncreases.length === 0) return

        // Set dimensions and margins
        const margin = { top: 50, right: 150, bottom: 50, left: 150 }
        // Use container width for responsiveness
        
        const height = 225 - margin.top - margin.bottom

        // Create SVG
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        // Calculate quartiles and statistics
        const sortedData = percentageIncreases.sort(d3.ascending)
        const q1 = d3.quantile(sortedData, 0.25)!
        const median = d3.quantile(sortedData, 0.5)!
        const q3 = d3.quantile(sortedData, 0.75)!
        const iqr = q3 - q1
        const min = Math.max(d3.min(sortedData)!, q1 - 1.5 * iqr)
        const max = Math.min(d3.max(sortedData)!, q3 + 1.5 * iqr)

        // Store statistics for display below the chart
        setStats({ min, q1, median, q3, max })

        // Calculate selected property percentage increase if available
        let selectedPropertyIncrease: number | null = null
        if (selectedProperty && 
            selectedProperty.marketValue[2024] && 
            selectedProperty.marketValue[2025] && 
            selectedProperty.marketValue[2024] > 0) {
            selectedPropertyIncrease = ((selectedProperty.marketValue[2025] - selectedProperty.marketValue[2024]) / selectedProperty.marketValue[2024]) * 100
        }

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([Math.min(min - 1, 0), max + 1])
            .range([0, width])

        const yScale = d3.scaleBand()
            .domain(["Market Value % Increase"])
            .range([0, height])
            .padding(0.4)

        // Add X axis
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale)
            .ticks(8)
            .tickFormat(d => `${d}%`))

        // Add Y axis
        

        // Add X axis label
        g.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .style("font-size", "16px")
            .style("font-family", "Open Sans, sans-serif")
            .text("Percentage Increase in Market Value (2024 to 2025)")

        // Main horizontal line (whiskers)
        g.append("line")
            .attr("x1", xScale(min))
            .attr("x2", xScale(max))
            .attr("y1", yScale("Market Value % Increase")! + yScale.bandwidth() / 2)
            .attr("y2", yScale("Market Value % Increase")! + yScale.bandwidth() / 2)
            .attr("stroke", "black")
            .attr("stroke-width", 2)

        // Box (IQR)
        g.append("rect")
            .attr("x", xScale(q1))
            .attr("width", xScale(q3) - xScale(q1))
            .attr("y", yScale("Market Value % Increase")!)
            .attr("height", yScale.bandwidth())
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .style("fill", "#69b3a2")
            .style("opacity", 0.7)

        // Median line
        g.append("line")
            .attr("x1", xScale(median))
            .attr("x2", xScale(median))
            .attr("y1", yScale("Market Value % Increase")!)
            .attr("y2", yScale("Market Value % Increase")! + yScale.bandwidth())
            .attr("stroke", "black")
            .attr("stroke-width", 3)

        // Min whisker
        g.append("line")
            .attr("x1", xScale(min))
            .attr("x2", xScale(min))
            .attr("y1", yScale("Market Value % Increase")! + yScale.bandwidth() * 0.25)
            .attr("y2", yScale("Market Value % Increase")! + yScale.bandwidth() * 0.75)
            .attr("stroke", "black")
            .attr("stroke-width", 2)

        // Max whisker
        g.append("line")
            .attr("x1", xScale(max))
            .attr("x2", xScale(max))
            .attr("y1", yScale("Market Value % Increase")! + yScale.bandwidth() * 0.25)
            .attr("y2", yScale("Market Value % Increase")! + yScale.bandwidth() * 0.75)
            .attr("stroke", "black")
            .attr("stroke-width", 2)

        // Add outliers as individual points
        const outliers = sortedData.filter(d => d < min || d > max)
        g.selectAll(".outlier")
            .data(outliers)
            .enter()
            .append("circle")
            .attr("class", "outlier")
            .attr("cx", d => xScale(d))
            .attr("cy", yScale("Market Value % Increase")! + yScale.bandwidth() / 2)
            .attr("r", 3)
            .style("fill", "#ff6b6b")
            .style("stroke", "black")
            .style("stroke-width", 1)

        // Highlight selected property if available
        if (selectedPropertyIncrease !== null && !isNaN(selectedPropertyIncrease)) {
            g.append("circle")
                .attr("class", "selected-property")
                .attr("cx", xScale(selectedPropertyIncrease))
                .attr("cy", yScale("Market Value % Increase")! + yScale.bandwidth() / 2)
                .attr("r", 4)
                .style("fill", "#007bff")
                .style("stroke", "black")
                .style("stroke-width", 2)
                .style("opacity", 0.9)

            // Add a label for the selected property
            g.append("text")
                .attr("class", "selected-property-label")
                .attr("x", xScale(selectedPropertyIncrease))
                .attr("y", yScale("Market Value % Increase")! - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "15px")
                .style("font-family", "Open Sans, sans-serif")
                .style("font-weight", "bold")
                .style("fill", "#007bff")
                .text(`Your Property: ${selectedPropertyIncrease.toFixed(1)}%`)
        }

    }, [data, selectedProperty, width])

    return (
        <div ref={containerRef} className="d-flex flex-column align-items-center">
            <svg ref={svgRef}></svg>
            {stats && (
                <div className="mt-2 text-center">
                    <small className="text-muted">
                        <strong>Statistics:</strong> Min: {stats.min.toFixed(1)}% | Q1: {stats.q1.toFixed(1)}% | <strong>Median: {stats.median.toFixed(1)}%</strong> | Q3: {stats.q3.toFixed(1)}% | Max: {stats.max.toFixed(1)}%
                    </small>
                    {selectedProperty && selectedProperty.marketValue[2024] && selectedProperty.marketValue[2025] && (
                        <div className="mt-1">
                            <small className="text-primary">
                                <strong>Your Property Market Value:</strong> {(() => {
                                    const change = (((selectedProperty.marketValue[2025] - selectedProperty.marketValue[2024]) / selectedProperty.marketValue[2024]) * 100);
                                    const changeText = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change';
                                    return `${Math.abs(change).toFixed(1)}% ${changeText}`;
                                })()}
                            </small>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
