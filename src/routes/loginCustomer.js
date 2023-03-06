import {
  Container, Box, Heading, Spacer, Button, FormLabel, Flex, Input, Text, HStack, Image,
  FormControl, FormErrorMessage, AspectRatio
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";

import { Field, Form, Formik } from 'formik';

import useCustomer from '../context/Customer/UseCustomer';
import { useEffect } from 'react';


const isEmptyString = obj => {
  if (obj === "" || obj.trim() === "") {//Trim: remove blank spaces
    return true;
  }
  return false;
};

export default function LoginCustomer() {

  const { customer, loginCustomer, getSectionCustomer } = useCustomer();
  let animationSudmit = true;

  const navigate = useNavigate();

  function validateMail(value) {
    console.log(value);
    let error
    if (!value || isEmptyString(value)) {
      error = 'El correo o nombre de usuario es requerido'
    }
    return error
  }
  function validatePassword(value) {
    console.log(value);
    let error
    if (!value || isEmptyString(value)) {
      error = 'La contraseña es requerida'
    }
    return error
  }

  useEffect(() => {
    if (customer !== null) {
      animationSudmit = false
      navigate('/PalCafe/PaginaPrincipal')
    }
    if (customer == null) {
      getSectionCustomer();
    }
  }, [customer])
  return <>
      <Flex color="white" bg='blackAlpha.800' p='20px' borderRadius='10px' flexDirection='column' minWidth='max-content' alignSelf='center' alignItems='center' gap='2' w='550px' boxShadow='dark-lg'>
        <Box p='1'>
          <Heading size='md'>Iniciar sesión</Heading>
          <AspectRatio marginTop='10px' maxW='300px' ratio={5 / 5}>
            <Image src={require("../assets/usuario.png")} alt='Usario' objectFit='contain' />
          </AspectRatio>
        </Box>

        <Spacer />
        <Formik
          initialValues={{ mail: '', password: '' }}
          onSubmit={(values, actions) => {
            loginCustomer(values.mail, values.password, actions);
          }
          }
        >
          {props => (//TODO: props tiene todos, los values, las funciones y otros
            <Form>
              <Field name='mail' validate={validateMail}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.mail && form.touched.mail} display="flex" flexDirection={"column"} alignItems="center">
                    <FormLabel>Correo o nombre de usuario</FormLabel>
                    <Input {...field} placeholder='Correo o nombre de usuario' />
                    <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='password' validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} display="flex" flexDirection={"column"} alignItems="center">
                    <FormLabel>Contraseña</FormLabel>
                    <Input {...field} placeholder='Contraseña' type={'password'} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Spacer w='50px' />
              <Box display="flex" flexDirection={"column"} alignItems="center">

                <Button
                  mt={4}
                  colorScheme='red'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Ingresar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Spacer />

        <HStack>
          <Text>¿Aún no no está registrado/a?</Text>
          <Link className='linksto' to="/RegistrarCliente">Registrar</Link>
        </HStack>
      </Flex>
  </>
}