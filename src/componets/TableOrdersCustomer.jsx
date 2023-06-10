import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Table, Tbody, Tr, Td, Button, IconButton, Text, FormControl,
  FormErrorMessage, TableContainer, TableCaption, Thead, Th, FormLabel, Select, Tfoot, Box, Textarea
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRef } from "react";

const TableOrdersCustomer = ({ data, seeOrder, getListProductsOrder }) => {

  const ref = useRef(null);

  function validate(value) {
    const edit = data.find(element => element._id === value);
    edit.state = ref.current.values.state;
  }

  return (

    <TableContainer width="100%">
      <Box overflowY="scroll" maxHeight="15rem" sx={{
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
          <Thead>
            <Tr>
              <Th color='white'>Lista Pedido</Th>
              <Th color='white'>Nota Cliente</Th>
              <Th color='white'>Estado</Th>
              <Th color='white'>Ver</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Box maxH="400px" overflow="auto">
                    <Textarea isReadOnly={true} color="white" value={getListProductsOrder(item)}></Textarea>
                  </Box>
                </Td>
                <Td>
                  <Box maxH="400px" overflow="auto" color='white'>
                    <Textarea isReadOnly={true} color="white" value={item.customerNote}></Textarea>
                  </Box>
                </Td>
                <Td>
                  <Text color="white" >{item.state}</Text>
                </Td>
                <Td>
                  <IconButton
                    color="black"
                    aria-label="Ver"
                    icon={<EditIcon />}
                    onClick={() => seeOrder(item._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th color='white'>Lista Pedido</Th>
              <Th color='white'>Nota Cliente</Th>
              <Th color='white'>Estado</Th>
              <Th color='white'>Ver</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default TableOrdersCustomer;
