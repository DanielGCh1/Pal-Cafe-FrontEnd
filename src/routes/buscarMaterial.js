import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Text,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
    VStack,
    HStack,
    Button,
    background,
} from '@chakra-ui/react'

export default function buscarMaterial() {

    return <>
        <VStack color='white' bg='blackAlpha.800' p='20px' borderRadius='10px'
            minWidth='max-content' alignSelf='center' alignItems='center'
            maxWidth='50%' boxShadow='dark-lg' margin='auto' marginTop='40px'
            spacing='8' position='relative'>
            <VStack>
                <HStack>
                    <Text>Buscar Materiales</Text>
                </HStack>
            </VStack>
            <TableContainer width='80%' bg='white' color='black'>
                <Table variant='striped' colorScheme='blackAlpha'>
                    <Thead bg='red.900'>
                        <Tr>
                            <Th color='white'>Nombre</Th>
                            <Th color='white' isNumeric>Cantidad Actual</Th>
                            <Th color='white' isNumeric>Venta Online</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <HStack spacing={5} display='flex' justifyContent='flex-end' width='100%'>
            <Button
                    color='White'
                    bgColor='#822424'
                    _hover={{ bg: '#FFDB58', color: 'red.900', borderColor:"red.900", borderStyle:"solid", borderWidth:"2px"}}
                >
                    Editar
                </Button>
                <Button
                    color='White'
                    bgColor='#822424'
                    _hover={{ bg: '#FFDB58', color: 'red.900', borderColor:"red.900", borderStyle:"solid", borderWidth:"2px"}}
                >
                    Eliminar
                </Button>
                <Button
                    color='White'
                    bgColor='#822424'
                    _hover={{ bg: '#FFDB58', color: 'red.900', borderColor:"red.900", borderStyle:"solid", borderWidth:"2px"}}
                >
                    Guardar Cambios
                </Button>
            </HStack>



            {/* Elelementos absolutos */}
            <Button
                color='black'
                colorScheme='gray'
                _hover={{ bg:'red.900', color: 'White' }}
                position='absolute'
                right='12px'
                top='-20px'
            >
                Configuracion
            </Button>
        </VStack>
    </>
}