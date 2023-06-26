import { Container, Box, Heading, Image, GridItem, Textarea, Checkbox, Icon } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage, Button, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCustomer from '../context/Customer/UseCustomer';
import { useRef } from "react";
import useOrders from '../context/Orders/UseOrders';
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from 'react';

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
export default function MakeOrderSpecial() {

    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const [image, setImage] = useState(null);
    const { customer } = useCustomer();
    const { addOrder, calculateOrderCost, listProductsOrder } = useOrders();

    const ref = useRef(null);

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        ref.current.values.image = file;
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleImageDelete = () => {
        setImagePreviewUrl(null);
        ref.current.values.image = null;
    };
    function validateImage(value) {
        let error
        if (!isUndefinedOrNull(value)) {
            if (value.type === "image/png" || value.type === "image/jpg" || value.type === "image/jpeg") {
                if (value.size > 1500000) {
                    return error = "La imagen no puede pesar mas de 1500000";
                }
            }
            else {
                return error = "Ingrese una imagen válida, solo se admite los formatos: png y jpg."
            }
        }
        return error
    }


    return <>

        <Box p='4' display="flex" justifyContent={'center'}>
            <Heading size='2xl'>Hacer Pedido Especial</Heading>
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
                    specialOrder: true,
                    dateHour: getDate(),
                    sendOrder: false,
                    image: null,
                }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Requerido'),
                    address: Yup.string()
                        .required('Requerido'),
                    phoneNumber1: Yup.number()
                        .required('Requerido'),
                    dateHour: Yup.date().required('Este campo es obligatorio')

                })}

                onSubmit={(values, actions) => {
                    console.log(values);
                    console.log(getDate());
                    if (window.confirm("¿Estás seguro de que quieres hacer este pedido especial?")) {
                        addOrder(values, actions);
                    }
                    else {
                        actions.setSubmitting(false)
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

                            <Box p='4' display="flex" justifyContent={'center'}>
                                <Heading size='md'>Imagenes del pedido</Heading>
                            </Box>

                            <GridItem rowSpan={2}>
                                {/* Este fiel, es el de imagen, aqui es donde se busca la imagen*/}
                                <Field name="image" validate={validateImage} >
                                    {({ field, form }) => (
                                        <FormControl maxW='100%' isInvalid={form.errors.image && form.touched.image}
                                            display="flex" justifyContent='center' alignItems='center' flexDirection='column'>
                                            <FormLabel htmlFor="foto">Foto</FormLabel>
                                            {imagePreviewUrl ? (
                                                <Box mt={4} pos="relative">
                                                    <Image src={imagePreviewUrl}
                                                        width='200px'
                                                        height='200px'
                                                        alt="Imagen seleccionada" />
                                                    <Button
                                                        pos="absolute"
                                                        top="0"
                                                        right="0"
                                                        colorScheme="red"
                                                        onClick={handleImageDelete}
                                                    >
                                                        <Icon as={FaTimes} />
                                                    </Button>
                                                </Box>
                                            ) : null}

                                            <Button
                                                colorScheme="green"
                                                size="sm"
                                                borderRadius="md"
                                                onClick={() => document.getElementById('image').click()}
                                            >
                                                Buscar
                                            </Button>
                                            <Input
                                                style={{ display: 'none' }}
                                                placeholder='Debe incluir una imagen'
                                                id="image"
                                                type="file"
                                                accept=".jpg, .png, .jpeg"
                                                onChange={handleImageChange}
                                            />
                                            <FormErrorMessage fontWeight="bold">{form.errors.image}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>

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