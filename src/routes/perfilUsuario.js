import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, Box, Heading, } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import ProductosVentaPaginaPrincipal from '../componets/productosVentaPaginaPrincipal'

import { SimpleGrid } from '@chakra-ui/react'

import { Divider } from '@chakra-ui/react'

import {
    Stack, HStack, VStack, StackDivider, Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Table,
    Thead,
    Tbody,
} from '@chakra-ui/react'

import { Flex, Spacer } from '@chakra-ui/react'

import { Text } from '@chakra-ui/react'

import { FormControl, FormLabel, FormErrorMessage, Button, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import useClientes from '../context/Cliente/UseClientes';
import { useEffect, useState } from 'react';

const Fila = () => {
    const [hoverImage, setHoverImege] = useState(false);

    return <>
        <Tr alignItems='center' textAlign="center">
            <Td textAlign="center" >1</Td>
            <Td textAlign="center">₡ 1 200</Td>
            <Td textAlign="center">Pan dulce</Td>
        </Tr>
    </>
}

export default function PerfilUsuario() {

    const { clientes, clienteSelecionado, getClientes, setClienteSelecionado, getCliente } =
        useClientes();

    useEffect(() => {
        getClientes();
        getCliente(1);
    }, []);

    const handleClick = id => {
        getCliente(1);
    };

    const errors = validate(
        clienteSelecionado ? clienteSelecionado.id : '',
        clienteSelecionado ? clienteSelecionado.last_name : '',
        clienteSelecionado ? clienteSelecionado.first_name : '',
        clienteSelecionado ? clienteSelecionado.email : '',
        clienteSelecionado ? clienteSelecionado.first_name : '',
        clienteSelecionado ? clienteSelecionado.first_name : ''
    );

    return <>
        <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
            justifyContent='center'>

            <HeaderPaginaPrincipal />

            <VStack
                spacing={4}

                align='center'
            >
                <Stack backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
                    justifyContent='center' >

                </Stack>

                <Box p='2'>
                    <Heading size='2xl'>Cliente</Heading>
                </Box>
                <Container bg='blackAlpha.800' p='20px' color='black' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='70%' boxShadow='dark-lg'>
                    <form
                        onSubmit={ev => {
                            ev.preventDefault();
                            console.log("Cliente que estoy editando " + clienteSelecionado);
                            handleClick();
                        }}
                    >
                        <FormLabel>Nombre</FormLabel>
                        <input
                            type="text"
                            name="nombre"
                            autoComplete="off"
                            value={clienteSelecionado ? clienteSelecionado.first_name : ''}
                            onChange={ev => setClienteSelecionado({ ...clienteSelecionado, id: ev.target.value })}
                        ></input>

                        <p>{errors}</p>

                        <Button
                            mt={4}
                            colorScheme='red'
                            type='submit'
                            marginTop='10'
                        >
                            Guardar Cambios
                        </Button>
                    </form>
                </Container>


                <Formik
                    initialValues={{
                        nombre: '',
                        primerApellido: '',
                        segundoApellido: '',
                        email: '',
                        numeroUno: '',
                        numeroDos: '',
                        direcciom: '',
                        contra: '',
                        repContra: '',
                    }}

                    validationSchema={Yup.object({
                        nombre: Yup.string()
                            .required('Requerido'),
                        primerApellido: Yup.string()
                            .required('Requerido'),
                        segundoApellido: Yup.string()
                            .required('Requerido'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Requerido'),
                        primerApellido: Yup.string()
                            .required('Requerido'),
                        segundoApellido: Yup.string()
                            .required('Requerido'),
                        numeroUno: Yup.string()
                            .required('Requerido'),
                        direcciom: Yup.string()
                            .required('Requerido'),
                        contra: Yup.string()
                            .required('Requerido'),
                        repContra: Yup.string()
                            .required('Requerido'),
                    })}

                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            actions.setSubmitting(false)
                        }, 1000)
                    }}
                >
                    {(props) => (
                        <Container bg='blackAlpha.800' p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='70%' boxShadow='dark-lg'>
                            <Form>
                                <HStack spacing='28'>
                                    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing='40px' alignItems='center'>
                                        <Field name='nombre'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.nombre && form.touched.nombre}>
                                                    <FormLabel>Nombre</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.nombre}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='primerApellido'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.primerApellido && form.touched.primerApellido}>
                                                    <FormLabel>Primer apellido</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.primerApellido}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='segundoApellido'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.segundoApellido && form.touched.segundoApellido}>
                                                    <FormLabel>Segundo apellido</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.segundoApellido}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <FormControl>
                                            <FormLabel>Fecha de registro: </FormLabel>
                                            <Input
                                                placeholder="Select Date and Time"
                                                size="md"
                                                type="date"
                                            />
                                        </FormControl>
                                        <Field name='email'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel>Correo electrónico</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='numeroUno'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.numeroUno && form.touched.numeroUno}>
                                                    <FormLabel>Numero de teléfono 1</FormLabel>
                                                    <Input {...field} type='number' />
                                                    <FormErrorMessage>{form.errors.numeroUno}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='numeroDos'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.numeroDos && form.touched.numeroDos}>
                                                    <FormLabel>Numero de teléfono 2</FormLabel>
                                                    <Input {...field} type='number' />
                                                    <FormErrorMessage>{form.errors.numeroDos}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='direcciom'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.direcciom && form.touched.direcciom}>
                                                    <FormLabel>Dirección</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.direcciom}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='contra'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.contra && form.touched.contra}>
                                                    <FormLabel>Contraseña</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.contra}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='repContra'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.repContra && form.touched.repContra}>
                                                    <FormLabel>Repetir contraseña</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage>{form.errors.repContra}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <FormControl>
                                            <FormLabel>Estado</FormLabel>
                                            <FormLabel>Aceptado</FormLabel>
                                        </FormControl>




                                    </SimpleGrid>
                                </HStack>
                                <Box p='5'>
                                    <Heading size='md'>Pedidos:</Heading>
                                </Box>

                                <TableContainer width='100%' bg='white' color='black'>
                                    <Table variant='striped' colorScheme='blackAlpha'>
                                        <Thead bg='red.900'>
                                            <Tr >
                                                <Th color='white' textAlign="center">Pedido Numero:</Th>
                                                <Th color='white' textAlign="center">Costo</Th>
                                                <Th color='white' textAlign="center">Descripción</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody alignItems='center'>
                                            <Fila />
                                            <Fila />
                                            <Fila />
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                                <Flex
                                    h='100px'
                                    direction={{ base: 'column', md: 'row' }}
                                    alignItems='center'
                                >
                                    <Button
                                        mt={4}
                                        colorScheme='red'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                        marginTop='10'
                                    >
                                        Hacer pedido especial
                                    </Button>
                                    <Spacer />
                                    <Button
                                        mt={4}
                                        colorScheme='red'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                        marginTop='10'
                                    >
                                        Carrito
                                    </Button>
                                    <Spacer />
                                    <Button
                                        mt={4}
                                        colorScheme='red'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                        marginTop='10'
                                    >
                                        Guardar Cambios
                                    </Button>
                                </Flex>
                            </Form>

                        </Container>
                    )}
                </Formik>

            </VStack>

        </Container>
    </>
}
const guardarCambiosCliente = nombre => {
    alert(nombre);
};

const validate = (
    name,
    description,
    amount,
    materialPrice,
    salePrice,
    preparationTime
) => {
    if (name !== undefined) if (name.length === 0) return 'Se requiere un nombre';
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
};