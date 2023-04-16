import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Table, Tbody, Tr, Td, Button, IconButton, Text, FormControl, FormErrorMessage, TableContainer, TableCaption, Thead, Th, Input, Tfoot, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRef } from "react";

const TableComponent = ({ data, onAdd }) => {

    return (

        <TableContainer width="100%">
            <Box overflowY="scroll" maxHeight="25rem" sx={{
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
            }}>
                <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px">
                    <TableCaption color='white'>Ingredientes</TableCaption>
                    <Thead>
                        <Tr>
                            <Th color='white'>Nombre</Th>
                            <Th color='white'>Unidad</Th>
                            <Th color='white'>Cantidad</Th>
                            <Th color='white'>Precio</Th>
                            <Th color='white'>Agregar</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item) => (
                            <Tr key={item._id}>
                                <Td>
                                    <Text color="white" >{item.ing_nombre}</Text>
                                </Td>
                                <Td>
                                    <Text color="white" >{item.ing_tipo_unidad}</Text>
                                </Td>
                                <Td>
                                    <Text color="white" >{item.ing_cantidad}</Text>
                                </Td>
                                <Td>
                                    <Text color="white" >{item.ing_precio}</Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Agregar"
                                        icon={<AddIcon />}
                                        onClick={() => onAdd(item)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th color='white'>Nombre</Th>
                            <Th color='white'>Unidad</Th>
                            <Th color='white'>Cantidad</Th>
                            <Th color='white'>Precio</Th>
                            <Th color='white'>Agregar</Th>
                        </Tr>
                    </Tfoot>
                </Table>

            </Box>
            {/*
            <Button marginTop="20px" bg="red" color="white" onClick={saveChanges}>
                Guardar cambios
            </Button>
             */}
        </TableContainer>
    );
};

export default TableComponent;
