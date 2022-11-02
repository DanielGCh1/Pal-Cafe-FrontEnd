import { Container, Box, Heading, Spacer, Button, Flex, Input, Text, HStack, Image, AspectRatio } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Login() {
  const [user, setUser] = useState('')
  const [passwrod, setPassword] = useState('')
  const handleChangeUser = (event) => setUser(event.target.value)
  const handleChangePassword = (event) => setPassword(event.target.value)

  const validateLogin = async () => {
    try {
      const { data } = await Axios.get(
        "http://localhost:9000/api/user/posts",
        {
          params: {
            user,
            passwrod
          }
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return <>
    <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' color='white' display='flex' maxW='100%' h='calc(100vh)'
      justifyContent='center'>
      <Flex
        bg='blackAlpha.800' p='20px' borderRadius='10px' flexDirection='column' minWidth='max-content' alignSelf='center' alignItems='center' gap='2' w='550px' boxShadow='dark-lg'>
        <Box p='1'>
          <Heading size='md'>Iniciar sesión</Heading>
          <AspectRatio marginTop='10px' maxW='300px' ratio={5 / 5}>
            <Image src={require("../assets/usuario.png")} alt='Usario' objectFit='contain' />
          </AspectRatio>
        </Box>

        <Spacer />

        <HStack spacing='34px'>
          <Text mb='8px'>Usuario:</Text>
          <Input
            borderColor='grey'
            bg='white'
            value={user}
            variant='outline'
            onChange={handleChangeUser}
            placeholder=''
            size='sm'
          />
        </HStack>
        <HStack>
          <Text mb='8px'>Contraseña:</Text>
          <Input
            borderColor='grey'
            bg='white'
            value={passwrod}
            variant='outline'
            onChange={handleChangePassword}
            placeholder=''
            size='sm'
          />
        </HStack>

        <Spacer w='50px' />

        <Button colorScheme='red' onClick={() => validateLogin()}>Ingresar</Button>

        <Spacer />

        <HStack>
          <Text>¿Aún no no está registrado/a?</Text>
          <Link className='linksto' to="/Register">Registrar</Link>
        </HStack>
      </Flex>
    </Container>
  </>
}