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

export default function EditEmployee() {
    const { id } = useParams();
    const ref = useRef(null); /*Esta es una referencia a los valores del formulario */
    const { editEmployee, getRoles, roles, imageUrl, getImageUrl, setImageUrl, employee, getEmployeeId } = useEmployees();
    const [rolesNoAsignados, setRolesNoAsignados] = useState([]);
    const [rolesAsignados, setRolesAsignados] = useState([]);
    const [rolesSeleccionados, setRolesSeleccionados] = useState([]);
    let searchImage = true; // me indica si debo buscar la imagen

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        //nuevo
        ref.current.values.newImage = file;

        reader.onloadend = () => {
            setImageUrl(reader.result);
            ref.current.values.imageUrlLocal = reader.result;
        };
        reader.readAsDataURL(file);
        //fin nuevo
    };
    const handleImageDelete = () => {
        setImageUrl(null);
        //nuevo
        ref.current.values.newImage = null;
        ref.current.values.imageUrlLocal = null;
        //nuevo
    };
    function validateImage() {
        let value = ref.current.values.newImage;
        if (isUndefinedOrNull(imageUrl) || !isUndefinedOrNull(value)) {
            let error
            if (isNull(value)) {
                return error = 'La imagen del empleado es requerida'
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
    }
    useEffect(() => {
        if (!isUndefinedOrNull(id) && isUndefinedOrNull(employee)) {
            getEmployeeId(id);
            getImageUrl(id);
        }
        if (!isUndefinedOrNull(id) && searchImage && !isUndefinedOrNull(ref.current) && !isUndefinedOrNull(imageUrl)) {
            searchImage = false;
            ref.current.values.imageUrlLocal = imageUrl;
        }
        if (!isUndefinedOrNull(employee) && !isUndefinedOrNull(employee.usu_roles)) {
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
        }
    }, [imageUrl, employee, roles, rolesAsignados]);

    useEffect(() => {
        getRoles()
    }, [])
    /*
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
        */

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
                <Heading color="white" fontWeight="bold" size='2xl'>Editar Empleado</Heading>
            </Box>
            {(!isUndefinedOrNull(employee) && (!isUndefinedOrNull(employee.usu_roles))) ?
                <Formik
                    innerRef={ref}
                    initialValues={{
                        image: employee.usu_foto_url,
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
                        newImage: null,
                        imageUrlLocal: null,
                        newPassword: "",
                        roles: employee.usu_roles,
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
                        if (window.confirm("¿Está seguro que desea editar el empleado?")) {
                            editEmployee(values, actions, id);
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
                                    <SimpleGrid columns={[1, 2, 3]} spacing='30px' alignItems='center' w="100%">
                                        <GridItem rowSpan={2}>
                                            <Field name="imageUrlLocal" validate={validateImage} h='calc(100vh)'>
                                                {({ field, form }) => (
                                                    <FormControl maxW='100%' isInvalid={form.errors.imageUrlLocal && form.touched.imageUrlLocal}
                                                        display="flex" justifyContent='center' alignItems='center' flexDirection='column'>
                                                        <FormLabel htmlFor="foto">Foto</FormLabel>
                                                        {imageUrl ? (
                                                            <Box mt={4} pos="relative">
                                                                <Image src={imageUrl}
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
                                                        <FormErrorMessage fontWeight="bold">{form.errors.imageUrlLocal}</FormErrorMessage>
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
                                </HStack>
                            </Form>
                        </Container>
                    )}
                </Formik>
                : null
            }
        </VStack>

    </>
}