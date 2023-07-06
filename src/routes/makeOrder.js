import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, Box, Heading, Image, GridItem, Textarea, Checkbox } from '@chakra-ui/react'
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

const getMinor = (val) => {
    if (val == 0) {
        val++;
    }
    if (val < 10) {
        var value = '0';
        value = value + `${val}`
        return value;
    }
    return val;
}

const getDate = () => {
    let fechaObj = new Date();
    let dia = fechaObj.getDay();
    let mes = fechaObj.getMonth() + 1;
    let anio = fechaObj.getFullYear();
    let hora = fechaObj.getHours();
    let minutos = fechaObj.getMinutes();
    return `${anio}-${getMinor(mes)}-${getMinor(dia)}T${getMinor(hora)}:${getMinor(minutos)}`;
}


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

};
export default function MakeOrder() {

    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const [image, setImage] = useState(null);
    const { customer } = useCustomer();
    const { addOrder, calculateOrderCost, listProductsOrder } = useOrders();
    const [cost, setCost] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        console.log("si cambio la lista");
        if (!isUndefinedOrNull(ref.current)) {
            ref.current.values.cost = calculateOrderCost(listProductsOrder);
        }
        setCost(calculateOrderCost(listProductsOrder));
    }, [cost, listProductsOrder]);


    const updateCost = () => {
        setCost(calculateOrderCost(listProductsOrder))
    }
    return <>

        <Box p='4' display="flex" justifyContent={'center'}>
            <Heading size='2xl' color='white'>Hacer Pedido</Heading>
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
                    specialOrder: false,
                    dateHour: getDate(),
                    cost: calculateOrderCost(listProductsOrder),
                    sendOrder: false
                }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Requerido'),
                    address: Yup.string()
                        .required('Requerido'),
                    phoneNumber1: Yup.number()
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
                    console.log(getDate());
                    if (listProductsOrder.length > 0) {
                        if (window.confirm("¿Estás seguro de que quieres hacer este pedido?")) {
                            addOrder(values, actions);
                        }
                        else {
                            actions.setSubmitting(false)
                        }
                    }
                    else {
                        window.alert("La lista de productos, debe tener al menos, un articulo.");
                        actions.setSubmitting(false);
                    }
                }}
            >
                {(props) => (
                    <Container bg='blackAlpha.800' p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='70%' boxShadow='dark-lg'>
                        <Form>
                            <HStack spacing='28'>
                                <SimpleGrid columns={[1, 2, 3]} spacing='40px' alignItems='center' w="100%">
                                    <Field name='name'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Nombre Cliente</FormLabel>
                                                <Input isReadOnly={true} {...field} />
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
                                                <Input  {...field} type='number' />
                                                <FormErrorMessage>{form.errors.phoneNumber1}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='phoneNumber2'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.phoneNumber2 && form.touched.phoneNumber2}>
                                                <FormLabel>Numero 2</FormLabel>
                                                <Input  {...field} type='number' />
                                                <FormErrorMessage>{form.errors.phoneNumber2}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='customerNote'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.customerNote && form.touched.customerNote}>
                                                <FormLabel>Nota Cliente</FormLabel>
                                                <Textarea  {...field} />
                                                <FormErrorMessage>{form.errors.customerNote}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <HStack minW='13.2rem'>
                                        <Field name="dateHour">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.dateHour && form.touched.dateHour}>
                                                    <FormLabel>Fecha y hora del pedido</FormLabel>
                                                    <Input type="datetime-local" {...field} />
                                                    <FormErrorMessage>{form.errors.dateHour}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </HStack>
                                    <Field name="cost">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.cost && form.touched.cost}>
                                                <FormLabel>Precio Total:</FormLabel>
                                                <Input isReadOnly={true} value={cost} type='number' />
                                                <FormErrorMessage>{form.errors.cost}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="sendOrder">
                                        {({ field }) => (
                                            <FormControl>
                                                <FormLabel>Enviar pedido</FormLabel>
                                                <Checkbox {...field} size="lg" colorScheme="green">
                                                </Checkbox>
                                            </FormControl>
                                        )}
                                    </Field>
                                </SimpleGrid>
                            </HStack>
                            <Box p='5'>
                                <Heading size='md'>Lista de articulos:</Heading>
                            </Box>

                            <ShoppingCartMekeOrder idCurtomer={customer._id} updateCost={updateCost} />

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