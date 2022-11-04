import { Container, HStack, Image, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea, Select, Stack, StackDivider } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const fieldForm = (name, NombreLabel, type) => {

    return <>
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>{NombreLabel}</FormLabel>
                    <Input {...field} type={type} backgroundColor="white" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </>
}


export default function RegisterMaterial() {
    return <>
        <VStack color='white' bg='blackAlpha.800' width="100%" h='calc(100vh)' padding="50px 0px 20px 0px" >
            <h1 className="title">Registrar Material</h1>
            <HStack justifyContent="center"
                alignItems="flex-start" maxW="100%" borderColor="white" borderStyle="solid" borderWidth="2px" py="30px">
                <VStack paddingX="25px">
                    <Image alignSelf='flex-start' margin="auto" src={require('../assets/Nacarina.jpg')}></Image>
                </VStack>
                <VStack borderLeft="2px" borderColor="white" borderStyle="solid" paddingX="25px">
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
                                <Stack spacing={6} divider={<StackDivider borderColor='gray.200' />}>
                                    {fieldForm('nombre', 'Nombre', 'text')}
                                    {fieldForm('precio', 'Precio', 'number')}

                                    <HStack>
                                        <FormLabel w="320px">Tipo de Unidad:</FormLabel>
                                        <Select bg="white" color="black">
                                            <option value='option1'>Option 1</option>
                                            <option value='option2'>Option 2</option>
                                            <option value='option3'>Option 3</option>
                                        </Select>
                                        <Container h='80px' w='3px' p="0" />
                                        <Container h='80px' w='3px' p="0" borderLeft="3px"
                                            borderStyle="solid" borderColor="white" />
                                        <Container h='80px' w='3px' p="0" />
                                        {fieldForm('cantidad', 'Cantidad', 'number')}
                                    </HStack>

                                    <Field name='descripcion'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.descripcion && form.touched.descripcion}>
                                                <FormLabel>Descripcion</FormLabel>
                                                <Textarea
                                                    {...field}
                                                    size='sm'
                                                    backgroundColor="white"
                                                />
                                                <FormErrorMessage>{form.errors.descripcion}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Container w="100%" display="flex" justifyContent="flex-end" maxWidth="100%" p="0">
                                    <Button
                                        mt={4}
                                        color='White'
                                        bgColor='#822424'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                        marginTop='10'
                                        w="140px"
                                        h="47px"
                                        _hover={{ bg: '#FFDB58', color: 'red.900', borderColor: "red.900", borderStyle: "solid", borderWidth: "2px" }}
                                    >
                                        Crear
                                    </Button>
                                </Container>
                            </Form>
                        )}
                    </Formik>
                </VStack>
            </HStack>
        </VStack>
    </>
}