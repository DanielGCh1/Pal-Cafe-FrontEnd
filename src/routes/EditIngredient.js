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
import useIngredient from '../context/Ingredient/UseIngredient';
import { useParams } from 'react-router-dom';
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


export default function EditIngredient() {
    const { ingredient, getIngredient, getIngredientImageUrl, editIngredient, ingredientUrl, setIngredientUrl } = useIngredient();
    const params = useParams();
    const ref = useRef(null);
    let searchImage = true; // me indica si debo buscar la imagen

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        //nuevo
        ref.current.values.newImage = file;

        reader.onloadend = () => {
            setIngredientUrl(reader.result);
            ref.current.values.imageUrlLocal = reader.result;
        };
        reader.readAsDataURL(file);
        //fin nuevo
    };
    const handleImageDelete = () => {
        setIngredientUrl(null);
        //nuevo
        ref.current.values.newImage = null;
        ref.current.values.imageUrlLocal = null;
        //nuevo
    };
    function validateImage() {
        let value = ref.current.values.newImage;
        if (isUndefinedOrNull(ingredientUrl) || !isUndefinedOrNull(value)) {
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
    }
    useEffect(() => {
        if (!isUndefinedOrNull(params.id) && isUndefinedOrNull(ingredient)) {
            getIngredient(params.id);
            getIngredientImageUrl(params.id);
        }
        if (!isUndefinedOrNull(params.id) && searchImage && !isUndefinedOrNull(ref.current) && !isUndefinedOrNull(ingredientUrl)) {
            searchImage = false;
            ref.current.values.imageUrlLocal = ingredientUrl;
        }
    }, [ingredientUrl]);
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
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Ingrediente</Heading>
            </Box>
            {(!isUndefinedOrNull(ingredient)) ?
                <Formik
                    innerRef={ref}
                    /*initialValues= son los datos iniciales, y los que se van modificando
                    mientras se usa el formulario*/
                    initialValues={{
                        _id: ingredient._id,
                        name: ingredient.ing_nombre,
                        description: ingredient.ing_descripcion,
                        price: ingredient.ing_precio,
                        drive_type: ingredient.ing_tipo_unidad,
                        amount: ingredient.ing_cantidad,
                        newImage: null,
                        imageUrlLocal: null,
                        image: ingredient.ing_imagenUrl,
                        stock: ingredient.ing_existencias
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
                    onSubmit={(values, actions) => {
                        if (window.confirm("¿Está seguro que desea editar el ingrediente?")) {
                            editIngredient(values, actions);
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
                                            <Field name="imageUrlLocal" validate={validateImage} h='calc(100vh)'>
                                                {({ field, form }) => (
                                                    <FormControl maxW='100%' isInvalid={form.errors.imageUrlLocal && form.touched.imageUrlLocal}
                                                        display="flex" justifyContent='center' alignItems='center' flexDirection='column'>
                                                        <FormLabel htmlFor="foto">Foto</FormLabel>
                                                        {ingredientUrl ? (
                                                            <Box mt={4} pos="relative">
                                                                <Image src={ingredientUrl}
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
                                                    <FormErrorMessage fontWeight="bold">{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        {/* name, apunta al valor de los initialValues, en este caso apunta a "price" */}
                                        <Field name='price'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.price && form.touched.price}>
                                                    <FormLabel>Precio</FormLabel>
                                                    <Input {...field} type='number' /> {/*el {...field} = es donde esta el valor a donde 
                                        esta apuntando el name, en este caso seria 'price' de los initialValues*/}
                                                    <FormErrorMessage fontWeight="bold">{form.errors.price}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='drive_type'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.drive_type && form.touched.drive_type}>
                                                    <FormLabel htmlFor="tipo_unidad">Tipo de unidad</FormLabel>
                                                    <Select id="drive_type" {...field} className="selectStyle">
                                                        <Box as="option" value="Gramos" className="optionStyle" >
                                                            Gramos
                                                        </Box>
                                                        <Box as="option" value="Mililitros" className="optionStyle">
                                                            Mililitros
                                                        </Box>
                                                        <Box as="option" value="Pendiente" className="optionStyle">
                                                            Pendiente
                                                        </Box>
                                                        <Box as="option" value="Unidades" className="optionStyle" >
                                                            Unidades
                                                        </Box>
                                                    </Select>
                                                    <FormErrorMessage fontWeight="bold">{form.errors.drive_type}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='amount'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.amount && form.touched.amount}>
                                                    <FormLabel>Cantidad</FormLabel>
                                                    <Input {...field} type='number' />
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
                                            Editar Ingrediente
                                        </Button>
                                    </SimpleGrid>
                                </HStack>
                            </Form>
                        </Container>
                    )}
                </Formik>
                : null
            }
        </VStack>

    </>
}