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
import { Link } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'

import { FaFacebook } from 'react-icons/fa'

export default function Contacto() {

    return <>

        <Stack spacing={5} alignItems='center'>
            <Text fontSize='6xl'>Contactenos</Text>
            <Text fontSize='2xl' p='50px'>Puede ponerse en contacto con nosotros, por medio de nuestras 3 redes sociales </Text>

        </Stack>

        <Flex

            direction={{ base: 'column', md: 'row' }}
            alignItems='center'
            p='100px'
        >
            <Stack spacing={2} alignItems='center'>
                <Text fontSize='4xl' color='#0b86ee'>Facebook</Text>

                <Link href='https://www.facebook.com/PalCafe254?comment_id=Y29tbWVudDo1Njc1MTg3NzIyNDk1NTI1XzU2NzUyNjQyNzkxNTQ1MzY%3D'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="52" height="52" viewBox="0 0 24 24" strokeWidth="2" stroke="#0b86ee" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>
                </Link>
            </Stack>
            <Spacer />

            <Stack spacing={1} alignItems='center'>
                <Text fontSize='4xl' color='#52c660'>Whatsapp</Text>

                <Link href='https://api.whatsapp.com/send?phone=%2B50672090961&fbclid=IwAR2_fOq_ak5lUBIbGMhoSB4mV3gjOOGxCGH5GsHhUwoCXyQ8Us9FMn3nvmE'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="52" height="52" viewBox="0 0 24 24" strokeWidth="2" stroke="#52c660" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                        <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
                    </svg>
                </Link>
            </Stack>

            <Spacer />

            <Stack spacing={1} alignItems='center'>
                <Text fontSize='4xl' color='#f6076e'>Instagram</Text>

                <Link href='https://www.instagram.com/palcafe_pz/'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="52" height="52" viewBox="0 0 24 24" strokeWidth="2" stroke="#f6076e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="4" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                    </svg>
                </Link>

            </Stack>
        </Flex>

    </>
}