import Header from '../componets/header';
import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <>
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
        <div id="divCenter">
          <Outlet />
        </div>
      </Container>
    </>
  );
}
