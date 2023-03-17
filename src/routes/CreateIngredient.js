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


export default function CreateIngredient() {
    const { ingredient, addIngredient, getIngredient, setIngredient, editIngredient } = useIngredient();
    const params = useParams();
    const [createOrEdit, setCreateOrEdit] = useState("Crear Ingrediente");

    const [imagePreviewUrl, setImagePreviewUrl] = useState();/*esta es la url de la image, para el image */
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
    return <>
        <VStack bg="rgba(0,0,0,.4)" h='100vh'>
            <Box p='4' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>{createOrEdit}</Heading>
            </Box>
            <Formik
                innerRef={ref}
                /*initialValues= son los datos iniciales, y los que se van modificando
                mientras se usa el formulario*/
                initialValues={{
                    name: '',
                    description: '',
                    price: 0,
                    drive_type: 'Gramos',
                    amount: 0,

                    /*
                    image: ingredient.ing_imagen,
                    */
                    image: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
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
                    addIngredient(values, actions);
                }}
            >
                {(props) => (
                    <Form>
                        <SimpleGrid columns={[1, 2, 3]} spacing='5%' alignItems='center' color='white'>
                            <GridItem rowSpan={2}>
                                {/* Este fiel, es el de imagen, aqui es donde se busca la imagen*/}
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
                                {createOrEdit}
                            </Button>
                        </SimpleGrid>
                    </Form>

                )}
            </Formik>
        </VStack>

    </>
}