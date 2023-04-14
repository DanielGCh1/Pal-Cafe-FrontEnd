import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, Box, Heading, Image, GridItem, Textarea } from '@chakra-ui/react'
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
import { FormControl, FormLabel, FormErrorMessage, Button, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import useCustomer from '../context/Customer/UseCustomer';
import { useRef } from "react";
import ShoppingCartMekeOrder from '../componets/shoppingCartMekeOrder'
import useOrders from '../context/Orders/UseOrders';

const isUndefined = obj => {
    if (obj === "undefined" || typeof obj === "undefined") {
        return true;
    }
    return false;
};

const isNull = obj => {
    if (obj === null) {
        return true;
    }
    return false;
};
const isUndefinedOrNull = obj => {
    if (isUndefined(obj) || isNull(obj)) {
        return true;
    }
    return false;
};
const isEmptyString = obj => {
    if (obj === "" || obj.trim() === "") {//Trim: remove blank spaces
        return true;
    }
    return false;
};
const getImage = obj => {
    if (!isUndefinedOrNull(obj) && !isEmptyString(obj.usu_url_foto)) {//Trim: remove blank spaces
        return obj.usu_url_foto;
    }
    return require('../assets/User_Avatar_2.png');
};
const imprimirObjeto = obj => {
    console.log("Inicio de objeto");
    console.log(obj);
    console.log("Fin de objeto");
};
export default function MakeOrder() {

    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const [image, setImage] = useState(null);
    const { customer } = useCustomer();
    const { addOrder } = useOrders();

    const ref = useRef(null);//hace referencia a los datos del formulario


    return <>

        <Box p='4' display="flex" justifyContent={'center'}>
            <Heading size='2xl'>Hacer pedido</Heading>
        </Box>
        {(customer != null) ?
            <Formik
                innerRef={ref}
                initialValues={{
                    name: customer.usu_nombre,
                    address: customer.usu_direccion,
                    phoneNumber1: customer.usu_numero_telefono1,
                    phoneNumber2: customer.usu_numero_telefono2,
                    customerNote: "",
                    customer_id: customer._id,
                    dateHour: ''
                }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Requerido'),
                    address: Yup.string()
                        .required('Requerido'),
                    phoneNumber1: Yup.string()
                        .required('Requerido'),
                    dateHour: Yup.date().required('Este campo es obligatorio')

                    /*
                foto: Yup.mixed().required("Debes subir una imagen").test(
                    "es-imagen",
                    "Debes subir un archivo de tipo imagen",
                    (value) => value && value.type.includes("image")),
                */
                })}

                onSubmit={(values, actions) => {
                    console.log(values);
                    addOrder(values, actions);
                }}
            >
                {(props) => (
                    <Container bg='blackAlpha.800' p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='70%' boxShadow='dark-lg'>
                        <Form>
                            <HStack spacing='28'>
                                <SimpleGrid columns={[1, 2, 3]} spacing='40px' alignItems='center'>
                                    <Field name='name'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Nombre Cliente</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='address'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.address && form.touched.address}>
                                                <FormLabel>Dirección</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='phoneNumber1'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.phoneNumber1 && form.touched.phoneNumber1}>
                                                <FormLabel>Numero 1</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage>{form.errors.phoneNumber1}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='phoneNumber2'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.phoneNumber2 && form.touched.phoneNumber2}>
                                                <FormLabel>Numero 2</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage>{form.errors.phoneNumber2}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='customerNote'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.customerNote && form.touched.customerNote}>
                                                <FormLabel>Nota Cliente</FormLabel>
                                                <Textarea {...field} />
                                                <FormErrorMessage>{form.errors.customerNote}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="dateHour">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.dateHour && form.touched.dateHour}>
                                                <FormLabel>Fecha y hora del pedido</FormLabel>
                                                <Input type="datetime-local" {...field} />
                                                <FormErrorMessage>{form.errors.dateHour}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </SimpleGrid>
                            </HStack>
                            <Box p='5'>
                                <Heading size='md'>Lista de articulos:</Heading>
                            </Box>

                            <ShoppingCartMekeOrder idCurtomer={customer._id} />
                            <Button
                                mt={4}
                                colorScheme='red'
                                isLoading={props.isSubmitting}
                                type='submit'
                                marginTop='10'
                            >
                                Hacer Pedido
                            </Button>
                        </Form>

                    </Container>
                )}
            </Formik>
            : null
        }
    </>
}