import { useParams } from 'react-router-dom';
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input, SimpleGrid, GridItem, 
    Heading, Image, VStack, Icon, Select
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import  UsePromotion  from '../context/Promotion/UsePromotion';

export default function EditPromocion() {
    const { id } = useParams();
    const { findPromotionById } = UsePromotion();
    const promotion = findPromotionById(id);
    const [imagePreviewUrl, setImagePreviewUrl] = useState();/*esta es la url de la image, para el image */
    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */
    const {  editPromocion } = UsePromotion();

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

    return <>
        <VStack bg="rgba(0,0,0,.4)" h='100vh'>
            <Box p='4' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Crear Promocion</Heading>
            </Box>
            <Formik
                innerRef={ref}
                initialValues={{
                    /*
                                        image: null,
                                        */
                    image: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
                    name: promotion.name,
                    price: promotion.price.$numberDecimal,
                    description: promotion.description,
                    activo: promotion.active,
                    stock: promotion.stock,
                }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('La promocion requiere un nombre'),
                    price: Yup.number()
                        .required('La promocion requiere un precio'),
                    description: Yup.string()
                        .required('La promocion requiere una descripción'),
                    stock: Yup.number()
                        .required('Se requiere saber las existencias las promociones, aunque sean negativas')
                    //   console.error(error);
                    // }
                }, 1000)}
                onSubmit={(values, actions) => {
                    editPromocion(values, actions, id);
                }}
            >
                {(props) => (
                    <Form>
                        <SimpleGrid columns={[1, 2, 3]} spacing='5%' alignItems='center' color='white'>
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
                                                accept="image/*"
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
                            <Field name='price'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.price && form.touched.price}>
                                        <FormLabel>Precio</FormLabel>
                                        <Input {...field} type='number' />
                                        <FormErrorMessage fontWeight="bold">{form.errors.price}</FormErrorMessage>
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

                            <Field name='activo'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.activo && form.touched.activo}>
                                        <FormLabel htmlFor='activo'>Activo</FormLabel>
                                        <Select {...field} id='activo'>
                                            <option value={true}>Sí</option>
                                            <option value={false}>No</option>
                                        </Select>
                                        <FormErrorMessage>{form.errors.activo}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Button
                                mt={4}
                                colorScheme='red'
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Editar Promocion
                            </Button>
                        </SimpleGrid>
                    </Form>

                )}
            </Formik>
        </VStack>

    </>
}