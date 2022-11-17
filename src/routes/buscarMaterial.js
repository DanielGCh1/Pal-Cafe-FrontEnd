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
    Input,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { CargarIngredientes } from '../componets/PeticionesServer'
import useHover from "@react-hook/hover";

export default function BuscarMaterial() {
    const [materiales, setMateriales] = useState([])

    useEffect(() => {
        return async () => {
            const response = await CargarIngredientes();
            setMateriales(response)
        }
    }, [])



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
                            <Th color='white' textAlign="center">Descripcion</Th>
                            <Th color='white' textAlign="center">Precio</Th>
                            <Th color='white' textAlign="center">Cantidad Actual</Th>
                            <Th color='white' textAlign="center">UnidadMedia</Th>
                            <Th color='white' textAlign="center">Editar</Th>
                            <Th color='white' textAlign="center">Eliminar</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {materiales && materiales.map((p) => {
                            return (
                                <Tr key={p.id}>
                                    <Td><Input> </Input>
                                        {p.nombre}</Td>
                                    <Td>{p.descripcion}</Td>
                                    <Td>{p.precio}</Td>
                                    <Td>{p.cantidad}</Td>
                                    <Td>{p.unidadMedida}</Td>
                                    <Td>
                                    <Container className="btnEditarImage" w='35px' h='35px'/>
                                    </Td>
                                    <Td>
                                        <Container className="btnEliminarImage" w='35px' h='35px'/>
                                    </Td>
                                </Tr>
                            )
                        })}
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


