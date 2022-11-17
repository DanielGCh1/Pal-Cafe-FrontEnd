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
    Image
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { Link } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

import { Flex } from '@chakra-ui/react'


import { Stack, HStack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

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

    return <>
        <Container position='relative' width='100%' maxW='container.xl%' h='100px' bg='white' color='black' p='{0}'>

            <Flex
                h='100px'
                direction={{ base: 'column', md: 'row' }}
                alignItems='center'
            >
                <Menu>
                    <Container height="100px" w="140px" maxWidth="25%" bg="blackAlpha.900" p="0px" display="flex" justifyContent="center" alignItems="center">
                        <Link href='/PaginaPrincipal'>
                            <Image src={require("../assets/Logo.png")} w="100px" h="100px"></Image>
                        </Link>
                    </Container>
                </Menu>
                <Spacer />
                <Menu>
                    <Link href='/'>
                        {buttonMenu('Inicio Sesión')}
                    </Link>
                </Menu>
                <Menu>
                    {buttonMenu('Nosotros')}

                </Menu>
                <Menu>
                    {buttonMenu('Contacto')}

                </Menu>
                <Menu>
                    {buttonMenu('NombreUsuario')}
                    <MenuList>
                        <MenuItem>
                            <Link href='/PerfilUsuario'>
                                Perfil
                            </Link>
                        </MenuItem>
                        <MenuItem>Cerrar Sesión</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    {buttonMenu(<SettingsIcon />)}
                    <MenuList>
                        <MenuItem>
                            <Link href='/PerfilUsuario'>
                                Perfil
                            </Link>
                        </MenuItem>
                        <MenuItem>Cerrar Sesión</MenuItem>
                    </MenuList>
                </Menu>

            </Flex>

        </Container>
    </>
}