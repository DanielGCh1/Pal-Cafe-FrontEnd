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
import useProduct from '../context/Product/ProductContext';
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


export default function EditProduct() {
    const { product, addProduct, getProduct, setProduct, editProduct } = useProduct();
    const params = useParams();
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
    function validateImage(value) { /*Valida si el archivo que se subió, es de tipo imagen*/
        /*let error
        if (isNull(value)) {
            return error = 'La imagen del ingrediente es requerida'
        }
        if (!value.type.includes("image/")) { tengo que limitar por jpg y png
            return error = "Ingrese una imagen válida"
        }
        return error*/
    }
    useEffect(() => {
        if (!isUndefinedOrNull(params.id) && isUndefinedOrNull(product)) {
            console.log("Si encontró el id del producto");
            getProduct(params.id);
        }
    }, []);
    return <>
        <VStack bg="rgba(0,0,0,.4)" h='100vh'>
            <Box p='4' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Producto</Heading>
            </Box>
            {(product != null) ?
                <Formik
                    innerRef={ref}
                    /*initialValues= son los datos iniciales, y los que se van modificando
                    mientras se usa el formulario*/
                    initialValues={{
                        _id: product._id,
                        nombre: product.pro_nombre,
                        descripcion: product.pro_descripcion,
                        precio: product.pro_precio,
                        tipo_unidad: product.pro_tipo_unidad,
                        cantidad: product.pro_cantidad,

                        /*
                        image: ingredient.ing_imagen,
                        */
                        image: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
                        existencias: product.pro_existencias,
                    }}

                    validationSchema={Yup.object({
                        nombre: Yup.string()
                            .required('El producto requiere un nombre'),
                        descripcion: Yup.string()
                            .required('El producto requiere una descripción'),
                        precio: Yup.number()
                            .required('El producto requiere un precio'),
                        tipo_unidad: Yup.string()
                            .required('Requerido'),
                        cantidad: Yup.number()
                            .required('El producto requiere una cantidad'),
                        existencias: Yup.number()
                            .required('Se requiere saber las existencias del producto, aunque sean negativas')
                    })}
                    /*el onSubmit, solo se activa cuando el formulario no tiene errores*/
                    onSubmit={(values, actions) => {
                        editProduct(values, actions);
                    }}
                >
                    {(props) => (
                        <Form>
                            <SimpleGrid columns={[1, 2, 3]} spacing='5%' alignItems='center' color='white'>
                                <GridItem rowSpan={2}>
                                    {/* Este fiel, es el de imagen, aquí es donde se busca la imagen*/}
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
                                <Field name='nombre'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.nombre && form.touched.nombre}>
                                            <FormLabel>Nombre</FormLabel>
                                            <Input {...field} />
                                            <FormErrorMessage fontWeight="bold">{form.errors.nombre}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                {/* name, apunta al valor de los initialValues, en este caso apunta a "precio" */}
                                <Field name='precio'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.precio && form.touched.precio}>
                                            <FormLabel>Precio</FormLabel>
                                            <Input {...field} type='number' /> {/*el {...field} = es donde esta el valor a donde 
                                        esta apuntando el name, en este caso seria 'precio' de los initialValues*/}
                                            <FormErrorMessage fontWeight="bold">{form.errors.precio}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='tipo_unidad'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.tipo_unidad && form.touched.tipo_unidad}>
                                            <FormLabel>Precio</FormLabel>
                                            <Input {...field} type='number' />
                                            <FormErrorMessage fontWeight="bold">{form.errors.tipo_unidad}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='cantidad'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.cantidad && form.touched.cantidad}>
                                            <FormLabel>Cantidad</FormLabel>
                                            <Input {...field} type='number' />
                                            <FormErrorMessage fontWeight="bold">{form.errors.cantidad}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='descripcion'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.descripcion && form.touched.descripcion}>
                                            <FormLabel>Descripción</FormLabel>
                                            <Input {...field} />
                                            <FormErrorMessage fontWeight="bold">{form.errors.descripcion}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='existencias'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.existencias && form.touched.existencias}>
                                            <FormLabel>Existencias</FormLabel>
                                            <Input {...field} type='number' />
                                            <FormErrorMessage fontWeight="bold">{form.errors.existencias}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    colorScheme='red'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Editar Producto
                                </Button>
                            </SimpleGrid>
                        </Form>

                    )}
                </Formik>
                : null
            }
        </VStack>

    </>
}