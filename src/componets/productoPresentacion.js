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
  LinkBox,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { Link } from 'react-router-dom';

import useProducts from '../context/Product/UseProduct';

import { useContext, useEffect, useState } from 'react';

export default function ProductoPresentacion({ _id, image }) {

  const { products, productSelected, setProducts, getProduct, getProducts, setProductSelected } =
    useProducts();

  useEffect(() => {

    if (typeof products == 'undefined' || products.length <= 0) {
      getProducts();
    }

    if (typeof productSelected == 'undefined' || products.length <= 0) {
      getProduct(_id);
    }

  }, []);

  /*
  const errors = validate(
    selected ? selected.id : '',
    selected ? selected.last_name : '',
    selected ? selected.first_name : '',
    selected ? selected.email : '',
    selected ? selected.first_name : '',
    selected ? selected.first_name : ''
  );*/

  const SearchProduct = id => {
    getProduct(id);
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


    <Link align={'center'} to={`/PalCafe/ProductoVentaPedido/${_id}`} onClick={() => {
      SearchProduct(_id);
    }}>
      <Image
        rounded={'md'}
        alt={'product image'}
        src={image}
        fit={'cover'}
        align={'center'}
        w={'10rem'}
        h={'10rem'}
        m="auto"
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
