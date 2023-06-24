import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, Box, Heading, Image, GridItem, Icon } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import ProductosVentaPaginaPrincipal from '../componets/productosVentaPaginaPrincipal'
import { FaTimes } from "react-icons/fa";
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
import useOrders from '../context/Orders/UseOrders';
import { useRef } from "react";
import TableOrdersCustomer from '../componets/TableOrdersCustomer';

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
export default function PerfilUsuario() {

    const { customer, getDate, editCustomer } = useCustomer();
    const { getOrdersCustomer, ordersCustomer, setOrdersCustomer, getListProductsOrder } = useOrders();
    const [imagePreviewUrl, setImagePreviewUrl] = useState();/*esta es la url de la image, para el image */
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */

    const handleImageChange = (event) => {/*Se activa cuando se hace un cambio en la imagen, 
    normalmente, es cuando se agrega una imagen, y convertirla a url*/
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        //ref.current.values.image = file;
        validateImage(ref.current.values.image);
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleImageDelete = () => { /*Se activa cuando se elimina la imagen*/
        setImagePreviewUrl(null);
        //ref.current.values.image = null;
    };
    function validateImage(value) { /*Valida si el archivo que se subio, es de tipo imagen*/
        /*let error
        if (isNull(value)) {
            return error = 'La imagen del ingrediente es requerida'
        }
        if (!value.type.includes("image/")) { tengo que limitar por jpg y png
            return error = "Ingrese una imagen válida"
        }
        return error*/
    }

    const seeOrder = (id) => {
        if (window.confirm("¿Estás seguro de que quieres habandonar esta pagina, para cargar la ventana de vista del pedido?")) {
            setOrdersCustomer(null);
            navigate(`/PalCafe/VerOrden/${id}`)
        }
    };

    useEffect(() => {
        if (!isUndefinedOrNull(customer) && (typeof ordersCustomer == 'undefined' || ordersCustomer.length <= 0)) {
            getOrdersCustomer(customer._id);//TODO:
        }
    }, [customer])
    return <>

        <Box p='4' display="flex" justifyContent={'center'}>
            <Heading size='2xl'>Cliente</Heading>
        </Box>
        {(customer == null) ?
            <Formik
                innerRef={ref}
                initialValues={{
                    name: customer.usu_nombre,
                    user: customer.usu_usuario,
                    surname: customer.usu_primer_apellido,
                    secondSurname: customer.usu_segundo_apellido,
                    registrationDate: getDate(customer.usu_fecha_registro),
                    firstNumber: customer.usu_numero_telefono1,
                    secondNumber: customer.usu_numero_telefono2,
                    address: customer.usu_direccion,
                    state: customer.usu_estado,
                    email: customer.usu_correo,
                    password: '',
                    newPassword: '',
                    image: customer.usu_foto
                }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Requerido'),
                    user: Yup.string()
                        .required('Requerido'),
                    surname: Yup.string()
                        .required('Requerido'),
                    secondSurname: Yup.string()
                        .required('Requerido'),
                    firstNumber: Yup.number()
                        .required('Requerido'),
                    address: Yup.string()
                        .required('Requerido'),
                    email: Yup.string()
                        .required('Requerido'),
                    /*
                foto: Yup.mixed().required("Debes subir una imagen").test(
                    "es-imagen",
                    "Debes subir un archivo de tipo imagen",
                    (value) => value && value.type.includes("image")),
                */
                })}

                onSubmit={(values, actions) => {
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }, 1000)*/
                    editCustomer(values, actions);
                }}
            >
                {(props) => (
                    <Container bg='blackAlpha.800' p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='70%' boxShadow='dark-lg'>
                        <Form>
                            <HStack spacing='28'>
                                <SimpleGrid columns={[1, 2, 3]} spacing='40px' alignItems='center'>
                                    <GridItem rowSpan={2}>
                                        <Field name="image" validate={validateImage} h='calc(100vh)'>
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
                                                        accept=".jpg, .png"
                                                        onChange={handleImageChange}
                                                    />
                                                    <FormErrorMessage fontWeight="bold">{form.errors.image}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                    </GridItem>

                                    <Field name='name'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Nombre</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='user'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user && form.touched.user}>
                                                <FormLabel>Usuario</FormLabel>
                                                <Input isReadOnly={true} {...field} />
                                                <FormErrorMessage>{form.errors.user}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='surname'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.surname && form.touched.surname}>
                                                <FormLabel>Primer apellido</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='secondSurname'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.secondSurname && form.touched.secondSurname}>
                                                <FormLabel>Segundo apellido</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.secondSurname}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='firstNumber'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.firstNumber && form.touched.firstNumber}>
                                                <FormLabel>Numero de teléfono 1</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage>{form.errors.firstNumber}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='secondNumber'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.secondNumber && form.touched.secondNumber}>
                                                <FormLabel>Numero de teléfono 2</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage>{form.errors.secondNumber}</FormErrorMessage>
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
                                    <Field name='state'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.state && form.touched.state}>
                                                <FormLabel>Estado Cliente</FormLabel>
                                                <Input isReadOnly={true} {...field} />
                                                <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='email'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel>Correo electrónico</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <HStack minW='13.2rem'>
                                        <Field name="dateHour">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.dateHour && form.touched.dateHour}>
                                                    <FormLabel>Fecha y hora de registro</FormLabel>
                                                    <Input isReadOnly={true} type="datetime-local" {...field} />
                                                    <FormErrorMessage>{form.errors.dateHour}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </HStack>
                                </SimpleGrid>
                            </HStack>
                            <Box p='5'>
                                <Heading size='md'>Pedidos:</Heading>
                            </Box>

                            <VStack alignItems='center' h='100vh' maxHeight="15rem">
                                <VStack maxWidth="100rem" margin="0 auto" display="flex" flexDirection='column' h='100vh' maxHeight="15rem">
                                    <TableOrdersCustomer data={ordersCustomer} seeOrder={seeOrder} getListProductsOrder={getListProductsOrder} />
                                </VStack>
                            </VStack>

                            <Flex
                                h='100px'
                                direction={{ base: 'column', md: 'row' }}
                                alignItems='center'
                            >
                                <Button
                                    mt={4}
                                    colorScheme='red'
                                    onClick={() => {navigate('/PalCafe/HacerPedidoEspecial')}}
                                    type='submit'
                                    marginTop='10'
                                >
                                    Hacer pedido especial
                                </Button>
                                <Spacer />
                                <Button
                                    mt={4}
                                    colorScheme='red'
                                    onClick={() => {navigate('/PalCafe/CambiarContraseña')}}
                                    type='submit'
                                    marginTop='10'
                                >
                                    Cambiar contraseña
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
            : null
        }
    </>
}