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
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

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


export default function Header() {

    return <>
        <Container position='relative' display='flex' width='100%' maxW='100%' h='70px' bg='white' color='black' p='0'>
            <Menu>
                {buttonMenu('Ingredientes')}
                <MenuList>
                    <MenuItem>
                        <Link to='/Home/RegisterMaterial'>Crear Material</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/Home/BuscarMaterial'>Buscar material</Link>
                    </MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Productos')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Pedidos')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Historial de Produccion')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Notificaciones')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Empleados')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Clientes')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Promocionee')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                {buttonMenu('Estadisticas')}
                <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open...</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton position='absolute' as={Button} color='white' borderRadius='0px' backgroundColor='#56070C' h='70' right='0px'
                    _hover={{ borderWidth: '3px', borderRadius: '10px', borderStyle: 'solid', borderColor: 'white' }} >
                    Cerrar sesion
                </MenuButton>
            </Menu>
        </Container>
    </>
}