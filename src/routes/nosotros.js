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

        <Stack spacing={5} alignItems='center'>
            <Text fontSize='6xl'>Sobre Nosotros</Text>
            <Text fontSize='4xl'>Historia</Text>
            <Text fontSize='2xl' p='50px'>Somos un pequeño negocio familiar dedicado a la panadería y repostería tradicional de la zona. Todos nuestros  productos son elaborados de manera artesanal y libres de preservantes artificiales.</Text>

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

    </>
}