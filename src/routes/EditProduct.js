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
import useAdmProduct from '../context/AdministrativeProduct/AdmUseProduct';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TableComponent from "../componets/TableIngredientsEditRecipe";
import { useNavigate } from "react-router-dom";

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

    const { admProduct, getAdmProduct, editAdmProduct, setAdmProduct } = useAdmProduct();
    const params = useParams();
    const [imagePreviewUrl, setImagePreviewUrl] = useState();/*esta es la url de la image, para el image */
    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */
    const navigate = useNavigate();

    const handleEdit = () => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres habandonar esta página, para cargar la ventana de editar la receta del producto?")) {
            setAdmProduct(null);
            navigate(`/home/EditarReceta/${admProduct._id}`)
        }
    };

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
        if (!isUndefinedOrNull(params.id) && isUndefinedOrNull(admProduct)) {
            console.log("Si encontró el id del producto");
            getAdmProduct(params.id);
        }
    }, []);
    return <>
        <VStack /*bg="rgba(0,0,0,.4)"*/ h='100vh' overflowY="scroll" maxHeight="55.4rem" sx={{
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
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Producto</Heading>
            </Box>
            {(admProduct != null) ?
                <Box>
                    <Formik
                        innerRef={ref}
                        /*initialValues= son los datos iniciales, y los que se van modificando
                        mientras se usa el formulario*/
                        initialValues={{
                            _id: admProduct._id,
                            nombre: admProduct.pro_nombre,
                            valor_venta: admProduct.pro_valor_venta,
                            duracion: admProduct.pro_duracion,
                            valor_tiempo: admProduct.pro_valor_tiempo,
                            valor_unidad: admProduct.pro_valor_unidad,
                            cantidad: admProduct.pro_cantidad,
                            precio_mano_obra: admProduct.pro_precio_mano_obra,
                            descripcion: admProduct.pro_descripcion,
                            existencias: admProduct.pro_existencias,
                            valor_total_unidad: admProduct.pro_valor_total_unidad,

                            /*
                            image: ingredient.ing_imagen,
                            */
                            image: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
                        }}

                        validationSchema={Yup.object({
                            nombre: Yup.string()
                                .required('El producto requiere un nombre'),
                            valor_venta: Yup.number()
                                .required('El producto requiere un valor de venta'),
                            duracion: Yup.number()
                                .required('El producto requiere una duración'),
                            valor_tiempo: Yup.number()
                                .required('El producto requiere un valor de tiempo'),
                            valor_unidad: Yup.number()
                                .required('El producto requiere un valor de unidad'),
                            cantidad: Yup.number()
                                .required('El producto requiere una cantidad'),
                            precio_mano_obra: Yup.number()
                                .required('El producto requiere un precio de mano de obra'),
                            descripcion: Yup.string()
                                .required('El producto requiere una descripción'),
                            existencias: Yup.number()
                                .required('Se requiere saber las existencias del producto, aunque sean negativas'),
                            valor_total_unidad: Yup.number()
                                .required('El producto requiere un valor total por unidad')
                        })}
                        /*el onSubmit, solo se activa cuando el formulario no tiene errores*/
                        onSubmit={(values, actions) => {
                            editAdmProduct(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form >
                                <SimpleGrid columns={[1, 2, 3]} spacing='5%' alignItems='center' color='white'  >
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
                                    <Field name='valor_venta'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.valor_venta && form.touched.valor_venta}>
                                                <FormLabel>Valor de venta</FormLabel>
                                                <Input {...field} type='number' /> {/*el {...field} = es donde esta el valor a donde 
                                        esta apuntando el name, en este caso seria 'valor_venta' de los initialValues*/}
                                                <FormErrorMessage fontWeight="bold">{form.errors.valor_venta}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='duracion'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.duracion && form.touched.duracion}>
                                                <FormLabel>Duración</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage fontWeight="bold">{form.errors.duracion}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='valor_tiempo'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.valor_tiempo && form.touched.valor_tiempo}>
                                                <FormLabel>Valor de tiempo</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage fontWeight="bold">{form.errors.valor_tiempo}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='valor_unidad'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.valor_unidad && form.touched.valor_unidad}>
                                                <FormLabel>Valor de unidad</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage fontWeight="bold">{form.errors.valor_unidad}</FormErrorMessage>
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
                                    <Field name='precio_mano_obra'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.precio_mano_obra && form.touched.precio_mano_obra}>
                                                <FormLabel>Precio de mano de obra</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage fontWeight="bold">{form.errors.precio_mano_obra}</FormErrorMessage>
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
                                    <Field name='valor_total_unidad'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.valor_total_unidad && form.touched.valor_total_unidad}>
                                                <FormLabel>Valor total por unidad</FormLabel>
                                                <Input {...field} type='number' />
                                                <FormErrorMessage fontWeight="bold">{form.errors.valor_total_unidad}</FormErrorMessage>
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
                                    <Button
                                        mt={4}
                                        colorScheme='orange'
                                        onClick={() => handleEdit()}
                                    >
                                        Editar Receta
                                    </Button>
                                </SimpleGrid>
                            </Form>

                        )}
                    </Formik>
                </Box>

                : null
            }
        </VStack>

    </>
}