import { useNavigate } from 'react-router-dom';
import {
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Container,
    VStack,
    Image,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Axios from "../context/api";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useEffect } from 'react';

const buttonMenu = (name) => {
    return (
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
    );
}



export default function Header() {
    const navigate = useNavigate();
    const handleClick = (to) => {
        navigate(to);
    };
    const cerrarsesion = async () => {
        try {
            const { status } = await Axios.delete("/logout", {
                withCredentials: true
            });
            if (status == 200) {
                handleClick("/")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container overflowX='hidden' overflowY='scroll' position='fixed' width='15%' maxWidth="15%" h='calc(100vh)' bg='white' color='black' p='0' m="0"
            sx={{
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
            <VStack >
                <Menu>
                    <Container height="120px" w="100%" maxWidth="100%" bg="black" p="0px" display="flex" justifyContent="center" alignItems="center">
                        <Image src={require("../assets/Logo.png")} w="100px" h="100px"></Image>
                    </Container>
                </Menu>
                <Menu>
                    {buttonMenu('Ingredientes')}
                    <MenuList>
                        <MenuItem onClick={() => handleClick('/Home/CrearIngrediente')}>Crear Material</MenuItem>
                        <MenuItem onClick={() => handleClick('/Home/AdministrarIngredientes')}>Buscar material</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Productos')}
                    <MenuList>
                        <MenuItem onClick={() => handleClick('/Home/RegistrarProductos')}>Registrar producto</MenuItem>
                        <MenuItem onClick={() => handleClick('/Home/AdministracionProductos')}>Administrar Productos</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        m="0"
                        h='70px'
                        w="100%"
                        _hover={{ bg: '#dcdcdc' }}
                        _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px' }}
                        _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: '#56070C' }}
                        onClick={() => handleClick('/Home/AdministrarOrdenes')}
                    >
                        Administrar pedidos
                    </MenuButton>
                </Menu>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        m="0"
                        h='70px'
                        w="100%"
                        _hover={{ bg: '#dcdcdc' }}
                        _expanded={{ bg: '#56070C', color: 'white', borderBottomColor: '#white', borderBottomStyle: 'solid', borderBottomWidth: '3px' }}
                        _focus={{ borderBottomColor: '#56070C', borderStyle: 'solid', borderWidth: '3px', color: '#56070C' }}
                        onClick={() => handleClick('/Home/HistorialProduccion')}
                    >
                        Historial Produccion
                    </MenuButton>
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
                        <MenuItem onClick={() => handleClick('/Home/AdministracionEmpleados')}>Administrar Empleados</MenuItem>
                        <MenuItem onClick={() => handleClick('/Home/RegistrarEmpleados')}>Registrar Empleados</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Clientes')}
                    <MenuList>
                        <MenuItem onClick={() => handleClick('/Home/BuscarClientes')}>Buscar clientes</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    {buttonMenu('Promociones')}
                    <MenuList>
                        <MenuItem onClick={() => handleClick('/Home/CrearPromociones')}>Crear Promociones</MenuItem>
                        <MenuItem onClick={() => handleClick('/Home/BuscarPromociones')}>Administrar Promociones</MenuItem>
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
                    <MenuButton
                        as={Button}
                        color="white"
                        bgColor="#56070C"
                        borderRadius="0px"
                        h="100px"
                        w="100%"
                        _hover={{
                            bg: "#FFC107",
                            color: "#b31b1b",
                            boxShadow: "inset 0 0 10px 2px rgba(0, 0, 0, 0.5)",
                            transition: "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease"
                        }}
                        _focus={{ outline: "none", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" }}
                        transition="background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease"
                        fontWeight="bold"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        onClick={cerrarsesion}
                    >
                        <Icon as={FiLogOut} boxSize={10} mr={2} />
                        <Text>Cerrar sesión</Text>
                    </MenuButton>
                </Menu>
            </VStack>
        </Container>
    );
}
