import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import ProductosVentaPaginaPrincipal from '../componets/productosVentaPaginaPrincipal'

import { SimpleGrid } from '@chakra-ui/react'

import { Divider } from '@chakra-ui/react'

import { Stack, HStack, VStack, StackDivider } from '@chakra-ui/react'

import { Flex, Spacer } from '@chakra-ui/react'

import { Text } from '@chakra-ui/react'

import { AspectRatio } from '@chakra-ui/react'

export default function paginaPrincipal() {

    return <>
        <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
            justifyContent='center'>

            <HeaderPaginaPrincipal />

            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >


                <Stack maxW={['10', '100']} h='430'>

                </Stack>

                <Stack spacing={5} alignItems='center'>
                    <Text fontSize='6xl'>Sobre Nosotros</Text>
                    <Text fontSize='4xl'>Historia</Text>
                    <Text fontSize='2xl' p='50px'>Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin literature from
                        45 BC, making it over 2000 years old.</Text>

                </Stack>

                <Flex

                    direction={{ base: 'column', md: 'row' }}
                    alignItems='center'
                >
                    <Stack spacing={1} alignItems='center'>
                        <Text fontSize='4xl'>Visión</Text>
                        <Text fontSize='2xl' p='25px'>Barrio Las Brisas, Daniel Flores, Pérez Zeledón</Text>

                    </Stack>
                    <Spacer />
                    <Stack spacing={1} alignItems='center'>
                        <Text fontSize='4xl'>Misión</Text>
                        <Text fontSize='2xl' p='25px'>Barrio Las Brisas, Daniel Flores, Pérez Zeledón</Text>
                    </Stack>

                </Flex>
            </VStack>
        </Container>
    </>
}