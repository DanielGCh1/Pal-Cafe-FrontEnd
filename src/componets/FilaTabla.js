import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { Link } from '@chakra-ui/react'

import useClientes from '../context/Cliente/UseClientes';
import { useEffect, useState } from 'react';

export default function FilaTabla({ id, nombre, estado }) {
    const { clientes, clienteSelecionado, getClientes, setClienteSelecionado, getCliente } =
        useClientes();

    useEffect(() => {
        getClientes();
    }, []);

    const editar = () => {
        getCliente(id);
    };

    const eliminar = () => {
        getCliente(id);
    };

    const errors = validate(
        clienteSelecionado ? clienteSelecionado.id : '',
        clienteSelecionado ? clienteSelecionado.last_name : '',
        clienteSelecionado ? clienteSelecionado.first_name : '',
        clienteSelecionado ? clienteSelecionado.email : '',
        clienteSelecionado ? clienteSelecionado.first_name : '',
        clienteSelecionado ? clienteSelecionado.first_name : ''
    );

    const [hoverImage, setHoverImege] = useState(false);
    return (
        <Tr alignItems='center' textAlign="center">
            <Td textAlign="center" >{nombre}</Td>
            <Td textAlign="center" >{estado}</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">1</Td>
            <Td>
                <Image src={require("../assets/lapicera.png")} width="35px" height="35px" alt="" m="auto"
                    onClick={() => {
                        editar();
                    }} />
            </Td>
            <Td>
                <Image src={require(hoverImage ? "../assets/eliminarHover.png" : "../assets/eliminar.png")} width="35px" height="35px" alt="" m="auto"
                    _hover={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoverImege(true)} onMouseLeave={() => setHoverImege(false)}
                    onClick={() => {
                        editar();
                    }} />
            </Td>
        </Tr>
    );
}

const validate = (
    name,
    description,
    amount,
    materialPrice,
    salePrice,
    preparationTime
) => {
    if (name !== undefined) if (name.length === 0) return 'Se requiere un nombre';
    if (description !== undefined)
        if (description.length === 0) return 'Se requiere una descripcion';
    if (amount !== undefined)
        if (amount.length === 0) return 'Se requiere una cantidad';
    if (materialPrice !== undefined)
        if (materialPrice.length === 0)
            return 'Se requiere el gasto en ingredientes';
    if (salePrice !== undefined)
        if (salePrice.length === 0) return 'Se requiere el precio de venta';
    if (preparationTime !== undefined)
        if (preparationTime.length === 0)
            return 'Se requiere el tiempo preparacion';
};
