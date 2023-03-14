import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Table, Tbody, Tr, Td, IconButton, Text, TableContainer, TableCaption, Thead, Th, Input, Tfoot } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const validationSchema = Yup.object().shape({
  existencias: Yup.number().required('Existencias requeridas'),
});

const TableComponent = ({ data, onEdit, onDelete }) => {
  return (

    <TableContainer width="100%" overflowY="scroll" maxHeight="25rem" minHeight="10rem">
      <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px">
        <TableCaption color='white'>Administrar Ingredientes</TableCaption>
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
                <Text color="white" >{item.ing_nombre}</Text>
              </Td>
              <Td>
                <Formik
                  initialValues={{ existencias: item.ing_existencias }}
                  validationSchema={validationSchema}
                  onSubmit={() => { }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field name="existencias">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            color='white'
                            style={{
                              border:
                                errors.existencias && touched.existencias
                                  ? '1px solid red'
                                  : '',
                            }}
                          />
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
                  onClick={() => onEdit(item._id)}
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
    </TableContainer>
  );
};

export default TableComponent;
