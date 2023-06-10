import {
  Container, HStack, Image, VStack, Icon, FormControl, FormLabel, FormErrorMessage, Button, Box, Input, Textarea, Select,
  Stack, StackDivider, SimpleGrid, GridItem, Heading
} from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRef } from "react";
import Axios from "axios";
import { FaTimes } from "react-icons/fa";
import useAdmProducts from "../context/AdministrativeProduct/AdmUseProduct";

const isNull = obj => {
  if (obj === null) {
    return true;
  }
  return false;
};


export default function RegistrarProductos() {
  const { addAdmProduct, getAdmProduct } = useAdmProducts();

  const [imagePreviewUrl, setImagePreviewUrl] = useState();/*Esta es la url de la imagen, para el image */
  const ref = useRef(null); /*Esta es una referencia a los valores del formulario */

  const handleImageChange = (event) => {/*Se activa cuando se hace un cambio en la imagen, 
    normalmente, es cuando se agrega una imagen, y convertirla a url*/
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    //ref.current.values.imagen = file;
    //validateImage(ref.current.values.imagen);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleImageDelete = () => { /*Se activa cuando se elimina la imagen*/
    setImagePreviewUrl(null);
    //ref.current.values.imagen = null;
  };
  function validateImage(value) { /*Valida si el archivo que se subió, es de tipo imagen*/
    /*let error
    if (isNull(value)) {
      return error = 'La imagen del producto es requerida'
    }
    if (!value.type.includes("image")) {
      return error = "Ingrese una imagen válida"
    }
    return error*/
  }

  return <>
    <Box p='4' display="flex" justifyContent={'center'}>
      <Heading color="white" fontWeight="bold" size='2xl'>Registrar Producto</Heading>
    </Box>
    <VStack h='100vh' overflowY="scroll" maxHeight="55.4rem" sx={{
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
      <Box>
        <Formik
          innerRef={ref}
          /*initialValues= son los datos iniciales, y los que se van modificando
          mientras se usa el formulario*/
          initialValues={{
            nombre: "",
            valor_venta: 0,
            duracion: 0,
            valor_tiempo: 0,
            valor_unidad: 0,
            cantidad: 0,
            precio_mano_obra: 0,
            descripcion: "",
            /*image: null,*/
            imagen: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
            existencias: 0,
            valor_total_unidad: 0,
            receta: []
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
              .required('El producto requiere el precio de mano de obra'),
            descripcion: Yup.string()
              .required('El producto requiere una descripción'),
            existencias: Yup.number()
              .required('El producto requiere de las existencias que hay'),
            valor_total_unidad: Yup.number()
              .required('El producto requiere un valor total por unidad')
          })}
          /*el onSubmit, solo se activa cuando, el formulario no tiene errores*/
          onSubmit={(values, actions) => {
            /*values, son los initialValues, ejemplo values.name, es el nombre del producto*/
            console.log(values);
            addAdmProduct(values, actions);
            /*setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
  
            }, 1000)*/
          }}
        >
          {(props) => (
            <Form>
              <SimpleGrid columns={[1, 2, 3]} spacing='5%' alignItems='center' color='white'>
                <GridItem rowSpan={2}>
                  {/* Este field, es el de imagen, aquí es donde se busca la imagen*/}
                  <Field name="imagen" validate={validateImage} h='calc(100vh)'>
                    {({ field, form }) => (
                      <FormControl maxW='100%' isInvalid={form.errors.imagen && form.touched.imagen}
                        display="flex" justifyContent='center' alignItems='center' flexDirection='column'>
                        <FormLabel htmlFor="foto">Imagen</FormLabel>
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
                        <FormErrorMessage fontWeight="bold">{form.errors.imagen}</FormErrorMessage>
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
                {/* name, apunta al valor de los initialValues, en este caso apunta a "price" */}
                <Field name='valor_venta'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.valor_venta && form.touched.valor_venta}>
                      <FormLabel>Valor de venta</FormLabel>
                      <Input {...field} type='number' />
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
                      <FormLabel>Valor del tiempo</FormLabel>
                      <Input {...field} type='number' />
                      <FormErrorMessage fontWeight="bold">{form.errors.valor_tiempo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='valor_unidad'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.valor_unidad && form.touched.valor_unidad}>
                      <FormLabel>Valor de la unidad</FormLabel>
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
                      <FormLabel>Precio por la mano de obra</FormLabel>
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
                  Registrar Producto
                </Button>
              </SimpleGrid>
            </Form>

          )}
        </Formik>
      </Box>
    </VStack>

  </>
}