import { Container, HStack, Image, VStack, Icon } from "@chakra-ui/react";
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input,
    SimpleGrid, GridItem, Heading, Select
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import useIngredient from '../context/Ingredient/UseIngredient';
import { useEffect } from 'react';

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


export default function CreateIngredient() {
    const { addIngredient } = useIngredient();
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const ref = useRef(null);

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        console.log(file);
        ref.current.values.image = file;
        validateImage(ref.current.values.image);
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleImageDelete = () => { /*Se activa cuando se elimina la imagen*/
        setImagePreviewUrl(null);
        ref.current.values.image = null;
    };
    function validateImage(value) { /*Valida si el archivo que se subio, es de tipo imagen*/
        let error
        if (isNull(value)) {
            return error = 'La imagen del ingrediente es requerida'
        }
        if (value.type === "image/png" || value.type === "image/jpg" || value.type === "image/jpeg") {
            if (value.size > 1500000) {
                return error = "La imagen no puede pesar mas de 1500000";
            }
        }
        else {
            return error = "Ingrese una imagen válida, solo se admite los formatos: png y jpg."
        }
        return error
    }
    useEffect(() => {
        console.log(imagePreviewUrl);
    }, [imagePreviewUrl]);
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
                <Heading color="white" fontWeight="bold" size='2xl'>Crear Ingrediente</Heading>
            </Box>
            <Box>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,
                        drive_type: 'Gramos',
                        amount: 0,
                        image: null,
                        /*
                        image: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
                        */
                        stock: 0,
                    }}

                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('El ingrediente requiere un nombre'),
                        description: Yup.string()
                            .required('El ingrediente requiere una descripción'),
                        price: Yup.number()
                            .required('El ingrediente requiere un precio'),
                        drive_type: Yup.string()
                            .required('Requerido'),
                        amount: Yup.number()
                            .required('El ingrediente requiere una cantidad'),
                        stock: Yup.number()
                            .required('Se requiere saber las existencias del producto, aunque sean negativas')
                    })}
                    /*el onSubmit, solo se activa cuando, el formulario no tiene errores*/
                    onSubmit={(values, actions) => {
                        if (window.confirm("¿Está seguro que desea registrar el nuevo ingrediente?")) {
                            addIngredient(values, actions);
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
                                                    <FormErrorMessage fontWeight="bold">{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        {/* name, apunta al valor de los initialValues, en este caso apunta a "price" */}
                                        <Field name='price'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.price && form.touched.price}>
                                                    <FormLabel>Precio</FormLabel>
                                                    <Input {...field} min={1} type='number' /> {/*el {...field} = es donde esta el valor a donde 
                                        esta apuntando el name, en este caso seria 'price' de los initialValues*/}
                                                    <FormErrorMessage fontWeight="bold">{form.errors.price}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='drive_type'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.drive_type && form.touched.drive_type}>
                                                    <FormLabel htmlFor="tipo_unidad">Tipo de unidad</FormLabel>
                                                    <Select id="drive_type" {...field} color='black'>
                                                        <option value="Gramos">Gramos</option>
                                                        <option value="Mililitros">Mililitros</option>
                                                        <option value="Unidades">Unidades</option>
                                                    </Select>
                                                    <FormErrorMessage fontWeight="bold">{form.errors.drive_type}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='amount'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.amount && form.touched.amount}>
                                                    <FormLabel>Cantidad</FormLabel>
                                                    <Input {...field} min={1} type='number' />
                                                    <FormErrorMessage fontWeight="bold">{form.errors.amount}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='description'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.description && form.touched.description}>
                                                    <FormLabel>Descripción</FormLabel>
                                                    <Input {...field} />
                                                    <FormErrorMessage fontWeight="bold">{form.errors.description}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='stock'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.stock && form.touched.stock}>
                                                    <FormLabel>Existencias</FormLabel>
                                                    <Input {...field} type='number' />
                                                    <FormErrorMessage fontWeight="bold">{form.errors.stock}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button
                                            mt={4}
                                            colorScheme='red'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Crear Ingrediente
                                        </Button>
                                    </SimpleGrid>
                                </HStack>
                            </Form>
                        </Container>
                    )}
                </Formik>
            </Box>
        </VStack>

    </>
}