import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue
} from '@chakra-ui/react';


import { useContext, useEffect, useState } from 'react';
 import useProducts from '../context/Product/UseProduct';


export default function ProductoVentaPedido() {

  const { products, productSelected, setProducts, getProduct, getProducts, setProductSelected } =
    useProducts();

  useEffect(() => {

    if (typeof products == 'undefined' || products.length <= 0) {
      getProducts();
    }

    if (typeof productSelected == 'undefined') {
      getProduct(params.id);
    }

  }, []);

  /*
const errors = validate(
selected ? selected.id : '',
selected ? selected.last_name : 'hola',
selected ? selected.first_name : '',
selected ? selected.email : '',
selected ? selected.first_name : '',
selected ? selected.first_name : ''
);*/

  const handleClick = id => {
    getProduct(params.id);
  };

  const { match: { params } } = this.props;
  const hola = id => {
    console.log(products);
    console.log(productSelected);
    console.log("Lo que imprime idProdu", params.id, ".")
  };



  return <>



    <Button onClick={hola}>

    </Button>

    <Stack backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
      justifyContent='center' >

    </Stack>

    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}>
      <Flex>
        <Image

          rounded={'md'}
          alt={'product image'}
          src={productSelected !== null ? productSelected.pro_imagen : require('../assets/panDulce.png')}
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            Pan dulce
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            ₡ 1 200
          </Text>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            6 Unidades
          </Text>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
          }>
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text fontSize={'lg'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid amet at delectus doloribus dolorum expedita hic, ipsum
              maxime modi nam officiis porro, quae, quisquam quos
              reprehenderit velit? Natus, totam.
            </Text>
          </VStack>
        </Stack>
      </Stack>
    </SimpleGrid>



  </>
}
/*
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
};*/
