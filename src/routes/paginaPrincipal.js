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

                <Stack backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
                    justifyContent='center' >

                </Stack>


                <Stack spacing={5} alignItems='center'>
                    <Text fontSize='5xl'>PAL CAFÉ</Text>
                    <Text fontSize='2xl' p='50px'>Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin literature from
                        45 BC, making it over 2000 years old.</Text>

                </Stack>

                <AspectRatio ratio={16 / 9}>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3936.5903856472532!2d-83.68107094127808!3d9.369467042815717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa14fcec96d1653%3A0xaabcb7b8d5b0b0dd!2zUGFsIGNhZsOp!5e0!3m2!1ses!2scr!4v1673391758308!5m2!1ses!2scr"></iframe>

                </AspectRatio>

                <Flex

                    direction={{ base: 'column', md: 'row' }}
                    alignItems='center'
                >
                    <Stack spacing={1} alignItems='center'>
                        <Text fontSize='3xl'>VISÍTANOS</Text>
                        <Text fontSize='2xl' p='25px'>Barrio Las Brisas, Daniel Flores, Pérez Zeledón</Text>

                    </Stack>
                    <Spacer />
                    <Stack spacing={1} alignItems='center'>
                        <Text fontSize='3xl' p='25px 25px 5px 5px' >HORARIO</Text>
                        <Text fontSize='2xl' p='25px 25px 5px 5px' >Lunes - Sabádo</Text>
                        <Text fontSize='2xl' p='25px 25px 5px 5px' >5:30 a.m. - 7:00 p.m.</Text>
                        <Text fontSize='2xl' p='25px 25px 5px 5px' >Domingo</Text>
                        <Text fontSize='2xl' p='25px 25px 5px 5px' >5:30 a.m. - 3:00 p.m.</Text>

                    </Stack>

                </Flex>

                <ProductosVentaPaginaPrincipal />
            </VStack>
        </Container>
    </>
}