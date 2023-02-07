import Header from '../componets/header';
import { Container, VStack, StackDivider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal';

export default function PalCafe() {
    return (
        <>
            <HeaderPaginaPrincipal />
            <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
                justifyContent='center'>

                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                >
                    <Outlet />
                </VStack>
            </Container>
        </>
    );
}