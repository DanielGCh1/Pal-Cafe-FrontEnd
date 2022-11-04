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
const Fila = () => {
    const [hoverImage, setHoverImege] = useState(false);

    return <>
        <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
            <Td>
                <Image src={require("../assets/lapicera.png")} width="35px" height="35px" alt="" m="auto" />
            </Td>
            <Td>
                <Image src={require(hoverImage ? "../assets/eliminarHover.png" : "../assets/eliminar.png")} width="35px" height="35px" alt="" m="auto"
                    _hover={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoverImege(true)} onMouseLeave={() => setHoverImege(false)} />
            </Td>
        </Tr>
    </>
}

export default function BuscarMaterial() {

    return <>
        <VStack color='white' bg='blackAlpha.800' width="100%" h='calc(100vh)' padding="50px 0px 20px 0px" >
            <VStack>
                <HStack>
                    <h1 className="title">Buscar Materiales</h1>
                </HStack>
            </VStack>
            <TableContainer width='80%' bg='white' color='black'>
                <Table variant='striped' colorScheme='blackAlpha'>
                    <Thead bg='red.900'>
                        <Tr>
                            <Th color='white' textAlign="center">Nombre</Th>
                            <Th color='white' textAlign="center">Cantidad Actual</Th>
                            <Th color='white' textAlign="center">Venta Online</Th>
                            <Th color='white' textAlign="center">Editar</Th>
                            <Th color='white' textAlign="center">Eliminar</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Fila/>
                        <Fila/>
                        <Fila/>
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
                _hover={{ bg: '#FFDB58', color: 'red.900', borderColor: "red.900", borderStyle: "solid", borderWidth: "2px" }}
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