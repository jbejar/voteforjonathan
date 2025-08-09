// This file contains TypeScript types and interfaces used in the application.

export interface ExampleType {
    id: number;
    name: string;
    description?: string;
}

export type ExampleProps = {
    title: string;
    isActive: boolean;
};

// School projection data interfaces
export interface SchoolProjection {
    School: string;
    "School Type"?: string;
    fall2024: number;
    fall2025: number;
    fall2026: number;
    fall2027: number;
    fall2028: number;
    fall2029: number;
}

export interface ProjectionDataPoint {
    year: string;
    enrollment: number;
}

export type SchoolType = "Elementary School" | "Jr. High School" | "High School" | "All";

// Class size data interfaces
export interface ClassSizeData {
    School: string;
    "Class Name": string;
    "Class Size": number;
}

export interface ClassSizeStats {
    average: number;
    median: number;
    min: number;
    max: number;
    total: number;
}

// Tax data interfaces
export interface TaxProperty {
    address: string;
    parcel: number;
    asdTax: number;
    marketValue: Record<string, number>;
}