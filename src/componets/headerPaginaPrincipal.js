import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    Container,
    MenuDivider,
    Spacer,
    Button,
    VStack,
    Image,
    Flex,
    FormLabel
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { Link } from 'react-router-dom'
import { SettingsIcon } from '@chakra-ui/icons'

import useCustomer from '../context/Customer/UseCustomer';
import useOrders from '../context/Orders/UseOrders';

import { useEffect } from 'react';

import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import ShoppingCartProductList from './shoppingCartProductList'
import {useNavigate } from "react-router-dom";


const buttonMenu = (name) => {
    return <>
        <MenuButton
            px={4}
            py={2}
            h='70px'
            _hover={{ bg: 'white' }}
            _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px' }}
            _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: '#56070C' }}
        >
            {name} <ChevronDownIcon />
        </MenuButton>
    </>
}



export default function HeaderPaginaPrincipal() {

    const { customer, getSectionCustomer, signOff } = useCustomer();
    const { orders, listProductsOrder } = useOrders();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        if (customer == null) {
            getSectionCustomer();
        }
    }, [customer])

    const signOffCustomer = () => {
        signOff();
    }

    return <>
        <Container position='relative' width='100%' maxW='container.xl%' bg='black' color="white" p='{0}'>

            <Flex

                direction={['column', 'row']}
                alignItems='center'
            >
                <Menu>
                    <Container height="100px" w="140px" maxWidth="25%" minW="25%" bg="blackAlpha.900" p="0px" display="flex" justifyContent="center" alignItems="center">
                        <Link to='/PalCafe/PaginaPrincipal'>
                            <Image src={require("../assets/Logo.png")} bg="black" minW="100px" minh="100px" w="100px" h="100px"></Image>
                        </Link>
                    </Container>
                </Menu>
                <Spacer />
                {(customer == null) ?
                    <Link to='/PalCafe/LoginCustomer'>
                        Inicio Sesión
                    </Link>
                    : null}
                <Menu>
                    <Link to='/PalCafe/Nosotros'>
                        {buttonMenu('Nosotros')}
                    </Link>
                </Menu>
                <Menu>
                    <Link to='/PalCafe/Contacto'>
                        {buttonMenu('Contacto')}
                    </Link>
                </Menu>
                {(customer != null) ?
                    <Menu>
                        {buttonMenu(customer.usu_nombre)}
                        <MenuList color='#d5ae0f' bg='#56070c'>
                            <MenuItem>
                                <Link to='/PalCafe/PerfilUsuario'>
                                    Perfil
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={signOffCustomer}>Cerrar Sesión</MenuItem>
                        </MenuList>
                    </Menu>
                    : null}
                {(customer != null) ?
                    <Menu>
                        {buttonMenu(<SettingsIcon />)}
                        <MenuList color='#d5ae0f' bg='#56070c'>
                            <MenuItem>
                                <Link to='/PalCafe/PerfilUsuario'>
                                    Perfil
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={signOffCustomer}>Cerrar Sesión</MenuItem>
                        </MenuList>
                    </Menu>
                    : null}
                {(customer != null && customer.usu_estado === "Aceptado") ?
                    <Button leftIcon={<FaShoppingCart />} backgroundColor="black" onClick={onOpen}>
                    </Button>

                    : null}
                {(customer != null && customer.usu_estado === "Aceptado") ?
                    <Drawer isOpen={isOpen} onClose={onClose} >
                        <DrawerOverlay>
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Tu carrito de compras</DrawerHeader>
                                <DrawerBody>
                                    <ShoppingCartProductList idCurtomer={customer._id} />
                                    {((typeof listProductsOrder !== 'undefined') && (listProductsOrder.length > 0))
                                        ?
                                        <Button
                                            mt={4}
                                            colorScheme='red'
                                            onClick={() => navigate(`/PalCafe/HacerPedido/${customer._id}`)}
                                            marginTop='10'
                                        >
                                            Hacer Pedido
                                        </Button>
                                        : null}

                                </DrawerBody>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>

                    : null}
            </Flex>

        </Container>
    </>
}