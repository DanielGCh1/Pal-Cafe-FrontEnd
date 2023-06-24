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

export default function ChangePasswordCustomer() {

  const { customer, loginCustomer, getSectionCustomer } = useCustomer();
  let animationSudmit = true;

  const navigate = useNavigate();
  /*
    const loginUser = async () => {
      try {
        Axios.post("/api/loginSession", { correo: user, password: password }, {
          withCredentials: true
        }).then((data => console.log(data.data.message)))
      } catch (error) {
        console.log(error)
      }
    }
  
    const getCookie = async () => {
      try {
        const { data } = await Axios.get("/api/getCookie", {
          withCredentials: true
        });
        console.log(data)
        setUserLogin(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    const eliminarCookie = async () => {
      try {
        const { data } = await Axios.get("/api/logout", {
          withCredentials: true
        });
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
  */
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
    if (customer == null) {
      getSectionCustomer();
    }
  }, [customer])
  return <>
    <Flex color="white" bg='blackAlpha.800' p='20px' borderRadius='10px' flexDirection='column' minWidth='max-content' alignSelf='center' alignItems='center' gap='2' w='550px' boxShadow='dark-lg'>
      <Box p='1'>
        <Heading size='md'>Cambiar contraseña</Heading>
        <AspectRatio marginTop='10px' maxW='300px' ratio={5 / 5}>
          <Image src={require("../assets/usuario.png")} alt='Usario' objectFit='contain' />
        </AspectRatio>
      </Box>

      <Spacer />
      <Formik
        initialValues={{
          password: '',
          newPassword: '', repeatNewPassword: ''
        }}
        onSubmit={(values, actions) => {
          loginCustomer(values.mail, values.password, actions);
        }
        }
      >
        {props => (//TODO: props tiene todos, los values, las funciones y otros
          <Form>
            <Field name='password'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <Input {...field} type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='newPassword'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <Input {...field} type="password"/>
                  <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='repeatNewPassword'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.repeatNewPassword && form.touched.repeatNewPassword}>
                  <FormLabel>Repetir Nueva Contraseña</FormLabel>
                  <Input {...field} type="password"/>
                  <FormErrorMessage>{form.errors.repeatNewPassword}</FormErrorMessage>
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
                Cambiar Contraseña
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Spacer />
    </Flex>
  </>
}