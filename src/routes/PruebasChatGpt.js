
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  isInvalid,
  isError,
  Input

} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { Field, Form, Formik } from 'formik';
import React, { createContext, useState } from 'react';

export default function PruebasChatGpt() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''

  function validateName(value) {
    console.log(value);
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <>
      <Button leftIcon={FaBars} onClick={onOpen} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>

          <DrawerCloseButton />

          <Box p={4}>Menu</Box>

        </DrawerContent>

      </Drawer>



      <Formik
        initialValues={{ hola: 'queHace', name: 'Sasuke' }}
        onSubmit={(values, actions) => {
          console.log("Valor de values: "+ values.hola);
          /*setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            
          }, 1000)*/
          actions.setSubmitting(false)
        }
      }
      >
        {(props) => (
          <Form>
            <Field name='hola' >
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.hola && form.touched.hola}>
                  <FormLabel>Hola</FormLabel>
                  <Input {...field} placeholder='hola' />
                  <FormErrorMessage>{form.errors.hola}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>First name</FormLabel>
                  <Input {...field} placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>




    </>
  );
}
