import Header from '../componets/header';
import NotificationsDrawer from '../componets/NotificationsDrawer';
import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function Home() {
  const [notice, setNotice] = useState(false)
  
  useEffect(() => {
    
  },[])

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
        <div id="divCenter">
          <NotificationsDrawer />
          <Outlet />
        </div>
      
      </Container>
    </>
  );
}
