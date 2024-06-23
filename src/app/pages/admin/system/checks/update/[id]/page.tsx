// "use client";
// //---------------------------------
// //           DEPRECATED 
// //---------------------------------

// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Input, Button, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
// import { useRouter } from 'next/navigation';
// import { fetchCheck, updateCheck } from '@/lib/fetchSystem/checkService';
// import { Check } from '@/interfaces';

// export default function UpdateCheckPage({ params }: { params: { id: string } }) {
//     const router = useRouter();
//     const id = params.id;
//     const [check, setCheck] = useState<Check | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [printDate, setPrintDate] = useState('');
//     const [sumTotal, setSumTotal] = useState(0);
//     const [vat, setVat] = useState(0);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const getCheck = async () => {
//             const checkData = await fetchCheck(id);
//             if (!checkData) {
//                 setError('Failed to fetch check details.');
//             } else {
//                 setCheck(checkData);
//                 setPrintDate(checkData.print_date); // Assuming print_date is the property name
//                 setSumTotal(checkData.sum_total);
//                 setVat(checkData.vat);
//             }
//             setLoading(false);
//         };
//         getCheck();
//     }, [id]);

//     const handleUpdate = async () => {
//         setLoading(true);
//         if (check) {
//             const updatedCheck: Check = {
//                 ...check,
//                 print_date: printDate,
//                 sum_total: sumTotal,
//             };

//             const response = await updateCheck(updatedCheck);
//             if ('error' in response) {
//                 setError(response.error);
//             } else {
//                 router.push('/pages/admin/system/checks'); // Redirect to checks list after update
//             }
//             setLoading(false);
//         }
//     };

//     if (!check) {
//         return <div>Loading...</div>; // Handle loading state
//     }

//     return (
//         <Box bg="gray.800">
//             <Box bg="white" py={10} maxW="1000px" mx="auto" px="100" my="100px" borderRadius="15px">
//                 <Heading as="h1" mb={4}>Update Check: {id}</Heading>
//                 {error && (
//                         <Alert status="error">
//                             <AlertIcon />
//                             <AlertTitle>Error:</AlertTitle>
//                             <AlertDescription>{error}</AlertDescription>
//                         </Alert>
//                         )}
//                 <VStack spacing={4} align="stretch" maxW="400px">
//                     <Text fontWeight="semibold">Print date:</Text>
//                     <Input value={printDate} onChange={(e) => setPrintDate(e.target.value)} placeholder="Print Date" />
//                     <Text fontWeight="semibold">Total sum:</Text>
//                     <Input value={sumTotal} onChange={(e) => setSumTotal(Number(e.target.value))} placeholder="Sum Total" />
//                     <Text fontWeight="semibold">Vat:</Text>
//                     <Text>{vat}</Text>
//                     <Button colorScheme="teal" onClick={handleUpdate} isLoading={loading}>
//                         Update Check
//                     </Button>
//                 </VStack>
//             </Box>
//         </Box>
//     );
// }
