import { useParams } from 'react-router-dom';
import {
    FormControl, FormLabel, FormErrorMessage, Button, Box, Input, SimpleGrid, GridItem,
    Heading, Image, VStack, Icon, HStack, Text, Container
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import useEmployees from '../context/Employee/UseEmployees';

export default function EditEmployee() {
    const { id } = useParams();
    const { findEmployeeById } = useEmployees();
    const employee = findEmployeeById(id);
    const [imagePreviewUrl, setImagePreviewUrl] = useState();/*esta es la url de la image, para el image */
    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */
    const { editEmployee, getRoles, roles } = useEmployees();
    const [rolesNoAsignados, setRolesNoAsignados] = useState([]);
    const [rolesAsignados, setRolesAsignados] = useState([]);
    const [rolesSeleccionados, setRolesSeleccionados] = useState([]);

    useEffect(() => {
        getRoles()
    }, [])

    useEffect(() => {
        // Creamos una copia del array de roles original
        const rolesCopy = [...roles];
      
        // Filtramos los roles no asignados
        const rolesNoAsignados = rolesCopy.filter((rol) => {
          // Verificamos si el rol no está asignado al empleado
          return !employee.usu_roles.some((r) => r.rol_tipo === rol.rol_tipo);
        });
      console.log(rolesNoAsignados);
        // Actualizamos los estados de los roles no asignados y asignados
        setRolesNoAsignados(rolesNoAsignados);
        setRolesAsignados(employee.usu_roles);
      }, [roles, employee.usu_roles]);

    const seleccionarRol = (rol) => {
        // verifica si el rol ya está en la lista de roles seleccionados
        if (rolesSeleccionados.includes(rol)) {
            // si está, remueve el rol de la lista
            setRolesSeleccionados(rolesSeleccionados.filter((r) => r !== rol));
        } else {
            // si no está, agrega el rol a la lista
            setRolesSeleccionados([...rolesSeleccionados, rol]);
        }
    };

    const moverIzquierda = () => {
        // Verificar que al menos un rol está seleccionado
        if (rolesSeleccionados.length > 0) {
            // Crear una copia de los roles asignados
            const nuevosRolesAsignados = [...rolesAsignados];
            const nuevosRolesNoAsignados = [...rolesNoAsignados];

            // Eliminar todos los roles seleccionados de la lista de roles asignados
            rolesSeleccionados.forEach((rol) => {
                const index = nuevosRolesAsignados.indexOf(rol);
                if (index !== -1) {
                    nuevosRolesAsignados.splice(index, 1);
                    // Agregar el rol a la lista de roles no asignados solo si no existe allí
                    if (!nuevosRolesNoAsignados.some((r) => r.rol_tipo === rol.rol_tipo)) {
                        nuevosRolesNoAsignados.push(rol);
                    }
                }
            });

            // Actualizar la lista de roles asignados y no asignados
            setRolesAsignados(nuevosRolesAsignados);
            setRolesNoAsignados(nuevosRolesNoAsignados);

            // Limpiar la lista de roles seleccionados
            setRolesSeleccionados([]);
        }
    };

    const moverDerecha = () => {
        // Verificar que al menos un rol está seleccionado
        if (rolesSeleccionados.length > 0) {
            // Crear una copia de los roles asignados
            const nuevosRolesAsignados = [...rolesAsignados];
            const nuevosRolesNoAsignados = [...rolesNoAsignados];

            // Eliminar todos los roles seleccionados de la lista de roles asignados
            rolesSeleccionados.forEach((rol) => {
                const index = nuevosRolesNoAsignados.indexOf(rol);
                if (index !== -1) {
                    nuevosRolesNoAsignados.splice(index, 1);
                    // Agregar el rol a la lista de roles asignados solo si no existe allí
                    if (!nuevosRolesAsignados.some((r) => r.rol_tipo === rol.rol_tipo)) {
                        nuevosRolesAsignados.push(rol);
                    }
                }
            });

            // Actualizar la lista de roles asignados y no asignados
            setRolesAsignados(nuevosRolesAsignados);
            setRolesNoAsignados(nuevosRolesNoAsignados);

            // Limpiar la lista de roles seleccionados
            setRolesSeleccionados([]);
        }
    };


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
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Empleado</Heading>
            </Box>
            <Formik
                innerRef={ref}
                initialValues={{
                    /*      image: null,     */
                    image: "https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317458173_676689817496166_2616952165804500300_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=rLRjnHMeEyUAX-sdLtZ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDDWJObBaRx1D-LosUvAnjztaPAqjYyJYyg2grFJXtZWw&oe=640FCC4E",
                    nombre: employee.usu_nombre,
                    usuario: employee.usu_usuario,
                    primerApellido: employee.usu_primer_apellido,
                    segundoApellido: employee.usu_segundo_apellido,
                    telefonoPrimer: employee.usu_numero_telefono1,
                    telefonoSegundo: employee.usu_numero_telefono2,
                    direccion: employee.usu_direccion,
                    correo: employee.usu_correo,
                    password: employee.usu_contraseña,
                    /*roles: employee.usu_roles, */
                    roles: roles[0],
                }}

                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .required('El empleado requiere un nombre'),
                    primerApellido: Yup.string()
                        .required('La empleado requiere un apellido'),
                    segundoApellido: Yup.string()
                        .required('La empleado requiere un segundo apellido'),
                    telefonoPrimer: Yup.number()
                        .required('La empleado requiere un numero de telefono'),
                    correo: Yup.string().email()
                        .required('Ingrese un email valido'),
                    password: Yup.string()
                        .required("Se necesita un contraseña")
                }, 1000)}
                onSubmit={(values, actions) => {
                    //values.roles = rolesAsignados;
                    console.log(values)
                    editEmployee(values, actions, id);
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
                            <Field name='nombre'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.nombre && form.touched.nombre}>
                                        <FormLabel>Nombre:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.nombre}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='primerApellido'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.primerApellido && form.touched.primerApellido}>
                                        <FormLabel>Primer Apellido:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.primerApellido}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='segundoApellido'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.segundoApellido && form.touched.segundoApellido}>
                                        <FormLabel>Segundo Apellido:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.segundoApellido}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='usuario'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.usuario && form.touched.usuario}>
                                        <FormLabel>Usuario:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.usuario}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='telefonoPrimer'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.telefonoPrimer && form.touched.telefonoPrimer}>
                                        <FormLabel>Numero principal:</FormLabel>
                                        <Input {...field} type='number' />
                                        <FormErrorMessage fontWeight="bold">{form.errors.telefonoPrimer}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='telefonoSegundo'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.telefonoSegundo && form.touched.telefonoSegundo}>
                                        <FormLabel>Numero segundario:</FormLabel>
                                        <Input {...field} type='number' />
                                        <FormErrorMessage fontWeight="bold">{form.errors.telefonoSegundo}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='direccion'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.direccion && form.touched.direccion}>
                                        <FormLabel>Dirección:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.direccion}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='correo'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.correo && form.touched.correo}>
                                        <FormLabel>Correo:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.correo}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='password'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel>Contraseña:</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage fontWeight="bold">{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <VStack bg={"white"} color={"black"} padding={"5px 4px 5px 4px"}>
                                <HStack w={"100%"} alignItems={'flex-start'}>
                                    <VStack width={'45%'} justifyContent={'flex-start'} alignContent={'flex-start'} borderStyle={'solid'} borderColor={'black'}>
                                        <Text>Roles asignados:</Text>
                                        {rolesAsignados?.map((role, index) => (
                                            <Container
                                                key={role.id}
                                                style={{
                                                    border: "1px solid lightgray",
                                                    padding: 5,
                                                    margin: 5,
                                                    width: "100%",
                                                    borderColor: rolesSeleccionados.includes(role) ? "red" : "lightgray",
                                                }}
                                                _hover={{ cursor: "pointer" }}
                                                onClick={() => seleccionarRol(role)}
                                            >
                                                {role.rol_tipo}
                                            </Container>
                                        ))}
                                    </VStack>
                                    <VStack width={'45%'} justifyContent={'flex-start'} alignContent={'flex-start'} borderStyle={'solid'} borderColor={'black'}>
                                        <Text>Roles no asignados:</Text>
                                        {rolesNoAsignados?.map((role, index) => (
                                            <Container
                                                key={role.id}
                                                style={{
                                                    border: '1px solid lightgray',
                                                    padding: 5,
                                                    margin: 5,
                                                    width: '100%',
                                                    borderColor: rolesSeleccionados.includes(role) ? 'red' : 'lightgray',
                                                    cursor: 'pointer',
                                                }}
                                                _hover={{ cursor: "pointer" }}
                                                onClick={() => seleccionarRol(role)}
                                            >
                                                {role.rol_tipo}
                                            </Container>
                                        ))}
                                    </VStack>
                                </HStack>
                                <HStack width={'100%'}>
                                    <Button w={'100%'} bg={'red'} onClick={moverDerecha}
                                        disabled={rolesSeleccionados.length === 0}>
                                        {"<"}
                                    </Button>
                                    <Button w={'100%'} bg={'red'} onClick={moverIzquierda}
                                        disabled={rolesSeleccionados.length === 0}>
                                        {">"}
                                    </Button>
                                </HStack>
                            </VStack>

                            <Button
                                mt={4}
                                colorScheme='red'
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Editar empleado
                            </Button>
                        </SimpleGrid>
                    </Form>

                )}
            </Formik>
        </VStack>

    </>
}