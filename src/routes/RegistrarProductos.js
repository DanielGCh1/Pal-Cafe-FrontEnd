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


export default function RegistrarProductos() {
  const { addAdmProduct } = useAdmProducts();

  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const ref = useRef(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    ref.current.values.imagen = file;
    validateImage(ref.current.values.imagen);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleImageDelete = () => {
    setImagePreviewUrl(null);
    ref.current.values.imagen = null;
  };
  function validateImage(value) {
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
        <Heading color="white" fontWeight="bold" size='2xl'>Registrar Producto</Heading>
      </Box>
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
            valor_total_unidad: 0,
            cantidad: 0,
            precio_mano_obra: 0,
            descripcion: "",
            imagen: null,
            existencias: 0
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
            valor_total_unidad: Yup.number()
              .required('El producto requiere un valor de unidad'),
            cantidad: Yup.number()
              .required('El producto requiere una cantidad'),
            precio_mano_obra: Yup.number()
              .required('El producto requiere el precio de mano de obra'),
            descripcion: Yup.string()
              .required('El producto requiere una descripción'),
            existencias: Yup.number()
              .required('El producto requiere de las existencias que hay'),
          })}
          
          onSubmit={(values, actions) => {
            if (window.confirm("¿Está seguro que desea registrar el nuevo producto?")) {
              addAdmProduct(values, actions);
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
                  <SimpleGrid columns={[1, 2, 3, 4]} spacing='30px' alignItems='center' w="100%">
                    <GridItem rowSpan={2}>
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
                              accept=".jpg, .png, .jpeg"
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
                          <Input {...field} min={1} type='number' />
                          <FormErrorMessage fontWeight="bold">{form.errors.valor_venta}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='duracion'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.duracion && form.touched.duracion}>
                          <FormLabel>Duración</FormLabel>
                          <Input {...field} min={1} type='number' />
                          <FormErrorMessage fontWeight="bold">{form.errors.duracion}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='valor_tiempo'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.valor_tiempo && form.touched.valor_tiempo}>
                          <FormLabel>Valor del tiempo</FormLabel>
                          <Input {...field} min={1} type='number' />
                          <FormErrorMessage fontWeight="bold">{form.errors.valor_tiempo}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='valor_total_unidad'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.valor_total_unidad && form.touched.valor_total_unidad}>
                          <FormLabel>Valor de la unidad</FormLabel>
                          <Input {...field} min={1} type='number' />
                          <FormErrorMessage fontWeight="bold">{form.errors.valor_total_unidad}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='cantidad'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.cantidad && form.touched.cantidad}>
                          <FormLabel>Cantidad</FormLabel>
                          <Input {...field} min={1} type='number' />
                          <FormErrorMessage fontWeight="bold">{form.errors.cantidad}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='precio_mano_obra'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.precio_mano_obra && form.touched.precio_mano_obra}>
                          <FormLabel>Precio por la mano de obra</FormLabel>
                          <Input {...field} min={1} type='number' />
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
                    <Button
                      mt={4}
                      colorScheme='red'
                      isLoading={props.isSubmitting}
                      type='submit'
                    >
                      Registrar Producto
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