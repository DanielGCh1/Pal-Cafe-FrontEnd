import Header from '../componets/header';
import NotificationsDrawer from '../componets/NotificationsDrawer';
import { Container, VStack } from '@chakra-ui/react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Axios from "../context/api";

export default function Home() {
  const navigate = useNavigate();

  const [logeado, setlogeado] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/getCookie", {
        withCredentials: true
      }).then(res => {
        setlogeado(true)
      }).catch(err => {
        navigate("/");
      });
    };

    fetchData();
  }, []);

  return (
    <>
      {logeado ? (
        <Container
        backgroundImage={require('../assets/fondoLogin.jpg')}
        backgroundSize="cover"
        w="100%"
        maxW="100%"
        h="calc(100vh)"
        p="0"
        display="flex"
      >

        <Header />
        <VStack

          spacing={4}
          width='85%'
          position='relative'
          top='0px'
          left='15%'
          height='90%'
        >
          {/* <Notificacione /> */}
          <Outlet />
        </VStack>

      </Container>
      ) : (
        <></>
      )}
    </>
  );
}