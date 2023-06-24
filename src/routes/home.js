import Header from '../componets/header';
import Notificaciones from './Notificaciones';
import { Container, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function Home() {
  const [notice, setNotice] = useState(false)

  useEffect(() => {

  }, [])

  return (
    <>
      <Container
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
          <Notificaciones />
          <Outlet />
        </VStack>

      </Container>
    </>
  );
}
