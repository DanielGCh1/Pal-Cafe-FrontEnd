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
  Input
} from '@chakra-ui/react';
import { useFormik } from 'formik'
import * as Yup from "yup"
import useEmployees from '../context/Employee/UseEmployees';
import { useEffect, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

const CreacionEmpleados = () => {

  const { employees, getEmployees } = useEmployees();
  const [sel, setSel] = useState()
  useEffect(() => {
    getEmployees();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      email: '',
    },
    validationSchemas: {

    },
    onSubmit: values => {
      console.log('Form data', values)
    }
  })

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
          onSubmit={formik.handleSubmit}
        >
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="name"
            className="inputsFoms"
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
          ></Input>
          <FormLabel>Apellidos</FormLabel>
          <input
            type="text"
            name="last_name"
            autoComplete="off"
            className="inputsFoms"
            value={formik.values.last_name}
            onChange={formik.handleChange}
          ></input>
          <FormLabel>Email</FormLabel>
          <input
            type="text"
            name="email"
            autoComplete="off"
            className="inputsFoms"
            value={formik.values.email}
            onChange={formik.handleChange}
          ></input>

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
              {employees && employees.map(prod => (
                      <Tr key={prod._id}>
                        <Td>{prod.pro_nombre}</Td>
                        <Td isNumeric>
                          <Button
                            onClick={() => {
                              handleClick(prod._id);
                            }}
                          ></Button>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </HStack>
    </VStack>
  );
};

export default CreacionEmpleados;
