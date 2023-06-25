import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Table, Tbody, Tr, Td, Button, IconButton, Text, FormControl, FormErrorMessage, TableContainer, TableCaption, Thead, Th, Input, Tfoot, Box } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRef } from "react";

const validationSchema = Yup.object().shape({
  stock: Yup.number().required('Existencias requeridas'),
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
const TableComponent = ({ data, onEdit, onDelete, saveChangesProducts }) => {

  const ref = useRef(null);

  const saveChanges = () => {
    if (window.confirm("¿Esta seguro que desea, guardar los cambios?")) {
      if (data.length > 0) {
        if (ref.current.errors.stock != 'Existencias requeridas') {
          saveChangesProducts();
        }
      }
      else {
        window.alert("No existen productos, para guardar cambios");
      }
    }
  };

  function validate(value) {
    const edit = data.find(element => element._id === value);
    edit.pro_existencias = ref.current.values.stock;
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
            <TableCaption color='white'>Administrar Productos</TableCaption>
            <Thead>
              <Tr>
                <Th color='white'>Nombre</Th>
                <Th color='white'>Existencias</Th>
                <Th color='white'>Editar</Th>
                <Th color='white'>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item._id}>
                  <Td>
                    <Text color="white" >{item.pro_nombre}</Text>
                  </Td>
                  <Td>
                    <Formik
                      innerRef={ref}
                      initialValues={{ stock: item.pro_existencias }}
                      validationSchema={validationSchema}
                      onSubmit={() => { }}
                    >
                      {(props) => (
                        <Form>
                          <Field name="stock" validate={() => validate(item._id)}>
                            {({ field, form }) => (
                              <FormControl isInvalid={form.errors.stock && form.touched.stock}>
                                <Input
                                  {...field}
                                  type="number"
                                  color='white'
                                  style={{
                                    border:
                                      props.stock && props.stock
                                        ? '1px solid red'
                                        : '',
                                  }}
                                /*onChange={() => editElement(item._id)}*/
                                />
                                <FormErrorMessage fontWeight="bold">{form.errors.stock}</FormErrorMessage>
                              </FormControl>

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
                <Th color='white'>Nombre</Th>
                <Th color='white'>Existencias</Th>
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
