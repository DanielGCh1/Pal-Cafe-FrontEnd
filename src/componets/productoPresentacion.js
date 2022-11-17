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
import { Link } from '@chakra-ui/react'

import useProducts from '../context/Product/UseProduct';
import { useEffect, useState } from 'react';

export default function ProductoPresentacion({id, nombre}) {
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
    <Link href='/ProductoVentaPedido'>
      <Text fontSize='5xl'>{nombre}</Text>
      <Image
        rounded={'md'}
        alt={'product image'}
        src={require('../assets/panDulce.png')}
        fit={'cover'}
        align={'center'}
        w={'10rem'}
        h={'10rem'}
        onClick={() => {
          handleClick(id);
        }}
      />
    </Link>

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
