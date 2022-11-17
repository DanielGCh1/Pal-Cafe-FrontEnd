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
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'

import useProducts from '../context/Product/UseProduct';
import { useEffect, useState } from 'react';

export default function ProductoVentaPedido() {

  const { products, selected, getProduct, getProducts, setSelected } =
    useProducts();

  const errors = validate(
    selected ? selected.id : '',
    selected ? selected.last_name : 'hola',
    selected ? selected.first_name : '',
    selected ? selected.email : '',
    selected ? selected.first_name : '',
    selected ? selected.first_name : ''
  );

  useEffect(() => {
    //getProducts();
    console.log(products);
    console.log("Imprimiendo el producto "+ selected);
  }, []);

  const handleClick = id => {
    getProduct(id);
  };

  return (
    <Container backgroundImage={require('../assets/fondoLogin.jpg')} backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
      justifyContent='center'>

      <HeaderPaginaPrincipal />

      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
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
              src={require('../assets/panDulce.png')}
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
      </VStack>
    </Container>

  );
}

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
