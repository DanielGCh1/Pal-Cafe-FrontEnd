import {
    Container, Box, Heading, Spacer, Button, Flex, Input, Text, HStack, FormLabel,
    SimpleGrid, Image, AspectRatio
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import FormRegister from '../componets/formRegister'

import useClientes from '../context/Cliente/UseClientes';
import { useEffect } from 'react';

export default function RegistrarCliente() {

    const { clientes, clienteSelecionado, getClientes, setClienteSelecionado, getCliente, setCliente } =
        useClientes();

    useEffect(() => {
        getClientes();
    }, []);

    const guardarCliente = clienteSelecionado => {
        setCliente(clienteSelecionado);
    };

    const errors = validate(
        clienteSelecionado ? clienteSelecionado.id : '',
        clienteSelecionado ? clienteSelecionado.last_name : '',
        clienteSelecionado ? clienteSelecionado.first_name : '',
        clienteSelecionado ? clienteSelecionado.email : '',
        clienteSelecionado ? clienteSelecionado.first_name : '',
        clienteSelecionado ? clienteSelecionado.first_name : ''
    );


    const [user, setUser] = useState('')
    const [passwrod, setPassword] = useState('')
    const handleChangeUser = (event) => setUser(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)

    return <>
        <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' color='white' display='flex' maxW='100%' h='calc(100vh)' justifyContent='center'>
            <Flex
                bg='blackAlpha.800' h='1400' p='20px' borderRadius='10px' flexDirection='column' minWidth='max-content' alignSelf='center' alignItems='center' gap='2' w='550px' boxShadow='dark-lg'>
                <Box p='1'>
                    <Heading size='md'>Registrarse</Heading>
                </Box>

                <Spacer />

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
                                Registrar Cliente
                            </Button>


                        </HStack>

                    </SimpleGrid>

                </form>


                <Spacer />

                <HStack>
                    <Text>¿Ya está registrado/a?</Text>
                    <Link className='linksto' to="/">Volver a Iniciar Sesión</Link>
                </HStack>
            </Flex>
        </Container>
    </>
}


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