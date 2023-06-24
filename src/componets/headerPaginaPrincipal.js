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
    Box
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'

import { Link } from 'react-router-dom'
import { SettingsIcon } from '@chakra-ui/icons'

import useCustomer from '../context/Customer/UseCustomer';
import useOrders from '../context/Orders/UseOrders';

import { useEffect } from 'react';

import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import ShoppingCartProductList from './shoppingCartProductList'
import { useNavigate } from "react-router-dom";


const buttonMenu = (name) => {
    return (
        <Button
            bg='black'
            color='white'
            px={4}
            py={2}
            borderRadius={10}
            h='70px'
            _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
            _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
            _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
        >
            {name} <ChevronDownIcon />
        </Button>
    );
}



export default function HeaderPaginaPrincipal() {

    const { customer, getSectionCustomer, signOff } = useCustomer();
    const { orders, listProductsOrder } = useOrders();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


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
                <Box display={['none', 'block']}>
                    {(customer == null) ?
                        <Link to='/PalCafe/LoginCustomer' >
                            <Button
                                bg='black'
                                color='white'
                                px={4}
                                py={2}
                                borderRadius={10}
                                h='70px'
                                _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                            >
                                Inicio Sesión
                            </Button>

                        </Link>
                        : null}
                    <Menu>
                        <Link to='/PalCafe/Nosotros' >
                            <Button
                                bg='black'
                                color='white'
                                px={4}
                                py={2}
                                borderRadius={10}
                                h='70px'
                                _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                            >
                                Nosotros
                            </Button>

                        </Link>
                    </Menu>
                    <Menu>
                        <Link to='/PalCafe/Contacto' >
                            <Button
                                bg='black'
                                color='white'
                                px={4}
                                py={2}
                                borderRadius={10}
                                h='70px'
                                _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                            >
                                Contacto
                            </Button>

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
                    {(customer != null && customer.usu_estado === "Aceptado") ?
                        <Button leftIcon={<FaShoppingCart />} backgroundColor="black" onClick={onOpen}
                            bg='black'
                            color='white'
                            px={4}
                            py={2}
                            borderRadius={10}
                            h='70px'
                            _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                            _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                            _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                        >
                        </Button>

                        : null}
                </Box>

                <Box display={['block', 'none']}>
                    {/* Menú tipo hamburguesa para dispositivos móviles */}
                    <Button
                        bg='black'
                        color='white'
                        px={4}
                        py={2}
                        borderRadius={10}
                        h='70px'
                        onClick={toggleMenu}
                        _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger', fontWeight: 'bold' }}
                        _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger', fontWeight: 'bold' }}
                        _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger', fontWeight: 'bold' }}
                    >
                        <HamburgerIcon></HamburgerIcon>
                    </Button>
                    {isMenuOpen && (
                        <Box mt={2} bg='blackAlpha.900' p={2}>
                            {/* Resto de los elementos del menú */}
                            {(customer == null) ?
                                <Link to='/PalCafe/LoginCustomer' >
                                    <Button
                                        bg='black'
                                        color='white'
                                        px={4}
                                        py={2}
                                        borderRadius={10}
                                        h='70px'
                                        _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                        _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                        _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                                    >
                                        Inicio Sesión
                                    </Button>

                                </Link>
                                : null}
                            <Menu>
                                <Link to='/PalCafe/Nosotros' >
                                    <Button
                                        bg='black'
                                        color='white'
                                        px={4}
                                        py={2}
                                        borderRadius={10}
                                        h='70px'
                                        _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                        _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                        _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                                    >
                                        Nosotros
                                    </Button>

                                </Link>
                            </Menu>
                            <Menu>
                                <Link to='/PalCafe/Contacto' >
                                    <Button
                                        bg='black'
                                        color='white'
                                        px={4}
                                        py={2}
                                        borderRadius={10}
                                        h='70px'
                                        _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                        _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                        _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                                    >
                                        Contacto
                                    </Button>

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
                            {(customer != null && customer.usu_estado === "Aceptado") ?
                                <Button leftIcon={<FaShoppingCart />} backgroundColor="black" onClick={onOpen}
                                    bg='black'
                                    color='white'
                                    px={4}
                                    py={2}
                                    borderRadius={10}
                                    h='70px'
                                    _hover={{ bg: '#56070C', color: 'white', fontSize: 'larger' }}
                                    _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px', fontSize: 'larger' }}
                                    _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: 'white', fontSize: 'larger' }}
                                >
                                </Button>

                                : null}
                        </Box>
                    )}
                </Box>

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