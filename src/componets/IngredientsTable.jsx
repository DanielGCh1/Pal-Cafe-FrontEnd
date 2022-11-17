import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
  } from '@chakra-ui/react';
  import { useContext } from 'react';
  //import '../css/table.css'
  //import IngredientContext from "../context/Ingredient/IngredientContext"
  import { useEffect } from 'react';
  
  export const IngredientsTable = () => {
      //const ingredientContext = useContext(IngredientContext)
  
      useEffect(() => {
        //ingredientContext.getIngredients()
      }, [])
  
    return (
      <TableContainer className='overflow limited'>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {ingredientContext.ingredients.length ? ingredientContext.ingredients.map((ingr) => (          
              <Tr key={ingr.id}>
                <Td>{ingr.first_name}</Td>             
                <Td isNumeric>
                  <Button onClick={() => ingredientContext.getProduct(ingr.id)}></Button>
                </Td>
              </Tr>
            ))
            : null} */}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Final de lista</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
  };
  