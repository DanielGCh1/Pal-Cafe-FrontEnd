import { Container, Box, Heading, Spacer, Button, Flex, Input, Text, HStack, Image, AspectRatio } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import FormRegister from '../componets/formRegister'

export default function RegistrarCliente() {
    const [user, setUser] = useState('')
    const [passwrod, setPassword] = useState('')
    const handleChangeUser = (event) => setUser(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)

    return <>
        <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' color='white' display='flex' maxW='100%' h='calc(100vh)' justifyContent='center'>
            <Flex
               bg='blackAlpha.800' p='20px' borderRadius='10px' flexDirection='column' minWidth='max-content' alignSelf='center' alignItems='center' gap='2' w='550px' boxShadow='dark-lg'>
                <Box p='1'>
                    <Heading size='md'>Registrarse</Heading>
                </Box>

                <Spacer />

                <FormRegister></FormRegister>

                <Spacer/>

                <HStack>
                    <Text>¿Ya está registrado/a?</Text>
                    <Link className='linksto' to="/">Volver a Iniciar Sesión</Link>
                </HStack>
            </Flex>
        </Container>
    </>
}