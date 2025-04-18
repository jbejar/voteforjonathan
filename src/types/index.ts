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