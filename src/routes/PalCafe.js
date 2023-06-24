import Header from '../componets/header';
import { Container, VStack, StackDivider, Stack, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal';
import Footer from '../componets/Footer'

export default function PalCafe() {
    return (
        <>
            <HeaderPaginaPrincipal />
            <Container position="relative" maxW="100%" h="calc(70vh)" p="0" justifyContent="center">
                {/* Background Image */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundImage={`url(${require('../assets/fondoLogin.jpg')})`}
                    backgroundSize="cover"
                    zIndex="0"
                />

                <VStack
                    backgroundColor="#33383B"
                    color="white"
                    spacing={4}
                    align="stretch"
                >
                    <Stack backgroundSize="cover" maxW="100%" h="calc(70vh)" p="0" justifyContent="center"></Stack>
                    <Outlet />
                    <Footer />
                </VStack>
            </Container>
        </>
    );
}