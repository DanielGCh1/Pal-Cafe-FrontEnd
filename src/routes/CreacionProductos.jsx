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
import useProducts from '../context/Product/UseProduct';
import { useEffect } from 'react';

const CreacionProductos = () => {
  const { products, selected, getProduct, getProducts, setSelected } =
    useProducts();

  const errors = validate(
    selected,
    selected ? selected.pro_nombre : '',
    selected ? selected.pro_descripcion : '',
    selected ? selected.pro_cantidad : '',
    selected ? selected.pro_precio_mano_obra : '',
    selected ? selected.pro_precio_sugerido : ''
  );

  useEffect(() => {
    getProducts()
  }, [])

  const handleClick = id => {
    getProduct(id);
  };

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
            saveProduct(selected);
          }}
        >
          <FormLabel>Nombre</FormLabel>
          <input
            type="text"
            name="nombre"
            className="inputsFoms"
            autoComplete="off"
            value={selected ? selected.pro_nombre : ''}
            onChange={ev => setSelected({ ...selected, pro_nombre: ev.target.value })}
            style={input}
          ></input>
          <FormLabel>Descripcion</FormLabel>
          <input
            type="text"
            name="descripcion"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.pro_descripcion : ''}
            onChange={ev =>
              setSelected({ ...selected, pro_descripcion: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Cantidad</FormLabel>
          <input
            type="text"
            name="amount"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.pro_cantidad : ''}
            onChange={ev =>
              setSelected({ ...selected, pro_cantidad: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Precio mano de obra</FormLabel>
          <input
            type="text"
            name="materialPrice"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.pro_precio_mano_obra.$numberDecimal : ''}
            onChange={ev =>
              setSelected({ ...selected, pro_precio_mano_obra: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Precio Sugerido</FormLabel>
          <input
            type="text"
            name="salePrice"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.pro_precio_sugerido.$numberDecimal : ''}
            onChange={ev =>
              setSelected({ ...selected, pro_precio_sugerido: ev.target.value })
            }
            style={input}
          ></input>

          <p style={error}>{errors}</p>

          <HStack position="absolute" bottom="6" alignSelf="flex-end" display="flex" flexWrap="wrap">
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
                {products && products.map(prod => (
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

const saveProduct = product => {
  setTimeout(() => {
    alert(JSON.stringify(product, null, 2));
  }, 1000);
};

const validate = (
  selected,
  pro_nombre,
  pro_descripcion,
  pro_cantidad,
  pro_precio_mano_obra,
  pro_precio_sugerido
) => {
  if (selected !== null) {
    if (pro_nombre !== undefined)
      if (pro_nombre.length === 0) return 'Se requiere un nombre';
    if (pro_descripcion !== undefined)
      if (pro_descripcion.length === 0) return 'Se requiere una descripcion';
    if (pro_cantidad !== undefined)
      if (pro_cantidad.length === 0) return 'Se requiere una cantidad';
    if (pro_precio_mano_obra !== undefined)
      if (pro_precio_mano_obra.length === 0)
        return 'Se requiere el precio de mano de obra';
    if (pro_precio_sugerido !== undefined)
      if (pro_precio_sugerido.length === 0) return 'Se requiere el precio sugerido';
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

export default CreacionProductos;
