import Header from '../componets/header';
import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import {
    HStack,
    Image,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
    Text,
    Select,
    Stack,
    Input
} from '@chakra-ui/react'

export default function RegistrarEmpleados() {
    return (
        <>

            <VStack>
                <HStack marginBottom="2%" width="100%" padding="2%" bg="rgba(0,0,0,0.1)" alignItems="center" justifyContent="center">
                    <Text border={'2px'} borderRadius={'10'} textColor={'#e9bd15'} fontSize='2xl'>Registro de Empleados</Text>
                </HStack>
                <TableContainer width="90%">
                    <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px" color="#fff">
                        <TableCaption color="#000">Pal Café Registro de Empleados</TableCaption>
                        <Thead>
                        </Thead>
                        <Tbody>
                            <tr>
                                <td>
                                    <Text textColor={'white'} fontSize='lg'>Nombre</Text>
                                    <Text textColor={'white'} fontSize='lg'>Fecha de registro</Text>
                                </td>
                                <td>
                                    <Stack spacing={3}>
                                        <Input focusBorderColor='#e9bd15' variant='filled' />
                                    </Stack>
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        type="datetime-local"
                                    />
                                </td>
                                <td>
                                    <Text textColor={'white'} fontSize='lg'>Primer apellido</Text>
                                </td>
                                <td>
                                    <Stack spacing={3}>
                                        <Input focusBorderColor='#e9bd15' variant='filled' />
                                    </Stack>
                                </td>
                                <td>
                                    <Text textColor={'white'} fontSize='lg'>Segundo apellido</Text>
                                </td>
                                <Stack spacing={3}>
                                    <Input focusBorderColor='#e9bd15' variant='filled' />
                                </Stack>
                                <td>

                                </td>

                                <td>
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                            </tr>
                        </Tbody>
                        <Tfoot>
                            <Tr>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </VStack>
        </>
    );
}
