import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Table, Tbody, Tr, Td, Button, IconButton, Text, FormControl, FormErrorMessage, TableContainer, TableCaption, Thead, Th, Input, Tfoot, Box } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRef } from "react";
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  amount: Yup.number().required('Existencias requeridas'),
});

const isUndefined = obj => {
  if (obj === "undefined" || typeof obj === "undefined") {
    return true;
  }
  return false;
};

const isNull = obj => {
  if (obj === null) {
    return true;
  }
  return false;
};

const isUndefinedOrNull = obj => {
  if (isUndefined(obj) || isNull(obj)) {
    return true;
  }
  return false;
};

const TableComponentEditRecipe = ({ data, onDelete, saveChangesRecipe, ingredients }) => {

  const ref = useRef(null);
  const refCost = useRef(null);
  const [cost, setCost] = useState(null);

  const saveChanges = () => {
    if (window.confirm("¿Esta seguro que desea, guardar los cambios?")) {
      if (ref.current.errors.amount != 'Existencias requeridas') {
        saveChangesRecipe();
      }
    }
  };

  const searchItemList = (data, itemId) => {
    if (!isUndefinedOrNull(data) && data.length > 0) {
      return data.find((element) => { return element._id == itemId });
    }
    return null;
  };

  const getCost = (itemId, amount) => {
    const ingredient = searchItemList(ingredients, itemId);
    return (ingredient.ing_precio / ingredient.ing_cantidad) * amount;
  }

  function validate(value) {
    const edit = data.find(element => element._id === value);
    edit.cantidad_ingrediente = ref.current.values.amount;
    refCost.current.values.cost = getCost(value, edit.cantidad_ingrediente);
    console.log(refCost.current.values.cost);
    setCost(refCost.current.values.cost);
  }

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
          <TableCaption color='white'>Administrar Ingredientes</TableCaption>
          <Thead>
            <Tr>
              <Th color='white'>Nombre</Th>
              <Th color='white'>Unidad</Th>
              <Th color='white'>Cantidad</Th>
              <Th color='white'>Costo Total</Th>
              <Th color='white'>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Text color="white" >{item.nombre_ingrediente}</Text>
                </Td>
                <Td>
                  <Text color="white" >{item.unidad}</Text>
                </Td>
                <Td>
                  <Formik
                    innerRef={ref}
                    initialValues={{ amount: item.cantidad_ingrediente }}
                    validationSchema={validationSchema}
                    onSubmit={() => { }}
                  >
                    {(props) => (
                      <Form>
                        <Field name="amount" validate={() => validate(item._id)}>
                          {({ field, form }) => (
                            <FormControl isInvalid={form.errors.amount && form.touched.amount}>
                              <Input
                                {...field}
                                type="number"
                                color='white'
                                style={{
                                  border:
                                    props.amount && props.amount
                                      ? '1px solid red'
                                      : '',
                                }}
                              /*onChange={() => editElement(item._id)}*/
                              />
                              <FormErrorMessage fontWeight="bold">{form.errors.amount}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Form>
                    )}
                  </Formik>
                </Td>
                <Td>
                  <Formik
                    innerRef={refCost}
                    initialValues={{ cost: getCost(item._id, item.cantidad_ingrediente) }}
                    validationSchema={validationSchema}
                    onSubmit={() => { }}
                  >
                    {(props) => (
                      <Form>
                        <Field name="cost">
                          {({ field, form }) => (
                            <FormControl isInvalid={form.errors.cost && form.touched.cost}>
                              <Input
                                isReadOnly={true}
                                {...field}
                                type="number"
                                color='white'
                                style={{
                                  border:
                                    props.cost && props.cost
                                      ? '1px solid red'
                                      : '',
                                }}
                              /*onChange={() => editElement(item._id)}*/
                              />
                              <FormErrorMessage fontWeight="bold">{form.errors.cost}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Form>
                    )}
                  </Formik>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(item._id)}
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
              <Th color='white'>Costo Total</Th>
              <Th color='white'>Eliminar</Th>
            </Tr>
          </Tfoot>
        </Table>

      </Box>
      <Button marginTop="20px" bg="red" color="white" onClick={saveChanges}>
        Guardar cambios
      </Button>
    </TableContainer>
  );
};

export default TableComponentEditRecipe;
