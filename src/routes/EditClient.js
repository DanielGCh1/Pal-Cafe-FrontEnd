import React from 'react';
import { useParams } from 'react-router-dom';
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input, SimpleGrid, GridItem,
    Image, VStack, Icon, Select, Container, HStack, Text, Heading
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import UseClientes from '../context/Cliente/UseClientes';
import { Link, useNavigate } from "react-router-dom";

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

const EditClient = () => {
    const { id } = useParams();
    const { getCliente, editClient, imageUrl, getImageUrl, setImageUrl, customerEditAdm, getCustomerId } = UseClientes();
    const ref = useRef(null); 
    const getDate = (fechaISO) => {
        let fechaObj = new Date(fechaISO);
        let dia = fechaObj.getDate();
        let mes = fechaObj.getMonth() + 1;
        let anio = fechaObj.getFullYear();
        let hora = fechaObj.getHours();
        let minutos = fechaObj.getMinutes();
        let segundos = fechaObj.getSeconds();
        return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    }
    const [messaje, setMessaje] = useState("")
    let searchImage = true; // me indica si debo buscar la imagen

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        //nuevo
        ref.current.values.newImage = file;

        reader.onloadend = () => {
            setImageUrl(reader.result);
            ref.current.values.imageUrlLocal = reader.result;
        };
        reader.readAsDataURL(file);
        //fin nuevo
    };
    const handleImageDelete = () => {
        setImageUrl(null);
        //nuevo
        ref.current.values.newImage = null;
        ref.current.values.imageUrlLocal = null;
        //nuevo
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

    useEffect(() => {
        if (!isUndefinedOrNull(id) && isUndefinedOrNull(customerEditAdm)) {
            getCustomerId(id);
            getImageUrl(id);
        }
        if (!isUndefinedOrNull(id) && searchImage && !isUndefinedOrNull(ref.current) && !isUndefinedOrNull(imageUrl)) {
            searchImage = false;
            ref.current.values.imageUrlLocal = imageUrl;
        }
    }, [imageUrl, customerEditAdm]);

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
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Cliente</Heading>
            </Box>
            {
                (!isUndefinedOrNull(customerEditAdm)) ?
                    <Formik
                        innerRef={ref}
                        initialValues={{
                            image: customerEditAdm.usu_foto_url,
                            name: customerEditAdm.usu_nombre,
                            user: customerEditAdm.usu_usuario,
                            surname: customerEditAdm.usu_primer_apellido,
                            secondSurname: customerEditAdm.usu_segundo_apellido,
                            firstNumber: customerEditAdm.usu_numero_telefono1,
                            secondNumber: customerEditAdm.usu_numero_telefono2,
                            address: customerEditAdm.usu_direccion,
                            email: customerEditAdm.usu_correo,
                            state: customerEditAdm.usu_estado,
                            newImage: null,
                            imageUrlLocal: null,
                            password: customerEditAdm.usu_contraseña,
                            newPassword: '',
                            roles: []
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

                        onSubmit={async (values, actions) => {
                            if (window.confirm("¿Está seguro que desea editar el cliente?")) {
                                values._id = id;
                                try {
                                    const response = await editClient(values, actions);
                                    setMessaje(response);
                                    // navigate('/Home/BuscarClientes')
                                } catch (error) {
                                    console.error(error);
                                    setMessaje("Ha ocurrido un error al editar el cliente.");
                                }
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
                                            <GridItem rowSpan={2}>
                                                <Field name="newImage" validate={validateImage} h='calc(100vh)'>
                                                    {({ field, form }) => (
                                                        <FormControl maxW='100%' isInvalid={form.errors.imageUrlLocal && form.touched.imageUrlLocal}
                                                            display="flex" justifyContent='center' alignItems='center' flexDirection='column'>
                                                            <FormLabel htmlFor="foto">Foto</FormLabel>
                                                            {imageUrl ? (
                                                                <Box mt={4} pos="relative">
                                                                    <Image src={imageUrl}
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
                                                            <FormErrorMessage fontWeight="bold">{form.errors.imageUrlLocal}</FormErrorMessage>
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
                                                        <Input {...field} />
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
                                                    <FormControl>
                                                        <FormLabel>Estado</FormLabel>
                                                        <Select {...field} className="selectStyle">
                                                            <Box as="option" value="Aceptado" className="optionStyle">
                                                                Aceptado
                                                            </Box>
                                                            <Box as="option" value="Rechazado" className="optionStyle">
                                                                Rechazado
                                                            </Box>
                                                            <Box as="option" value="Pendiente" className="optionStyle">
                                                                Pendiente
                                                            </Box>
                                                            <Box as="option" value="De baja" className="optionStyle">
                                                                De baja
                                                            </Box>
                                                        </Select>
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
                                            <Field name='password'>
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                        <FormLabel>Contraseña</FormLabel>
                                                        <Input isReadOnly={true} {...field} />
                                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name='newPassword'>
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                                                        <FormLabel>Nueva Contraseña</FormLabel>
                                                        <Input {...field} />
                                                        <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </SimpleGrid>
                                    </HStack>

                                    <VStack width={"100%"}>
                                        <Button
                                            mt={4}
                                            colorScheme='red'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                            marginTop='10'
                                        >
                                            Guardar Cambios
                                        </Button>
                                        <Text>
                                            {messaje}
                                        </Text>
                                    </VStack>
                                </Form>

                            </Container>
                        )}
                    </Formik>
                    : null
            }
        </VStack >
    </>
};

export default EditClient;