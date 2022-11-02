import Header from '../componets/header'
import { Container, } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";

export default function Home() {

    return <>
        <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
    justifyContent='center'>
            <Header />
                <Outlet />
        </Container>
    </>
}