import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Table, Tbody, Tr, Td, Button, IconButton, Text, FormControl,
  FormErrorMessage, TableContainer, TableCaption, Thead, Th, FormLabel, Select, Tfoot, Box, Textarea
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRef } from "react";

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

const TableComponent = ({ data, onEdit, onDelete, saveChangesOrders, getListProductsOrder }) => {

  const ref = useRef(null);

  const saveChanges = () => {
    if (window.confirm("¿Esta seguro que desea, guardar los cambios?")) {
      saveChangesOrders();
    }
  };

  function validate(value) {
    const edit = data.find(element => element._id === value);
    edit.state = ref.current.values.state;
  }

  return <>
    {!isUndefinedOrNull(data)
      ?
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
            <TableCaption color='white'>Administrar Ordenes</TableCaption>
            <Thead>
              <Tr>
                <Th color='white'>Cliente</Th>
                <Th color='white'>Lista Pedido</Th>
                <Th color='white'>Nota Cliente</Th>
                <Th color='white'>Estado</Th>
                <Th color='white'>Editar</Th>
                <Th color='white'>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item._id}>
                  <Td>
                    <Text color="white" >{item.name_customer}</Text>
                  </Td>
                  <Td>
                    <Box maxH="400px" overflow="auto">
                      <Textarea isReadOnly={true} color="white" value={getListProductsOrder(item)}></Textarea>
                    </Box>
                  </Td>
                  <Td>
                    <Box maxH="400px" overflow="auto">
                      <Textarea isReadOnly={true} color="white" value={item.customerNote}></Textarea>
                    </Box>
                  </Td>
                  <Td>
                    <Formik
                      innerRef={ref}
                      initialValues={{ state: item.state }}
                      onSubmit={() => { }}
                    >
                      {(props) => (
                        <Form>
                          <Field name="stock" validate={() => validate(item._id)}>
                            {({ field, form }) => (
                              <Field name='state'>
                                {({ field, form }) => (
                                  <FormControl isInvalid={form.errors.state && form.touched.state}>
                                    <FormLabel>Estado</FormLabel>
                                    <Select {...field} color='black'>
                                      <option value="Pendiente">Pendiente</option>
                                      <option value="Aceptado">Aceptado</option>
                                      <option value="Rechazado">Rechazado</option>
                                    </Select>
                                    <FormErrorMessage fontWeight="bold">{form.errors.state}</FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>

                            )}
                          </Field>
                        </Form>
                      )}
                    </Formik>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Editar"
                      icon={<EditIcon />}
                      onClick={() => onEdit(item)}
                    />
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
                <Th color='white'>Cliente</Th>
                <Th color='white'>Lista Pedido</Th>
                <Th color='white'>Nota Cliente</Th>
                <Th color='white'>Estado</Th>
                <Th color='white'>Editar</Th>
                <Th color='white'>Eliminar</Th>
              </Tr>
            </Tfoot>
          </Table>

        </Box>
        <Button marginTop="20px" bg="red" color="white" onClick={saveChanges}>
          Guardar cambios
        </Button>
      </TableContainer>
      : null}
  </>
}

export default TableComponent;
