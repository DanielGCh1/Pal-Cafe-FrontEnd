import {
  Button,
  Container,
  Divider,
  FormLabel,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import useEmployees from '../context/Employee/UseEmployees';
import { useEffect } from 'react';

import useProducts from '../context/Product/UseProduct';

const CreacionEmpleados = () => {
  const { employees, selected, getEmployee, getEmployees, guardar } =
    useEmployees();
    const { setSelected } = useProducts();

  const errors = validate(
    selected,
    selected ? selected.first_name : '',
    selected ? selected.last_name : '',
    selected ? selected.email : ''
  );

  useEffect(() => {
    getEmployees();
    console.log(employees)
  }, []);

  const handleClick = id => {
    getEmployee(id);
  };

  const handleEdit = () => {

  }

  return (
    <VStack
      color="white"
      bg="blackAlpha.800"
      width="100%"
      h="calc(100vh)"
      padding="50px 0px 20px 0px"
    >
      <HStack
        justifyContent="center"
        maxW="100%"
        w="90%"
        // w="1px"
        py="30px"
        px="30px"
        alignItems="flex-start"
        borderColor="white"
        borderStyle="solid"
        borderWidth="2px"
        position="relative"
      >
        <form
          className="formProducto"
          onSubmit={ev => {
            ev.preventDefault();
            saveEmployee(selected);
          }}
        >
          <FormLabel>Nombre</FormLabel>
          <input
            type="text"
            name="nombre"
            className="inputsFoms"
            autoComplete="off"
            value={selected ? selected.first_name : ''}
            onChange={ev => setSelected({ ...selected, first_name: ev.target.value })}
            style={input}
          ></input>
          <FormLabel>Apellidos</FormLabel>
          <input
            type="text"
            name="descripcion"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.last_name : ''}
            onChange={ev =>
              setSelected({ ...selected, last_name: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Email</FormLabel>
          <input
            type="text"
            name="amount"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.email : ''}
            onChange={ev =>
              setSelected({ ...selected, email: ev.target.value })
            }
            style={input}
          ></input>

          <p style={error}>{errors}</p>

          <HStack
            position="absolute"
            bottom="6"
            alignSelf="flex-end"
            display="flex"
            flexWrap="wrap"
          >
            <Button
              color="White"
              bgColor="#822424"
              type="submit"
              w="140px"
              h="47px"
              _hover={{
                bg: '#FFDB58',
                color: 'red.900',
                borderColor: 'red.900',
                borderStyle: 'solid',
                borderWidth: '2px',
              }}
            >
              Crear
            </Button>
            <Button
              color="White"
              bgColor="#822424"
              w="140px"
              h="47px"
              _hover={{
                bg: '#FFDB58',
                color: 'red.900',
                borderColor: 'red.900',
                borderStyle: 'solid',
                borderWidth: '2px',
              }}
              onClick={handleEdit()}
            >
              Editar
            </Button>
            <Button
              color="White"
              bgColor="#822424"
              w="140px"
              h="47px"
              _hover={{
                bg: '#FFDB58',
                color: 'red.900',
                borderColor: 'red.900',
                borderStyle: 'solid',
                borderWidth: '2px',
              }}
            >
              Eliminar
            </Button>
          </HStack>
        </form>
        <Divider orientation="vertical" bg="whiteAlpha.900" minW="2px" />
        <Container>
          <TableContainer
            className="overflow limited"
            width="100%"
            bg="white"
            color="black"
          >
            <Table variant="striped" colorScheme="blackAlpha">
              <Thead bg="red.900">
                <Tr>
                  <Th color="white" textAlign="center">
                    Nombre
                  </Th>
                  <Th color="white" textAlign="center"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees.length
                  ? employees.map(emp => (
                      <Tr key={emp.id}>
                        <Td>{emp.first_name}</Td>
                        <Td isNumeric>
                          <Button
                            onClick={() => {
                              handleClick(emp.id);
                            }}
                          ></Button>
                        </Td>
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </HStack>
    </VStack>
  );
};

const saveEmployee = employee => {
  setTimeout(() => {
    alert(JSON.stringify(employee, null, 2));
  }, 1000);
};

const validate = (
  selected,
  first_name,
  last_name,
  email
) => {
  if (selected !== null) {
    if (first_name !== undefined)
      if (first_name.length === 0) return 'Se requiere un nombre';
    if (last_name !== undefined)
      if (last_name.length === 0) return 'Se requiere un apellido';
    if (email !== undefined)
      if (email.length === 0) return 'Se requiere un correo';
  } else {
    return '';
  }
};

const error = {
  color: 'red',
  fontSize: '20px',
};
const input = {
  border: '1px solid black',
  width: '100%',
};
const ml = {
  margin_left: '2%',
};

const mr = {
  margin_right: '20px',
};

export default CreacionEmpleados;
