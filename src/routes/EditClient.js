import React from 'react';
import { useParams } from 'react-router-dom';
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input, SimpleGrid, GridItem,
    Image, VStack, Icon, Select, Container, HStack, Text
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import UseClientes from '../context/Cliente/UseClientes';
import { Link, useNavigate } from "react-router-dom";

const EditClient = () => {
    const { id } = useParams();
    const { getCliente, editClient } = UseClientes();
    const navigate = useNavigate();
    const customer = getCliente(id);
    const [imagePreviewUrl, setImagePreviewUrl] = useState();/*esta es la url de la image, para el image */
    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */
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
    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        // ref.current.values.image = file;
        validateImage(ref.current.values.image);
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = () => {

        setImagePreviewUrl(null);
        // ref.current.values.image = null;
    };

    function validateImage(value) {
        // let error
        // if (isNull(value)) {
        //   return error = 'La imagen del producto es requerida'
        // }
        // if (!value.type.includes("image")) {
        //   return error = "Ingrese una imagen válida"
        // }
        // return error
    }

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                name: customer.usu_nombre,
                user: customer.usu_usuario,
                surname: customer.usu_primer_apellido,
                secondSurname: customer.usu_segundo_apellido,
                firstNumber: customer.usu_numero_telefono1,
                secondNumber: customer.usu_numero_telefono2,
                address: customer.usu_direccion,
                state: customer.usu_estado,
                email: customer.usu_correo,
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

            onSubmit={async (values, actions) => {
                values._id = id;
                try {
                    const response = await editClient(values, actions);
                    setMessaje(response);
                    // navigate('/Home/BuscarClientes')
                } catch (error) {
                    console.error(error);
                    setMessaje("Ha ocurrido un error al editar el cliente.");
                }
                actions.setSubmitting(false);
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
    );
};

export default EditClient;