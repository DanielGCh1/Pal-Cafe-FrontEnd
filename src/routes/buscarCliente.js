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
    FormLabel,
    SimpleGrid
} from '@chakra-ui/react'
import { useState } from 'react'
import { Select } from '@chakra-ui/react'

import FilaTabla from '../componets/FilaTabla'

import useClientes from '../context/Cliente/UseClientes';
import { useEffect } from 'react';

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

    const { clientes, clienteSelecionado, getClientes, setClienteSelecionado, getCliente } =
        useClientes();

    useEffect(() => {
        getClientes();
    }, []);

    const errors = validate(
        clienteSelecionado ? clienteSelecionado.id : '',
        clienteSelecionado ? clienteSelecionado.usu_nombre : '',
        clienteSelecionado ? clienteSelecionado.email : '',
        clienteSelecionado ? clienteSelecionado.usu_fecha_registro : '',
        clienteSelecionado ? clienteSelecionado.usu_primer_apellido : '',
        clienteSelecionado ? clienteSelecionado.first_name : ''
    );


    return <>
        <VStack color='white' bg='blackAlpha.800' width="100%" h='1500' padding="50px 0px 20px 0px" >
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
                            <Th color='white' textAlign="center">Editar</Th>
                            <Th color='white' textAlign="center">Eliminar</Th>
                        </Tr>
                    </Thead>
                    <Tbody alignItems='center'>
                        {clientes.length
                            ? clientes.map(cliente => (
                                <FilaTabla nombre={cliente.usu_nombre} id={cliente.id} estado={cliente.usu_correo}  />
                            ))
                            : null}
                    </Tbody>
                </Table>
            </TableContainer>


            <form
                className="formProducto"
                onSubmit={ev => {
                    ev.preventDefault();
                    guardarCliente(clienteSelecionado);
                }}
            >
                <SimpleGrid color='black' columns={[1, null, 2]} spacing='40px' h='100'>
                    <FormLabel color='white'>Nombre</FormLabel>
                    <input
                        type="text"
                        name="usu_nombre"
                        className="inputsFoms"
                        autoComplete="off"
                        value={clienteSelecionado ? clienteSelecionado.usu_nombre : ''}
                        onChange={ev => setClienteSelecionado({ ...clienteSelecionado, usu_nombre: ev.target.value })}
                        style={input}
                    ></input>
                    <FormLabel color='white'>Primer apellido</FormLabel>
                    <input
                        type="text"
                        name="usu_primer_apellido"
                        autoComplete="off"
                        className="inputsFoms"
                        value={clienteSelecionado ? clienteSelecionado.usu_primer_apellido : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_primer_apellido: ev.target.value })
                        }
                        style={input}
                    ></input>
                    <FormLabel color='white'>Segundo apellido</FormLabel>
                    <input
                        type="text"
                        name="usu_segundo_apellido"
                        autoComplete="off"
                        className="inputsFoms"
                        value={clienteSelecionado ? clienteSelecionado.usu_segundo_apellido : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_segundo_apellido: ev.target.value })
                        }
                        style={input}
                    ></input>
                    <FormLabel color='white'>Correo electronico</FormLabel>
                    <input
                        type="text"
                        name="usu_correo"
                        autoComplete="off"
                        className="inputsFoms"
                        value={clienteSelecionado ? clienteSelecionado.usu_correo : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_correo: ev.target.value })
                        }
                        style={input}
                    ></input>
                    <FormLabel color='white'>Numero de telefono 1</FormLabel>
                    <input
                        type="text"
                        name="usu_numero_telefono1"
                        autoComplete="off"
                        className="inputsFoms"
                        value={clienteSelecionado ? clienteSelecionado.usu_numero_telefono1 : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_numero_telefono1: ev.target.value })
                        }
                        style={input}
                    ></input>
                    <FormLabel color='white'>Numero de telefono 2</FormLabel>
                    <input
                        type="text"
                        name="usu_numero_telefono2"
                        autoComplete="off"
                        className="inputsFoms"
                        value={clienteSelecionado ? clienteSelecionado.usu_numero_telefono2 : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_numero_telefono2: ev.target.value })
                        }
                        style={input}
                    ></input>
                    <FormLabel color='white'>Dirección</FormLabel>
                    <input
                        type="text"
                        name="usu_direccion"
                        autoComplete="off"
                        className="inputsFoms"
                        w="100%"
                        value={clienteSelecionado ? clienteSelecionado.usu_direccion : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_direccion: ev.target.value })
                        }
                        style={input}
                    ></input>

                    <FormLabel color='white'>Estado</FormLabel>
                    <input
                        type="text"
                        name="usu_estado"
                        autoComplete="off"
                        className="inputsFoms"
                        w="100%"
                        value={clienteSelecionado ? clienteSelecionado.usu_estado : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_estado: ev.target.value })
                        }
                        style={input}
                    ></input>

                    <FormLabel color='white'>Fecha Registro</FormLabel>
                    <input
                        type="date"
                        name="usu_fecha_registro"
                        autoComplete="off"
                        className="inputsFoms"
                        w="100%"
                        value={clienteSelecionado ? clienteSelecionado.usu_fecha_registro : ''}
                        onChange={ev =>
                            setClienteSelecionado({ ...clienteSelecionado, usu_fecha_registro: ev.target.value })
                        }
                        style={input}
                    ></input>

                    <p style={error}>{errors}</p>

                    <HStack position={["absolute", "relative"]} bottom="6" alignSelf="flex-end" display="flex" flexWrap="wrap">
                        <Button
                            color="White"
                            bgColor="#822424"
                            type="submit"
                            w="140px"
                            h="47px"
                            _hover={{
                                bg: '#FFDB58',
                                color: 'red.900',
                                borderColor: 'red.900',
                                borderStyle: 'solid',
                                borderWidth: '2px',
                            }}
                        >
                            Guardar cambios
                        </Button>


                    </HStack>

                </SimpleGrid>

            </form>


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
} const guardarCliente = product => {
    setTimeout(() => {
        alert(JSON.stringify(product, null, 2));
    }, 1000);
};

const validate = (
    selected,
    name,
    description,
    amount,
    materialPrice,
    salePrice,
    preparationTime
) => {
    if (selected !== null) {
        if (name !== undefined)
            if (name.length === 0) return 'Se requiere un nombre';
        if (description !== undefined)
            if (description.length === 0) return 'Se requiere una descripcion';
        if (amount !== undefined)
            if (amount.length === 0) return 'Se requiere una cantidad';
        if (materialPrice !== undefined)
            if (materialPrice.length === 0)
                return 'Se requiere el gasto en ingredientes';
        if (salePrice !== undefined)
            if (salePrice.length === 0) return 'Se requiere el precio de venta';
        if (preparationTime !== undefined)
            if (preparationTime.length === 0)
                return 'Se requiere el tiempo preparacion';
    } else {
        return '';
    }
};

const error = {
    color: 'red',
};
const input = {
    border: '1px solid black',
    width: '100%',
};
const ml = {
    margin_left: '2%',
};

const mr = {
    margin_right: '20px',
};