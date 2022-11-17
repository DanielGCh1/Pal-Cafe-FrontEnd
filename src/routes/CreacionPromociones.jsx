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
import usePromotions from '../context/Promotion/UsePromotion';
import { useEffect } from 'react';

const CreacionPromociones = () => {
  const { promotions, selected, getPromotion, getPromotions, setSelected } =
    usePromotions();

  const errors = validate(
    selected,
    selected ? selected.id : '',
    selected ? selected.last_name : '',
    selected ? selected.first_name : '',
    selected ? selected.email : '',
    selected ? selected.first_name : '',
    selected ? selected.first_name : ''
  );

  useEffect(() => {
    getPromotions()
  }, [])

  const handleClick = id => {
    getPromotion(id);
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
            value={selected ? selected.id : ''}
            onChange={ev => setSelected({ ...selected, id: ev.target.value })}
            style={input}
          ></input>
          <FormLabel>Descripcion</FormLabel>
          <input
            type="text"
            name="descripcion"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.last_name : ''}
            onChange={ev =>
              setSelected({ ...selected, last_name: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Cantidad</FormLabel>
          <input
            type="text"
            name="amount"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.email : ''}
            onChange={ev =>
              setSelected({ ...selected, email: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Precio ingredientes</FormLabel>
          <input
            type="text"
            name="materialPrice"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.first_name : ''}
            onChange={ev =>
              setSelected({ ...selected, first_name: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Precio Venta</FormLabel>
          <input
            type="text"
            name="salePrice"
            autoComplete="off"
            className="inputsFoms"
            value={selected ? selected.first_name : ''}
            onChange={ev =>
              setSelected({ ...selected, first_name: ev.target.value })
            }
            style={input}
          ></input>
          <FormLabel>Tiempo de preparacion</FormLabel>
          <input
            type="text"
            name="preparationTime"
            autoComplete="off"
            className="inputsFoms"
            w="100%"
            value={selected ? selected.first_name : ''}
            onChange={ev =>
              setSelected({ ...selected, first_name: ev.target.value })
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
                {promotions.length
                  ? promotions.map(prod => (
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
            </Table>
          </TableContainer>
        </Container>
      </HStack>
    </VStack>
  );
};

const saveProduct = promotion => {
  setTimeout(() => {
    alert(JSON.stringify(promotion, null, 2));
  }, 1000);
};

const validate = (
  selected,
  name,
  description,
  amount,
  materialPrice,
  salePrice,
  preparationTime
) => {
  if (selected !== null) {
    if (name !== undefined)
      if (name.length === 0) return 'Se requiere un nombre';
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
const ml = {
  margin_left: '2%',
};

const mr = {
  margin_right: '20px',
};

export default CreacionPromociones;
