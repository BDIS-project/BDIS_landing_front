"use client";

import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fetchReportData } from '@/lib/fetchStats/fetchReportData';  // Update the import path as necessary

export default function DownloadReportsPage() {
    const [reportData, setReportData] = useState<{ [key: string]: any } | null>(null);  // Assuming reportData is an object with string keys
    const sections: string[] = ["Category", "Product", "Store_Product", "Employee", "Customer_Card", "Check_Table", "Sale"];

    useEffect(() => {
        const getReportData = async () => {
            const fetchedReportData = await fetchReportData();
            if (fetchedReportData) {
                setReportData(fetchedReportData);
            }
        };

        getReportData();
    }, []);

    const convertToCSV = (objArray: any[]) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let csv = '';
        array.forEach((row: any) => {
            csv += Object.values(row).join(',') + '\n';
        });
        return csv;
    };

    const handleDownload = (section: string) => {
        if (reportData && reportData["report"][section]) {
            const csvContent = convertToCSV(reportData["report"][section]);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${section}.csv`;  // Use .xls extension for Excel format (it's common to use .xls for CSV to avoid browser warnings)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);  // Clean up the blob URL
        }
    };

    return (
        <Box bg="gray.800" minH="100vh">
            <Box bg="white" py={10} maxW="600px" mx="auto" px={8} my="100px" borderRadius="15px">
                <Heading as="h1" mb={6}>Download Reports</Heading>
                <VStack spacing={4} align="stretch">
                    {sections.map(section => (
                        <Button 
                            key={section} 
                            colorScheme="teal" 
                            onClick={() => handleDownload(section)}
                        >
                            Download {section} Report
                        </Button>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
}
