import Header from '../componets/header';
import { Container, VStack, StackDivider, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal';
import Footer from '../componets/Footer'

export default function PalCafe() {
    return (
        <>
            <HeaderPaginaPrincipal />
            <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' maxW='100%' h='calc(70vh)' p='0'
                justifyContent='center'>

                <VStack

                    spacing={4}
                    align='stretch'
                >
                    <Stack backgroundSize='cover' maxW='100%' h='calc(70vh)' p='0'
                        justifyContent='center' >

                    </Stack>
                    <Outlet />
                    <Footer />
                </VStack>
            </Container>
        </>
    );
}