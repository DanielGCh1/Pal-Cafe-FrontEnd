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

import { useContext, useEffect, useState } from 'react';

import  useProducts2  from '../context/Product2/UseProduct2';

import { Product2Contex } from '../context/Product2/Product2Contex';

export default function ProductoPresentacion({ nombre, id }) {
  const { products2, selected2, getProduct2, getProducts2, setSelected2 } =
  useProducts2();

  const {product3, setProduct3} = useContext(Product2Contex);


  /*
  const errors = validate(
    selected ? selected.id : '',
    selected ? selected.last_name : '',
    selected ? selected.first_name : '',
    selected ? selected.email : '',
    selected ? selected.first_name : '',
    selected ? selected.first_name : ''
  );*/

  const handleClick = id => {
    //getProduct2(id);
    setProduct3("panes");
    console.log("el product3 es",product3, ".");
  };


  /*
  <Link href='/ProductoVentaPedido' onClick={() => {
      HandleClick(id);
    }}>
      <Image
        rounded={'md'}
        alt={'product image'}
        src={require('../assets/panDulce.png')}
        fit={'cover'}
        align={'center'}
        w={'10rem'}
        h={'10rem'}
      />
    </Link>


  <Link href='/ProductoVentaPedido'>
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

  */

  return (
    <Link href={`/ProductoVentaPedido/${id}`} onClick={() => {
      handleClick(id);
    }}>
      <Image
        rounded={'md'}
        alt={'product image'}
        src={require('../assets/panDulce.png')}
        fit={'cover'}
        align={'center'}
        w={'10rem'}
        h={'10rem'}
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
