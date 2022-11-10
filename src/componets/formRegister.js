import { FormControl, FormLabel, FormErrorMessage, Button, Input, HStack, VStack } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


export default function FormRegister() {

    return (
        <Formik
            initialValues={{
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                email: '',
                numeroUno: '',
                numeroDos: '',
                direcciom: '',
                contra: '',
                repContra: '',
            }}

            validationSchema={Yup.object({
                nombre: Yup.string()
                    .required('Requerido'),
                primerApellido: Yup.string()
                    .required('Requerido'),
                segundoApellido: Yup.string()
                    .required('Requerido'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Requerido'),
                primerApellido: Yup.string()
                    .required('Requerido'),
                segundoApellido: Yup.string()
                    .required('Requerido'),
                numeroUno: Yup.string()
                    .required('Requerido'),
                direcciom: Yup.string()
                    .required('Requerido'),
                contra: Yup.string()
                    .required('Requerido'),
                repContra: Yup.string()
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
                <Form>
                    <HStack spacing='28'>
                        <VStack>
                            <Field name='nombre'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.nombre && form.touched.nombre}>
                                        <FormLabel>Nombre</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>{form.errors.nombre}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='primerApellido'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.primerApellido && form.touched.primerApellido}>
                                        <FormLabel>Primer apellido</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>{form.errors.primerApellido}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='segundoApellido'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.segundoApellido && form.touched.segundoApellido}>
                                        <FormLabel>Segundo apellido</FormLabel>
                                        <Input {...field}  />
                                        <FormErrorMessage>{form.errors.segundoApellido}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='email'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <Input {...field}  />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='numeroUno'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.numeroUno && form.touched.numeroUno}>
                                        <FormLabel>Numero de teléfono 1</FormLabel>
                                        <Input {...field} type='number'  />
                                        <FormErrorMessage>{form.errors.numeroUno}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='numeroDos'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.numeroDos && form.touched.numeroDos}>
                                        <FormLabel>Numero de teléfono 2</FormLabel>
                                        <Input {...field} type='number' />
                                        <FormErrorMessage>{form.errors.numeroDos}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </VStack>
                        <VStack alignSelf='flex-start'>
                            <Field name='direcciom'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.direcciom && form.touched.direcciom}>
                                        <FormLabel>Dirección</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>{form.errors.direcciom}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='contra'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.contra && form.touched.contra}>
                                        <FormLabel>Contraseña</FormLabel>
                                        <Input {...field}  />
                                        <FormErrorMessage>{form.errors.contra}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='repContra'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.repContra && form.touched.repContra}>
                                        <FormLabel>Repetir contraseña</FormLabel>
                                        <Input {...field}  />
                                        <FormErrorMessage>{form.errors.repContra}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </VStack>
                    </HStack>
                    <Button
                        mt={4}
                        colorScheme='red'
                        isLoading={props.isSubmitting}
                        type='submit'
                        marginTop='10'
                    >
                        Registrar
                    </Button>
                </Form>
            )}
        </Formik>
    )
}