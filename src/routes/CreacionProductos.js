import {
  Button,
  FormLabel,
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
import useProducts from '../context/Product/UseProduct';
import { useEffect, useState } from 'react';

const CreacionProductos = () => {
  const { products, selected, getProduct, getProducts, setSelected } =
    useProducts();

  const errors = validate(
    selected ? selected.id : '',
    selected ? selected.last_name : '',
    selected ? selected.first_name : '',
    selected ? selected.email : '',
    selected ? selected.first_name : '',
    selected ? selected.first_name : ''
  );

  useEffect(() => {
    getProducts();
  }, []);

  const handleClick = id => {
    getProduct(id);
  };

  return (
    <VStack>
      <HStack>
        <form
          onSubmit={ev => {
            ev.preventDefault();
            console.log(selected, 'hola');
            guardarProducto();
          }}
        >
          <FormLabel>Nombre</FormLabel>
          <input
            type="text"
            name="nombre"
            autoComplete="off"
            value={selected ? selected.id : ''}
            onChange={ev => setSelected({ ...selected, id: ev.target.value })}
          ></input>
          <FormLabel>Descripcion</FormLabel>
          <input
            type="text"
            name="descripcion"
            autoComplete="off"
            value={selected ? selected.last_name : ''}
            onChange={ev =>
              setSelected({ ...selected, last_name: ev.target.value })
            }
          ></input>
          <FormLabel>Cantidad</FormLabel>
          <input
            type="text"
            name="amount"
            autoComplete="off"
            value={selected ? selected.email : ''}
            onChange={ev =>
              setSelected({ ...selected, email: ev.target.value })
            }
          ></input>
          <FormLabel>Precio ingredientes</FormLabel>
          <input
            type="text"
            name="materialPrice"
            autoComplete="off"
            value={selected ? selected.first_name : ''}
            onChange={ev =>
              setSelected({ ...selected, first_name: ev.target.value })
            }
          ></input>
          <FormLabel>Precio Venta</FormLabel>
          <input
            type="text"
            name="salePrice"
            autoComplete="off"
            value={selected ? selected.first_name : ''}
            onChange={ev =>
              setSelected({ ...selected, first_name: ev.target.value })
            }
          ></input>
          <FormLabel>Tiempo de preparacion</FormLabel>
          <input
            type="text"
            name="preparationTime"
            autoComplete="off"
            value={selected ? selected.first_name : ''}
            onChange={ev =>
              setSelected({ ...selected, first_name: ev.target.value })
            }
          ></input>

          <p>{errors}</p>

          <Button type="submit"></Button>
        </form>

        <div>
          <TableContainer className="overflow limited">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length
                  ? products.map(prod => (
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
        </div>
      </HStack>
    </VStack>
  );
};

const guardarProducto = nombre => {
  alert(nombre);
};

const validate = (
  name,
  description,
  amount,
  materialPrice,
  salePrice,
  preparationTime
) => {
  if (name !== undefined) if (name.length === 0) return 'Se requiere un nombre';
  if (description !== undefined)
    if (description.length === 0) return 'Se requiere una descripcion';
  if (amount !== undefined)
    if (amount.length === 0) return 'Se requiere una cantidad';
  if (materialPrice !== undefined)
    if (materialPrice.length === 0)
      return 'Se requiere el gasto en ingredientes';
  if (salePrice !== undefined)
    if (salePrice.length === 0) return 'Se requiere el precio de venta';
  if (preparationTime !== undefined)
    if (preparationTime.length === 0)
      return 'Se requiere el tiempo preparacion';
};

export default CreacionProductos;
