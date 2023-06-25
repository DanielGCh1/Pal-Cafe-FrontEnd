import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Container,
    Spacer,
    Image,
    Flex,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { Link } from 'react-router-dom'
import { SettingsIcon } from '@chakra-ui/icons'

import useCustomer from '../context/Customer/UseCustomer';
import { useEffect } from 'react';


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
                <Menu>
                    {buttonMenu('Carrito')}
                    <MenuList color='#d5ae0f' bg='#56070c'>
                        <MenuItem>
                            <Link to='/PalCafe/PerfilUsuario'>
                                Carrito
                            </Link>
                        </MenuItem>
                        <MenuItem>Carrito</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Container>
    </>
}