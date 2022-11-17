import {
  Button,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import useIngredients from '../context/Ingredients/UseIngredients';

const CrearReseta = () => {
  const { ingredients, selected, getIngredients, getIngredient } = useIngredients();


  useEffect(() => {
    getIngredients();
  }, []);
  const handleClick = id => {
    getIngredient(id)
    console.log(selected)
  };
  
  return (
    <VStack m="1%">
      <Heading>Crear Reseta</Heading>
      <HStack spacing={10}>
        <TableContainer className="overflow limited">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ingredients.length
                ? ingredients.map(prod => (
                    <Tr key={prod.id}>
                      <Td>{prod.first_name}</Td>
                      <Td isNumeric>
                        <Button
                          onClick={() => {
                            handleClick(prod.id);
                          }}
                        ></Button>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Final de lista</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </HStack>
    </VStack>
  );
};

export default CrearReseta;
