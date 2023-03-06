import { HStack, Image, Table, TableCaption, TableContainer, Tbody, Tfoot, Th, Thead, Tr, VStack, Text, Select } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const AdministracionEmpleados = () => {

  const empleados = [
    {
      id: '1',
      nombre: 'Heilen',
      primerApellido: 'Segura',
      segundoApellido: 'Cordero',
      fechaRegistro: '12/12/2022'
    },
    {
      id: '2',
      nombre: 'Ana',
      primerApellido: 'Segura',
      segundoApellido: 'Cordero',
      fechaRegistro: '12/12/2022'
    },
    {
      id: '3',
      nombre: 'Laura',
      primerApellido: 'Segura',
      segundoApellido: 'Cordero',
      fechaRegistro: '12/12/2022'
    }
  ]

  useEffect(() => {

  }, [])

  return (
    <VStack>
      <HStack marginBottom="2%" width="100%" padding="2%" bg="rgba(0,0,0,0.1)" alignItems="center" justifyContent="center">
        <Text border={'2px'} borderRadius={'10'} textColor={'#e9bd15'} fontSize='2xl'>Administración de Empleados</Text>
      </HStack>
      <TableContainer width="90%">
        <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px" color="#fff">
          <TableCaption color="#000">Pal Café Administración de Empleados</TableCaption>
          <Thead>
            <Tr>
              <Th color="#000">Nombre</Th>
              <Th color="#000">Primer apellido</Th>
              <Th color="#000">Segundo apellido</Th>
              <Th color="#000">Fecha registro</Th>
              <Th color="#000">Rol</Th>

            </Tr>
          </Thead>
          <Tbody>
            {empleados.length
              ? empleados.map(emp => (
                <tr>
                  <td>
                    {emp.nombre}
                  </td>
                  <td>
                    {emp.primerApellido}
                  </td>
                  <td>
                    {emp.segundoApellido}
                  </td>
                  <td>
                    {emp.fechaRegistro}
                  </td>
                  <td>
                    <Select style={{ fontWeight: "bold" }} color="#fff" placeholder='Seleccionar opción' textColor={'black'}>
                      <option value='option1'>Administrador</option>
                      <option value='option2'>Cajero</option>
                    </Select>
                  </td>
                  <td>
                    <Image src={require("../assets/eliminar.png")} width="35px" height="35px" alt="Eliminar" m="auto" borderBlock="1px" borderRadius="5px" bg="rgba(0,0,0,.2)" />
                  </td>
                  <td>
                    <Image src={require("../assets/lapicera.png")} width="35px" height="35px" alt="Modificar" m="auto" borderBlock="1px" borderRadius="5px" bg="rgba(0,0,0,.2)" />
                  </td>
                </tr>
              ))
              : null}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th color="#000">Nombre</Th>
              <Th color="#000">Primer apellido</Th>
              <Th color="#000">Segundo apellido</Th>
              <Th color="#000">Fecha registro</Th>
              <Th color="#000">Rol</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  )
}

export default AdministracionEmpleados