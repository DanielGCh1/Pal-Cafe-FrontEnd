import { Container, HStack, Image, VStack, Icon } from "@chakra-ui/react";
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input, Textarea, Select,
    Stack, StackDivider, SimpleGrid, GridItem, Heading
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRef } from "react";
import Axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useOrders from '../context/Orders/UseOrders';
import ProductListOrder from '../componets/productListOrder';

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

const getDate = (date) => {
    let fechaObj = new Date(date);
    let dia = fechaObj.getDay();
    let mes = fechaObj.getMonth();
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

export default function EditOrder() {
    const { order, getOrder, editOrder } = useOrders();
    const params = useParams();
    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */

    useEffect(() => {
        if (!isUndefinedOrNull(params.id) && isUndefinedOrNull(order)) {
            console.log("Si encontro el id de la orden");
            getOrder(params.id);
        }
    }, []);
    return <>
        <VStack bg="rgba(0,0,0,.4)" h='100vh' overflowY="scroll" maxHeight="37rem" sx={{
            "&::-webkit-scrollbar": {
                width: "7px",
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                bg: "gray.400",
                borderRadius: "full",
                opacity: "0.4",
                "&:hover": {
                    opacity: "0.7",
                },
            },
        }}>
            <Box p='4' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Orden</Heading>
            </Box>
            {(order != null) ?
                <Formik
                    innerRef={ref}
                    initialValues={{
                        _id: order._id,
                        name: order.name_customer,
                        address: order.address,
                        phoneNumber1: order.phoneNumber1,
                        phoneNumber2: order.phoneNumber2,
                        cost: order.cost,
                        customerNote: order.customerNote,
                        customer_id: order.customer_id,
                        listProductsOrder: order.listProductsOrder,
                        state: order.state,
                        dateHour: getDate(order.dateHour),
                        reasonRejection: order.reasonRejection
                    }}

                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Requerido'),
                        address: Yup.string()
                            .required('Requerido'),
                        phoneNumber1: Yup.number()
                            .required('Requerido'),
                        cost: Yup.number()
                            .required('Requerido'),
                        dateHour: Yup.date().required('Este campo es obligatorio'),
                    })}

                    onSubmit={(values, actions) => {
                        console.log(values);
                        editOrder(values, actions);
                    }}
                >
                    {(props) => (
                        <Container bg='blackAlpha.800' p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='80%' boxShadow='dark-lg'>
                            <Form>
                                <HStack spacing='28'>
                                    <SimpleGrid columns={[1, 2, 3]} spacing='30px' alignItems='center'>
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
                                        <Field name='cost'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.cost && form.touched.cost}>
                                                    <FormLabel>Precio Total:</FormLabel>
                                                    <Input isReadOnly={true} {...field} type='number' />
                                                    <FormErrorMessage>{form.errors.cost}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </SimpleGrid>
                                </HStack>
                                <Box p='5'>
                                    <Heading size='md'>Lista de articulos:</Heading>
                                </Box>

                                <ProductListOrder listProductsOrder={order.listProductsOrder} />
                                <Button
                                    mt={4}
                                    colorScheme='red'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                    marginTop='10'
                                >
                                    Guardar Cambios
                                </Button>
                            </Form>

                        </Container>
                    )}
                </Formik>
                : null
            }
        </VStack>

    </>
}