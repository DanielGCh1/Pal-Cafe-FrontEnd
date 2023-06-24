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
import { Link } from 'react-router-dom'

const buttonMenu = (name) => {
    return <>
        <MenuButton
            px={4}
            py={2}
            m="0"
            h='70px'
            w="100%"
            _hover={{ bg: '#dcdcdc' }}
            _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px' }}
            _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: '#56070C' }}
        >
            {name} <ChevronDownIcon />
        </MenuButton>
    </>
}


export default function Header() {

    return <>
        <Container position='fixed' width='15%' maxWidth="15%" h='calc(100vh)' bg='white' color='black' p='0' m="0">
            <VStack h='100vh' overflowY="scroll" maxHeight="55rem" sx={{
                "&::-webkit-scrollbar": {
                    width: "7px",
                    backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    bg: "gray.400",
                    borderRadius: "full",
                    opacity: "0.4",
                    "&:hover": {
                        opacity: "0.7",
                    },
                },
            }} >
                <Menu>
                    <Container height="120px" w="100%" maxWidth="100%" bg="black" p="0px" display="flex" justifyContent="center" alignItems="center">
                        <Image src={require("../assets/Logo.png")} w="100px" h="100px"></Image>
                    </Container>
                </Menu>
                <Menu m="0">
                    {buttonMenu('Ingredientes')}
                    <MenuList>
                        <MenuItem>
                            <Link to='/Home/CrearIngrediente'>Crear Ingrediente</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/Home/AdministrarIngredientes'>Administrar Ingredientes</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Productos')}
                    <MenuList>
                        <MenuItem>
                            <Link to='/Home/RegistrarProductos'>Registrar Producto</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/Home/AdministracionProductos'>Administrar Productos</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Pedidos')}
                    <MenuList>
                        <MenuItem>
                            <Link to='/Home/AdministrarOrdenes'>Administrar Pedidos</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <Link to='/Home/HistorialProduccion'>Historial Produccion</Link>
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
                        <MenuItem>
                            <Link to='/Home/AdministracionEmpleados'>Administrar Empleados</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/Home/RegistrarEmpleados'>Registrar Empleados</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Clientes')}
                    <MenuList>
                        <Link to='/Home/BuscarClientes'>
                            <MenuItem>Buscar clientes</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Promociones')}
                    <MenuList>
                        <MenuItem>
                            <Link to='/Home/CrearPromociones'>Crear Promociones</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/Home/BuscarPromociones'>Administrar Promociones</Link>
                        </MenuItem>
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
                <Menu >
                    <MenuButton color='White'
                        bgColor='#56070C' borderRadius='0px' h='100px' w="100%"
                        _hover={{ bg: '#c3473f' }} >
                        Cerrar sesion
                    </MenuButton>
                </Menu>
            </VStack>
        </Container>
    </>
}