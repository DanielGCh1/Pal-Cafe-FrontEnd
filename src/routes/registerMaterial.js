import { HStack, Image, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea, Select, Stack, StackDivider } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const fieldForm = (name, NombreLabel, type) => {

    return <>
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>{NombreLabel}</FormLabel>
                    <Input {...field} type={type} />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </>
}


export default function RegisterMaterial() {
    return <>
        <HStack color='white' bg='blackAlpha.800' p='20px' borderRadius='10px' 
        minWidth='max-content' alignSelf='center' alignItems='center' gap='2' w='550px' boxShadow='dark-lg' margin='auto' marginTop='40px'>            
        <VStack>
            <Image alignSelf='flex-start' src={require('../assets/Nacarina.jpg')}></Image>
        </VStack>
            <VStack>
                <Formik
                    initialValues={{
                        nombre: '',
                        precio: '',
                        cantidad: '',
                        tipoDeUnidad: '',
                        descripcion: '',
                    }}

                    validationSchema={Yup.object({
                        nombre: Yup.string()
                            .required('Requerido'),
                        precio: Yup.string()
                            .required('Requerido'),
                        cantidad: Yup.string()
                            .required('Requerido'),
                        descripcion: Yup.string()
                            .required('Requerido'),
                    })}

                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            actions.setSubmitting(false)
                        }, 1000)
                    }}
                >
                    {(props) => (
                        <Form >
                            <Stack spacing={3} divider={<StackDivider borderColor='gray.200' />}>
                                {fieldForm('nombre', 'Nombre', 'text')}
                                {fieldForm('precio', 'Precio', 'number')}

                                <HStack>
                                    <FormLabel>Tipo de Unidad</FormLabel>
                                    <Select>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                    {fieldForm('cantidad', 'Cantidad', 'number')}
                                </HStack>

                                <Field name='descripcion'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.descripcion && form.touched.descripcion}>
                                            <FormLabel>Descripcion</FormLabel>
                                            <Textarea
                                                {...field}
                                                size='sm'
                                            />
                                            <FormErrorMessage>{form.errors.descripcion}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Stack>

                            <Button
                                mt={4}
                                colorScheme='red'
                                isLoading={props.isSubmitting}
                                type='submit'
                                marginTop='10'
                            >
                                Crear
                            </Button>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </HStack>
    </>
}