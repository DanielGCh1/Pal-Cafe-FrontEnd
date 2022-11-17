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
    Image,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Select } from '@chakra-ui/react'

const Fila = () => {
    const [hoverImage, setHoverImege] = useState(false);

    return <>
        <Tr alignItems='center' textAlign="center">
            <Td textAlign="center" >Freddy</Td>
            <Select placeholder='Pendiente'>
                <option value='option1'>Aceptado</option>
                <option value='option2'>No Aceptado</option>
                <option value='option3'>Pendiente</option>
                <option value='option3'>De baja </option>
            </Select>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">1</Td>

        </Tr>
    </>
}

export default function BuscarCliente() {

    return <>
        <VStack color='white' bg='blackAlpha.800' width="100%" h='calc(100vh)' padding="50px 0px 20px 0px" >
            <VStack>
                <HStack>
                    <h1 className="title">Buscar Clientes</h1>
                </HStack>
            </VStack>
            <TableContainer width='95%' bg='white' color='black'>
                <Table variant='striped' colorScheme='blackAlpha'>
                    <Thead bg='red.900'>
                        <Tr >
                            <Th color='white' textAlign="center">Nombre:</Th>
                            <Th color='white' textAlign="center">Estado</Th>
                            <Th color='white' textAlign="center">Pedidos Hechos</Th>
                            <Th color='white' textAlign="center">Pedidos Exitosos</Th>
                            <Th color='white' textAlign="center">Pedidos no Pagados</Th>
                            <Th color='white' textAlign="center">Pendientes</Th>
                        </Tr>
                    </Thead>
                    <Tbody alignItems='center'>
                        <Fila />
                        <Fila />
                        <Fila />
                    </Tbody>
                </Table>
            </TableContainer>



            {/* Elelementos absolutos */}
            <Button
                color='White'
                bgColor='#822424'
                _hover={{ bg: 'red.900', color: 'White' }}
                position='absolute'
                right='12px'
                top='10px'
                hover={{ bg: '#FFDB58', color: 'red.900', borderColor: "red.900", borderStyle: "solid", borderWidth: "2px" }}
            >
                Configuracion
            </Button>
            <Button
                color='White'
                bgColor='#822424'
                position='absolute'
                left='12px'
                top='10px'
                _hover={{ bg: '#FFDB58', color: 'red.900', borderColor: "red.900", borderStyle: "solid", borderWidth: "2px" }}
            >
                Guardar Cambios
            </Button>

        </VStack>
    </>
}