import { Container, Box, Heading, Image, GridItem, Textarea, Checkbox, Icon } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import { HStack, VStack, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, Button, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FaTimes } from "react-icons/fa";
import useClientes from '../context/Cliente/UseClientes';
import { useEffect } from 'react';
import { useRef } from "react";

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

export default function RegistrarCliente() {
    const [imagePreviewUrl, setImagePreviewUrl] = useState();

    const ref = useRef(null);
    const { addClient } = useClientes();

    useEffect(() => {

    }, []);

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
                <Heading color="white" fontWeight="bold" size='2xl'>Registrar Cuenta</Heading>
            </Box>
            <Formik
                innerRef={ref}
                initialValues={{
                    image: null,
                    name: "",
                    user: "",
                    surname: "",
                    secondSurname: "",
                    firstNumber: "",
                    secondNumber: "",
                    address: "",
                    email: "",
                    state: "Pendiente",//TODO: Agregar en el bk
                    password: "",
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
                    password: Yup.string()
                        .required('Requerido'),
                    /*
                foto: Yup.mixed().required("Debes subir una imagen").test(
                    "es-imagen",
                    "Debes subir un archivo de tipo imagen",
                    (value) => value && value.type.includes("image")),
                */
                })}

                onSubmit={async (values, actions) => {
                    if (window.confirm("¿Está seguro que desea registrar esta cuenta?")) {
                        addClient(values, actions);
                    }
                    else {
                        actions.setSubmitting(false);
                    }
                }}

            >
                {(props) => (
                    <Container bgColor="rgba(0,0,0,.3)" p='20px' color='white' borderRadius='10px' alignSelf='center' alignItems='center' gap='2' maxW='80%' boxShadow='dark-lg'>
                        <Form>
                            <HStack spacing='28'>
                                <SimpleGrid columns={[1, 2, 3]} spacing='30px' alignItems='center' w="100%">
                                    <GridItem rowSpan={2}>
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
                                            <FormControl isInvalid={form.errors.address && form.touched.address}>
                                                <FormLabel>Estado</FormLabel>
                                                <Input isReadOnly={false} {...field} />
                                                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
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
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
                                    Registrar Cuenta
                                </Button>
                            </VStack>
                        </Form>

                    </Container>
                )}
            </Formik>

        </VStack >
    </>
}
