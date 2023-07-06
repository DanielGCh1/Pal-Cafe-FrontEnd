import { Container, HStack, Image, VStack, Icon } from "@chakra-ui/react";
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input, Textarea, Select,
    Stack, StackDivider, SimpleGrid, GridItem, Heading, Checkbox
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
    const { order, getOrder, editOrder, imageUrl, getImageUrl } = useOrders();
    const params = useParams();
    const ref = useRef(null);
    let searchImage = true;

    useEffect(() => {
        if (!isUndefinedOrNull(params.id) && isUndefinedOrNull(order)) {
            getOrder(params.id);
            getImageUrl(params.id);
        }
        if (!isUndefinedOrNull(params.id) && searchImage && !isUndefinedOrNull(imageUrl)) {
            searchImage = false;
        }
    }, [imageUrl]);

    return <>
        <VStack h='100vh' overflowY="scroll" maxHeight="55rem" sx={{
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
                        customerNote: order.customerNote,
                        customer_id: order.customer_id,
                        listProductsOrder: order.listProductsOrder,
                        state: order.state,
                        cost: order.cost,
                        reasonRejection: order.reasonRejection,
                        dateHour: order.dateHour,
                        sendOrder: order.sendOrder,
                        specialOrder: order.specialOrder,
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
                        if (window.confirm("¿Está seguro que desea editar el pedido?")) {
                            editOrder(values, actions);
                        }
                        else {
                            actions.setSubmitting(false);
                        }
                    }}
                >
                    {(props) => (
                        <Container bgColor="rgba(0,0,0,.1)" p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='80%' boxShadow='dark-lg'>
                            <Form>
                                <HStack spacing='28'>
                                    <SimpleGrid columns={[1, 2, 3]} spacing='30px' alignItems='center' w="100%">
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
                                                    <Input isReadOnly={true} {...field} type='number' />
                                                    <FormErrorMessage>{form.errors.phoneNumber1}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='phoneNumber2'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.phoneNumber2 && form.touched.phoneNumber2}>
                                                    <FormLabel>Numero 2</FormLabel>
                                                    <Input isReadOnly={true} {...field} type='number' />
                                                    <FormErrorMessage>{form.errors.phoneNumber2}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='customerNote'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.customerNote && form.touched.customerNote}>
                                                    <FormLabel>Nota Cliente</FormLabel>
                                                    <Textarea isReadOnly={true} {...field} />
                                                    <FormErrorMessage>{form.errors.customerNote}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='state'>
                                            {({ field, form }) => (
                                                <FormControl>
                                                    <FormLabel>Estado</FormLabel>
                                                    <Select {...field} className="selectStyle">
                                                        <Box as="option" value="Aceptado" className="optionStyle" >
                                                            Aceptado
                                                        </Box>
                                                        <Box as="option" value="Rechazado" className="optionStyle">
                                                            Rechazado
                                                        </Box>
                                                        <Box as="option" value="Pendiente" className="optionStyle">
                                                            Pendiente
                                                        </Box>
                                                        <Box as="option" value="Fallido" className="optionStyle" >
                                                            Concluido
                                                        </Box>
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='cost'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.cost && form.touched.cost}>
                                                    <FormLabel>Precio Total:</FormLabel>
                                                    <Input isReadOnly={true} {...field} type='number' />
                                                    <FormErrorMessage>{form.errors.cost}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name='reasonRejection'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.reasonRejection && form.touched.reasonRejection}>
                                                    <FormLabel>Razon de rechazo</FormLabel>
                                                    <Textarea {...field} />
                                                    <FormErrorMessage>{form.errors.reasonRejection}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <HStack minW='13.2rem'>
                                            <Field name="dateHour">
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.dateHour && form.touched.dateHour}>
                                                        <FormLabel>Fecha y hora del pedido</FormLabel>
                                                        <Input isReadOnly={true} type="datetime-local" {...field} />
                                                        <FormErrorMessage>{form.errors.dateHour}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </HStack>
                                        <Field name="sendOrder">
                                            {({ field }) => (
                                                <FormControl>
                                                    <FormLabel>Enviar pedido</FormLabel>
                                                    <Checkbox isReadOnly={true} {...field} size="lg" colorScheme="green">
                                                    </Checkbox>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </SimpleGrid>
                                </HStack>
                                {(order.specialOrder) ?
                                    <Box>
                                        <Box p='4' display="flex" justifyContent={'center'}>
                                            <Heading size='md'>Imagen de ejemplo</Heading>
                                        </Box>
                                        {imageUrl ? (
                                            <Box mt={4} pos="relative">
                                                <Image src={imageUrl}
                                                    width='200px'
                                                    height='200px'
                                                    alt="Imagen seleccionada" />
                                            </Box>
                                        ) : null}
                                    </Box>

                                    : <Box>
                                        <Box p='5'>
                                            <Heading size='md'>Lista de articulos:</Heading>
                                        </Box>

                                        <ProductListOrder listProductsOrder={order.listProductsOrder} color='black' />
                                    </Box>
                                }
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