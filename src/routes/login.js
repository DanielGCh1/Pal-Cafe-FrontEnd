import { Container, Box, Heading, Spacer, Button, Flex, Input, Text, HStack, Image, AspectRatio, VStack, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "../context/api";
import { ChevronRightIcon } from '@chakra-ui/icons';
import { extendTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MotionButton = motion(Button);

const MotionChevronRightIcon = motion(ChevronRightIcon);

const MotionScaleButton = ({ children, ...props }) => {
  return (
    <MotionButton
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, backgroundColor: "rgb(231, 193, 21)" }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default function Login() {
  const [user, setUser] = useState('')
  const [userLogin, setUserLogin] = useState({})
  const handleChangeUser = (event) => setUser(event.target.value)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };


  useEffect(() => {
    getCookie();
  }, [])

  const loginUser = async () => {
    try {
      Axios.post("/login", { correo: user, password: password }, {
        withCredentials: true
      }).then((data) => {
        console.log(data);
        navigate("/home")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getCookie = async () => {
    try {
      const { data, status } = await Axios.get("/getCookie", {
        withCredentials: true
      });
      if (status == 200) {
        setUserLogin(data);
        navigate("/home")
      }
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
        <Stack spacing="8px" color="black">
          <FormControl>
            <FormLabel color="white" htmlFor="correo">
              Correo:
            </FormLabel>
            <Input
              id="correo"
              bg="rgba(255, 255, 255, 0.5)"
              _focus={{
                boxShadow: "0 0 0 3px rgba(255, 0, 0, 0.5)",
                borderColor: "red.500",
              }}
              value={user}
              onChange={handleChangeUser}
              placeholder=""
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white" htmlFor="contrasena">
              Contraseña:
            </FormLabel>
            <InputGroup>
              <Input
                id="contrasena"
                bg="rgba(255, 255, 255, 0.5)"
                _focus={{
                  boxShadow: "0 0 0 3px rgba(255, 0, 0, 0.5)",
                  borderColor: "red.500",
                }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChangePassword}
                placeholder=""
                size="sm"
              />
              <InputRightElement width="20%" height={"100%"}>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  size="sm"
                  w={"100%"}
                  lineHeight="normal"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleTogglePassword}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>



        <Spacer w='50px' />
        <h1>{userLogin ? userLogin.usu_correo : ""}</h1>
        <MotionScaleButton
          bg={"#b31b1b"}
          rightIcon={<MotionChevronRightIcon />}
          onClick={() => loginUser()}
        >
          Ingresar
        </MotionScaleButton>
        <Spacer />

        <VStack>
          <Text color={"white"}>¿Aún no está registrado/a en el sistema de administración?</Text>
          <Text color={"white"}>Póngase en contacto con el equipo de mantenimiento.</Text>
        </VStack>
      </Flex>
    </Container>
  </>
}